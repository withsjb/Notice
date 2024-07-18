

import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

import {getIP} from '../Tool';

function Issue_Read() {
  const navigate = useNavigate(); // useNavigate 훅

  // <Link to={`/issue/${item.issueno}`}>
  const {issueno} = useParams(); // useParams Hook 사용, URL parameter 추출 가능

  const [data, setData] = useState(null); // 하나의 레코드 저장 객체

  // console.log('-> 3) send called.');

  // useEffect()는 App() 함수가 처리되어 렌더링되고 나서 호출됨.  
  // App() -> 화면 전체 렌더링 -> useEffect() -> fetch() -> data state 변경됨
  // -> App() 호출됨 -> 변경된 화면 부분만 갱신
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
    .then(result => result.json()) // Spring Boot -> JSON
    .then(result => {
      // console.log('-> 1) 조회 result:', result.issueno);
      setData(result);
    })
    .catch(err => console.error(err)) // 통신 에러

  }, [issueno]); // [issueno]: issueno 값 변경시 실행

  if (!data) { // 수신 데이터가 없으면 리턴 없음.
    return; 
  }
  
  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  }

  return (
    <>
      <h4>{data.rdate} {data.title}</h4>
      <div>
      {data.content.split('\n').map((line, index) => (
          <React.Fragment key={index}> {/* 특별한 태그를 사용하지 않고 출력 결과 그룹화 설정 필요시 사용 */}
            {line}
            <br />
          </React.Fragment>
        ))} (조회수: {data.cnt})
        <button onClick={goBack} style={{marginLeft: '10px'}} className="btn btn-primary btn-sm"> 목록 </button>  
      </div>
    </>
  )
}

export default Issue_Read;

