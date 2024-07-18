import React, { useState, useEffect } from 'react';
import Movingbox from './maincontent/movingbox'
import Youtube from './maincontent/youtube'

const RegionList = () => {
  
  const [menu, setMenu] = useState([]);
  const [crudcateVO, setCrudcateVO] = useState({});
  const [list, setList] = useState([]);
  const [word, setWord] = useState('');
  const [nowPage, setNowPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const params = new URLSearchParams({
      word: word,
      now_page: nowPage
    }).toString();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setMenu(data.menu);
        setCrudcateVO(data.crudcateVO);
        setList(data.list);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };


  return (
    <div>
      <div classname="boxbody">
      <Movingbox/>
      </div>
      <Youtube/>
    </div>
  );
};

export default RegionList;
