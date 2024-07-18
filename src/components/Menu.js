import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './GlobalContext'; // 경로에 맞게 수정하세요.

function Menu() {
  const { sw } = useContext(GlobalContext);

  return (
    <nav>
      <Link to="/">Home</Link>{' ㆍ '}
      <Link to="/issue/find_all">긴급 공지사항</Link>{' ㆍ '}

      {sw === true ? (
        <Link to="/employee/logout">관리자 로그아웃</Link> // 로그인 상태일 때 로그아웃 링크 표시
      ) : (
        <Link to="/employee/login">관리자 로그인</Link> // 로그아웃 상태일 때 로그인 링크 표시
      )}{' ㆍ '}
      <Link to="/info">프로그램 정보</Link>

    </nav>
  );
}

export default Menu;

