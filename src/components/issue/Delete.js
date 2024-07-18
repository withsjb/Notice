

import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

import {getIP} from '../Tool';

function Issue_Delete() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { sw, setSw, adminno, setAdminno } = useContext(GlobalContext); // 전역 변수

  const navigate = useNavigate(); // useNavigate Hook 사용

  const {issueno} = useParams(); // useParams Hook 사용, URL parameter 추출 가능
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://${getIP()}:9100/issue/${issueno}`, {
      method: 'GET'
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    // body: JSON.stringify({
    //   title: title,
    //   content: content,
    //   cnt: 0,
    //   rdate: formattedRdate
    // })
    })
    .then(result => {
      if (!result.ok) {
        alert('데이터 가져오기를 실패했습니다.');
        navigate('/issue/find_all') // useNavigate Hook을 이용한 주소 이동
      }
      return result.json();
    })
    .then(result => {
      console.log('-> result:', result.issueno);
      setData(result);
      setTitle(result.title);
      setContent(result.content);
      setLoading(false); // 로딩 완료
    })
    .catch(err => console.error(err)) // 통신 에러

  }, [issueno]); // [issueno]: issueno 값 변경시 실행

  if (loading) {
    return <div>Loading...</div>; // 로딩 중 표시
  }

  const send = (event) => {
    fetch(`http://${getIP()}:9100/issue/${issueno}`, {
      method: 'DELETE'
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      // body: JSON.stringify({
      //   title: title,
      //   content: content,
      //   cnt: 0,
      //   rdate: formattedRdate
      // })
    })
    .then(result => {
      console.log('->', result);
      if (result.ok) {
        alert('공지사항을 삭제 했습니다.');
        navigate('/issue/find_all') // useNavigate Hook을 이용한 주소 이동
      } else {
        alert('공지사항 삭제에 실패했습니다. \n 다시 시도해주세요.');
      }
    })
    .catch(err => console.error(err)) // 통신 에러

    event.preventDefault(); // submit 기능 삭제
  }

  const find_all = () => {
    navigate('/issue/find_all');
  }

  return (
    <>
      {sw === false ? (
        <div>
          관리자만 삭제 할 수 있습니다. <br></br>
          <Link to="/admin/login_rest">관리자 로그인</Link>
        </div>
      ) : (
        <>
          <h3>긴급 공지 사항 삭제</h3>

          <h4>{data.rdate} {data.title}</h4>
          <div>
          {data.content.split('\n').map((line, index) => (
              <React.Fragment key={index}> {/* 특별한 태그를 사용하지 않고 출력 결과 그룹화 설정 필요시 사용 */}
                {line}
                <br />
              </React.Fragment>
            ))} (조회수: {data.cnt})
          </div>

          <form onSubmit={send} style={{margin: '10px auto', width: '50%', textAlign: 'left'}}>
            <div style={{textAlign: 'center'}}>
              <button id='btnSend' type="submit" className="btn btn-primary" 
                      style={{marginRight: '5px'}}>삭제</button>  
              <button id='btnCancel' type="button" className="btn btn-primary" 
                      onClick={find_all}>취소</button>
            </div>
          </form>
        </>
      )}
    </>
  )
}

export default Issue_Delete;

