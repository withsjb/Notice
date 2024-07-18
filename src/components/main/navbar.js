import React, { useState,useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUser, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { GlobalContext } from '../GlobalContext'; // GlobalContext 임포트

const Navbar = () => {
  const { sw, setSw } = useContext(GlobalContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    navigate(process.env.REACT_APP_API_BASE_URL); 
  };

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/account/getsessiondata`, {
          method: 'GET',
          credentials: 'include'
        });
        if (response.ok) {
          const sessionData = await response.json();
          if (sessionData.accountno) {
            setIsLoggedIn(true);
            setUser(sessionData); // 세션 데이터 전체를 사용하지 않는 경우 사용자 정보만 저장
            setSw(true);
          } else {
            setIsLoggedIn(false);
            setUser(null); // 로그아웃 상태일 경우 사용자 정보 초기화
            setSw(false);
          }
        } else {
          console.error('Failed to fetch session data');
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
      } finally {
        setLoading(false); // 데이터 로딩 완료
      }
    };

    fetchSessionData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/account/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        setIsLoggedIn(false);
        setUser(null);
        setSw(false);
        navigate('/'); // 로그아웃 후 메인 페이지로 이동
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // 데이터 로딩 중이면 로딩 메시지 표시
  }

  return (
    <div className="container-fluid fixed-top">
      {/* Top bar */}
      <div className="container topbar bg-primary d-none d-lg-block">
        {/* Content */}
      </div>
      {/* Navbar */}
      <div className="container px-0">
        <nav className="navbar navbar-light bg-white navbar-expand-xl">
          {/* Logo */}
          <a href={`${process.env.REACT_APP_API_BASE_URL}/`} className="navbar-brand">
      <h1 className="text-primary display-6">My Recipe</h1>
    </a>
          {/* Toggle button */}
          <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="fa fa-bars text-primary"></span>
          </button>
          {/* Navbar links */}
          <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
            <div className="navbar-nav mx-auto">
              {/* Dropdown for boards */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  게시판
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="/board/list_cno?crudcateno=1">게시판 1</a></li>
                  <li><a className="dropdown-item" href="/board/list_cno?crudcateno=2">게시판 2</a></li>
                </ul>
              </li>
              {/* Dropdown for members */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  회원
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="/account/find_aid_form">아이디 찾기</a></li>
                  <li><a className="dropdown-item" href="/account/find_passwd_form">비밀번호 찾기</a></li>
                  <li><a className="dropdown-item" href="/account/read?accountno=1">회원 정보 조회</a></li>
                  <li><a className="dropdown-item" href="/account/delete?accountno=1">회원 정보 삭제</a></li>
                  <li><a className="dropdown-item" href="/gpa/list">별점 리스트</a></li>
                </ul>
              </li>

              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  공지사항
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="/issue//find_all">공지사항</a></li>
                  <li><a className="dropdown-item" href="/board/list_cno?crudcateno=2">게시판 2</a></li>
                </ul>
              </li> */}

            </div>
            
            {/* User icons */}
            <div className="d-flex m-3 me-0">
              {!isLoggedIn && (
                <span className="nav-item my-auto me-4">
                  <a className="nav-link" href="/account/signin">
                    <FontAwesomeIcon icon={faUserPlus} size="2x" />
                  </a>
                </span>
              )}
              {!isLoggedIn && (
                <span className="nav-item my-auto">
                  <a className="nav-link" href="/account/login">
                    <FontAwesomeIcon icon={faUser} size="2x" />
                  </a>
                </span>
              )}

              {isLoggedIn && (
                <span className="my-auto">
                  <a className="nav-link" href="#" onClick={handleLogout} title="로그아웃">
                    <FontAwesomeIcon icon={faUserSlash} size="2x" />
                  </a>
                </span>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
