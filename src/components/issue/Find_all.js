import '../App.css';
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../components/GlobalContext';
import { getIP } from '../components/Tool';

import UpdateImg from './images/update.png'; // 수정
import DeleteImg from './images/delete.png'; // 삭제

function Issue_Find_all() {
  const { sw } = useContext(GlobalContext);
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching session data...');

    const fetchSessionData = async () => {
      try {
        const response = await fetch(`http://localhost:9093//account/getsessiondata`, {
          method: 'GET',
          credentials: 'include'
        });
        if (response.ok) {
          const sessionData = await response.json();
          console.log('Session Data:', sessionData); // 세션 데이터 출력
          if (sessionData.accountno) {
            setIsLoggedIn(true);
            setUser(sessionData);
          } else {
            setIsLoggedIn(false);
            setUser(null);
          }
        } else {
          console.error('Failed to fetch session data');
        }
      } catch (error) {
        console.error('Error fetching session data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, []);

  useEffect(() => {
    fetch(`http://${getIP()}:9100/issue/find_all_by_order_by_rdate_desc`, {
      method: 'GET'
    })
    .then(result => result.json())
    .then(result => {
      setData(result);
    })
    .catch(err => console.error(err))
  }, []);

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
          data && data.map((item, index) =>
            <tr key={index}>
              <td className="table_underline" style={{textAlign: 'left', height: '30px'}}>
                <Link to={`/issue/${item.issueno}`}>
                  {item.rdate} {item.title}
                </Link>
                <span style={{fontSize: '0.8em', marginRight: '10px'}}>({item.cnt})</span>
                {isLoggedIn ? (
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
    </>
  );
}

export default Issue_Find_all;
