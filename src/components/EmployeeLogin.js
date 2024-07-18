import React, { useState, useContext } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { GlobalContext } from './GlobalContext';

import {getIP} from './Tool';

// 포커스 이동
function enter_chk(event, nextTag){ // event: Enter를 누른 태그
  if(event.keyCode === 13){ // 엔터키
    document.getElementById(nextTag).focus(); // 다음 태그로 커서를 보내라
  }
}

function EmployeeLogin() {
  const [id, setId] = useState('');
  const [passwd, setPasswd] = useState('');
  const { sw, setSw, employeeno, setEmployeeno } = useContext(GlobalContext); // 전역 변수

  const idChange = (e) => { setId(e.target.value); }          // state를 변경하기위한 함수 선언
  const passwdChange = (e) => { setPasswd(e.target.value); }  // state를 변경하기위한 함수 선언

  const send = (event) => {
    fetch(`http://${getIP()}:9100/employee/login_proc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, passwd})
    })
    .then(result => result.json()) // JPA -> JSON
    .then(result => {
      setSw(result.sw);                 // 전역 변수, Context
      setEmployeeno(result.employeeno); // 전역 변수, Context
      console.log('->', result.sw, result.employeeno);
      if (result.sw === false) {
        alert('아이디 또는 패스워드가 일치하지 않습니다.\n다시 시도해주세요.');
      }
    })
    .catch(err => console.error(err)) // 통신 에러

    event.preventDefault(); // submit 기능 삭제
  }

  const test = () => {
    setId('emp1');
    setPasswd('1234');
  }

  return (
    <>
      {sw === true ? (
        <div>
          관리자 로그인 성공 했습니다. <br></br>
          <Link to="/issue/find_all">긴급 공지사항 관리하기</Link>
        </div>
      ) : (
        <>
          <h3>관리자 로그인</h3>
          <form onSubmit={send} style={{margin: '10px auto', width: '30%', textAlign: 'left'}}>
            {/* mb-3: margin bottom 16x, mt-3: margin top 16px */}
            <div className="mb-3 mt-3"> 
              <label className="form-label">아이디:</label>
              <input type="text" className="form-control" id="id" placeholder="아이디" name="id" autoFocus='autoFocus' 
                     onKeyDown={e => enter_chk(e, 'passwd')} onChange={idChange} value={id} />
            </div>
            <div className="mb-3">
              <label className="form-label">패스워드:</label>
              <input type="password" className="form-control" id="passwd" placeholder="패스워드" name="passwd" 
                     onKeyDown={e => enter_chk(e, 'btnSend')} onChange={passwdChange} value={passwd}/>
            </div>
            <div style={{textAlign: 'center'}}>
              <button id='btnSend' type="submit" className="btn btn-primary" style={{marginRight: '10px'}}>로그인</button>  
              <button id='btnTest' type="button" className="btn btn-primary" onClick={test}>테스트 계정</button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default EmployeeLogin;
