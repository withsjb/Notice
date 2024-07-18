import React, { useState, useContext,useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

import {getIP} from '../Tool';

// 포커스 이동
function enter_chk(event, nextTag){
  if(event.keyCode === 13){ // 엔터키
    document.getElementById(nextTag).focus();
  }
}

function Issue_Create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { sw, setSw, employeeno, setEmployeeno } = useContext(GlobalContext); // 전역 변수

  const titleChange = (e) => { setTitle(e.target.value); }
  const contentChange = (e) => { setContent(e.target.value); }

  const test = () => {
    setTitle('시스템 부하 발생');
    setContent('현재 조치중입니다.\n예상 소요 시간: 30분');
  }

  const navigator = useNavigate(); // useNavigate Hook 사용

  const send = (event) => {
    // 현재 날짜와 시간을 가져옵니다.
    const now = new Date();

    // -------------------------------------------------------------------------------
    // 날짜와 시간을 "YYYY-MM-DD HH:mm:ss" 형식으로 변환합니다.
    // -------------------------------------------------------------------------------
    const rdate = now.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\./g, '-').replace(/- /g, '-').replace(/ /, ' ').trim().slice(0, -1);

    const formattedRdate = rdate.replace(/-([0-9]{2}:)/, ' $1');

    console.log('-> formattedRdate', formattedRdate);
    // -------------------------------------------------------------------------------

    fetch(`http://${getIP()}:9100/issue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, content, cnt: 0, rdate: formattedRdate})
    })
    .then(result => result.json()) // Spring Boot -> JSON
    .then(result => {
      // console.log('->', result);
      if (result.issueno > 0) {
        alert('공지사항을 등록 했습니다.');
        navigator('/issue/find_all') // navigator Hook을 이용한 주소 이동, redirect
      } else {
        alert('공지사항 등록에 실패했습니다. \n 다시 시도해주세요.');
      }
    })
    .catch(err => console.error(err)) // 통신 에러

    event.preventDefault(); // submit 기능 삭제
  }

  return (
    <>
      {sw === false ? (
        <div>
          관리자만 등록 할 수 있습니다. <br></br>
          <Link to="/employee/login">관리자 로그인</Link>
        </div>
      ) : (
        <>
          <h3>긴급 공지 사항 등록</h3>
          <form onSubmit={send} style={{margin: '10px auto', width: '50%', textAlign: 'left'}}>
            {/* mb-3: margin bottom 16x, mt-3: margin top 16px */}
            <div className="mb-3 mt-3"> 
              <label className="form-label">제목:</label>
              <input type="text" className="form-control" id="title" placeholder="제목" name="title" autoFocus='autoFocus' 
                     onKeyDown={e => enter_chk(e, 'content')} onChange={titleChange} value={title} />
            </div>
            <div className="mb-3">
              <label className="form-label">내용:</label>
              <textarea className="form-control" id="content" placeholder="내용" name="content" 
                        onChange={contentChange} value={content} style={{width: "100%", height: "300px"}} />
            </div>
            <div style={{textAlign: 'center'}}>
              <button id='btnSend' type="submit" className="btn btn-primary" style={{marginRight: '10px'}}>등록</button>  
              <button id='btnTest' type="button" className="btn btn-primary" onClick={test}>테스트 내용</button>
            </div>
          </form>
        </>
      )}
    </>
  )
}

export default Issue_Create;
