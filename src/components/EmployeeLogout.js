import React, { useState, useContext } from 'react';
import '../App.css';
import { GlobalContext } from './GlobalContext';

import {getIP} from './Tool';

function EmployeeLogout() {
  const { sw, setSw, employeeno, setEmployeeno } = useContext(GlobalContext);

  let logout = 'false';

  fetch(`http://${getIP()}:9100/employee/logout`, {
    method: 'GET'
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    // body: JSON.stringify({
    //   id: id,
    //   passwd: passwd
    // })
  })
  .then(result => result.json())
  .then(result => {
    console.log('->', result.sw, result.employeeno);
    if (result.logout === true) {
      setSw(result.sw);                 // 전역 변수, Context
      setEmployeeno(result.employeeno); // 전역 변수, Context
    } else {
      alert('로그인에 실패했습니다.\n다시 시도해주세요.')
    }
  })
  .catch(err => console.error(err))

  return (
    <>
      <h5>이용해 주셔서 감사합니다. 즐거운 하루 되세요~</h5>
    </>
  );
}

export default EmployeeLogout;
