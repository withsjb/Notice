import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSlash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

function App() {
  const [bodyClass, setBodyClass] = useState('loginbody');
  const [aid, setAid] = useState('');
  const [aidMsg, setAidMsg] = useState('');
  const [aname, setAname] = useState('');
  const [anameMsg, setAnameMsg] = useState('');
  const [apasswd, setApasswd] = useState('');
  const [apasswd2, setApasswd2] = useState('');
  const [apasswd2Msg, setApasswd2Msg] = useState('');
  const [atel, setAtel] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const changeBodyClass = (newClass) => {
    setBodyClass(newClass);
  };

  useEffect(() => {
    document.body.className = bodyClass;
  }, [bodyClass]);

  const checkID = async () => {
    if (aid.trim().length === 0) {
      setAidMsg('ID 입력은 필수 입니다. ID(이메일)는 3자이상 권장합니다.');
      return false;
    } else {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/checkID?aid=${aid}`);
        const data = await response.json();
        if (data.cnt > 0) {
          setAidMsg('이미 사용중인 ID(이메일) 입니다. 다른 ID(이메일)을 지정해주세요.');
        } else {
          setAidMsg('사용 가능한 ID(이메일) 입니다.');
        }
      } catch (error) {
        console.error('Error:', error);
        setAidMsg('ID 중복 확인 중 오류가 발생했습니다.');
      }
    }
  };

  const handleSignUp = async () => {
    if (aid.trim().length === 0) {
      setAidMsg('ID 입력은 필수 입니다. ID(이메일)는 3자이상 권장합니다.');
      return false;
    }
    if (apasswd !== apasswd2) {
      setApasswd2Msg('입력된 패스워드가 일치하지 않습니다.');
      return false;
    }
    if (aname.length === 0) {
      setAnameMsg('이름 입력은 필수입니다.');
      return false;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/signin_account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aid,
          aname,
          apasswd,
          atel,
          zipcode,
          address1,
          address2,
        }),
      });
      const data = await response.json();
      if (data.code === 'create_success') {
        alert('회원가입 성공');
        // 입력 필드 초기화
        setAid('');
        setAname('');
        setApasswd('');
        setApasswd2('');
        setAtel('');
        setZipcode('');
        setAddress1('');
        setAddress2('');
      } else if (data.code === 'duplicate_fail') {
        alert('이미 사용중인 ID입니다.');
      } else {
        alert('회원가입 실패');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/account/login_account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          aid,
          apasswd,
        }),
        credentials: 'include',
      });
      const data = await response.json();
      if (data.code === 'login_success') {
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('로그인 성공');
        window.location.href = '/';
      } else {
        alert('로그인 실패');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (bodyClass === 'loginbody') {
          handleLogin();
        } else if (bodyClass === 'signupbody') {
          handleSignUp();
        }
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [bodyClass, aid, apasswd, apasswd2, aname, atel, zipcode, address1, address2]);

  return (
    <div className={bodyClass} id="body">
      <div className="navbar">
        <span className="nav-item my-auto me-4">
          <a className="nav-link" href="/account/signin">
            <FontAwesomeIcon icon={faUserSlash} size="2x" />
          </a>
        </span>
      </div>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <label htmlFor="chk" aria-hidden="true" onClick={() => changeBodyClass('signupbody')}>Sign up</label>
          <form id="frm">
            <div className="signleft">
              <div>
                <input type="text" id="aname" value={aname} onChange={(e) => setAname(e.target.value)} placeholder="성명" className="signinput" />
                <span className="msg" id="aname_msg">{anameMsg}</span>
              </div>
              <div className="signemail">
                <input type="text" id="aid" value={aid} onChange={(e) => setAid(e.target.value)} placeholder="email" className="signinput" />
                <span className="msg" id="aid_msg">{aidMsg}</span>
                <button type="button" id="btn_checkID" onClick={checkID} className="btn btn-junbok" style={{ marginTop: '4px' }}>중복확인</button>
              </div>
              <div className="signpasswd">
                <input type="password" id="apasswd" value={apasswd} onChange={(e) => setApasswd(e.target.value)} placeholder="패스워드" className="signinput" />
              </div>
              <div className="signpasswdcheck">
                <input type="password" id="apasswd2" value={apasswd2} onChange={(e) => setApasswd2(e.target.value)} placeholder="패스워드 확인" className="signinput" />
                <span className="msg" id="apasswd2_msg">{apasswd2Msg}</span>
              </div>
            </div>
            <div className="signright">
              <div className="phonenumber">
                <input type="text" id="atel" value={atel} onChange={(e) => setAtel(e.target.value)} placeholder="전화번호" className="signinput" />
              </div>
              <div className="zipcode">
                <input type="text" id="zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} placeholder="우편번호" className="signinput" />
                <button type="button" id="btn_DaumPostcode" className="btn btn-junbok" style={{ marginTop: '4px' }}>우편번호 찾기</button>
              </div>
              <div className="address1">
                <input type="text" id="address1" value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="주소" className="signinput" />
              </div>
              <div className="address2">
                <input type="text" id="address2" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="상세 주소" className="signinput" />
              </div>
            </div>
            <button type="button" id="btn_send" onClick={handleSignUp} className="signbnt">Sign up</button>
          </form>
        </div>
        <div className="login">
          <form id="frm1">
            <label htmlFor="chk" aria-hidden="true" onClick={() => changeBodyClass('loginbody')}>Login</label>
            <div>
              <input type="text" id="aid2" value={aid} onChange={(e) => setAid(e.target.value)} placeholder="email" className="logininput" />
            </div>
            <div className="loginpasswd">
              <input type="password" id="apasswd3" value={apasswd} onChange={(e) => setApasswd(e.target.value)} placeholder="패스워드" className="logininput" />
            </div>
            <button type="button" id="btn_login" onClick={handleLogin} className="loginbnt">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
