import React, { createContext, useState } from 'react';

// const SwContext = createContext();  // 첫번째 전역 변수
// const AdminnoContext = createContext(); // 두번째 전역 변수
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [sw, setSw] = useState(false);      // 첫번째 전역 변수용 state 생성
  const [employeeno, setEmployeeno] = useState(0);  // 두번째 전역 변수용 state 생성

  sessionStorage.setItem('nextIndex', 0); // 브러우저의 메모리를 사용하는 전역변수

  return (
    // <SwContext.Provider value={{ sw, setSw }}>        {/* 첫번째 전역 변수 */}
    //   <AdminnoContext.Provider value={{ employeeno, setEmployeeno }}>   {/* 첫번째 전역 변수 */}
    //     {children}
    //   </AdminnoContext.Provider>      
    // </SwContext.Provider>
    <GlobalContext.Provider value={{ sw, setSw, employeeno, setEmployeeno }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
