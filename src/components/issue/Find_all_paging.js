

import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

import {getIP} from '../Tool';

import UpdateImg from '../../img/update.png'; // 수정
import DeleteImg from '../../img/delete.png'; // 삭제

// 함수의 첫자는 대문자를 사용, 미사용시 에러 발생
function Issue_Find_all() {
  const {sw} = useContext(GlobalContext);
  const [data, setData] = useState([]);                // 서버로부터 받은 전체 데이터
  const [visibleData, setVisibleData] = useState([]);  // 화면에 표시할 데이터
  
  useEffect(() => {
    // http://localhost:9100/issue/find_all_by_order_by_rdate_desc
    fetch(`http://${getIP()}:9100/issue/find_all_by_order_by_rdate_desc`, { // Spring Boot JPA
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
      setData(result); // result -> data로 저장

      let nextIndex = Number(sessionStorage.getItem('nextIndex')); // 0
      console.log('-> nextIndex fetch: ', nextIndex); // 0

      if (nextIndex === 0) {
        nextIndex = 2;
      }

      setVisibleData(result.slice(0, nextIndex)); // 0 ~ 2, 0 ~ 4

      console.log('-> nextIndex: ' + nextIndex);  // 2

    })
    .catch(err => console.error(err))
  }, []); // []: 최초 1회만 렌더링 실행

  // 추가 데이터를 화면에 표시
  const loadMoreItems = () => {
    let nextIndex = Number(sessionStorage.getItem('nextIndex'));
    if (nextIndex === 0) {
       nextIndex = 2
    }

    const newItems = data.slice(nextIndex, nextIndex + 2); // 2 ~ 4
    // prevItems: 기존의 visibleData + 새로운 데이터
    setVisibleData(prevItems => [...prevItems, ...newItems]);
    console.log('-> loadMoreItems nextIndex: ' + nextIndex); // 2
    sessionStorage.setItem('nextIndex', nextIndex+2); // 4
  };

  return (
    <>
      <h5>
        Resort 긴급 공지사항
        {sw === true ? (
           <span> [<Link to="/issue/create">등록</Link>]</span>
         ) : (
           <span></span>
        )}
      </h5>

      <table className='table_center table table-hover'>
        <tbody>
        {
          // item.issueno, item.title, item.content, item.cnt, item.rdate
          // data가 null이 아닐때만 map 함수 실행
          // data.map((item, index) => ...: item은 data 배열에 저장된 객체가 할당됨
          // index: 0~    
          visibleData && visibleData.map((item, index) =>
            <tr key={index}>
              <td className="table_underline" style={{textAlign: 'left', height: '30px'}}>
                <Link to={`/issue/${item.issueno}`}>
                  {item.rdate} {item.title}
                </Link>
                <span style={{fontSize: '0.8em', marginRight: '10px'}}>({item.cnt})</span>
                {sw === true ? (
                  <>
                    <Link to={`/issue/update/${item.issueno}`}><img src={UpdateImg} title='수정' style={{width: '14px', marginRight: '5px'}} /></Link>
                    <Link to={`/issue/delete/${item.issueno}`}><img src={DeleteImg} title='삭제' style={{width: '14px'}} /></Link>
                  </>
                ) : (
                  <span></span>
                )}
              </td>
            </tr>)
        }
        </tbody>
      </table>
      <div id='reply_list_btn' style={{border: 'none', width: '70%', margin: '5px auto'}}>
        <button type='button' id='btn_add' onClick={loadMoreItems} style={{width: '100%'}}>더보기 ▽</button>
      </div>
    </>
  ) 
}

export default Issue_Find_all;
