import React, { useState, useEffect } from 'react';

const RegionList = () => {
  const [regions, setRegions] = useState([]);
  const [paging, setPaging] = useState('');
  const [word, setWord] = useState('');
  const [nowPage, setNowPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/region/list?word=${word}&now_page=${nowPage}`)
      .then(response => response.json())
      .then(data => {
        setRegions(data.list || []);
        setPaging(data.paging || '');
        setWord(data.word || '');
        setNowPage(data.now_page || 1);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, [word, nowPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Region List</h1>
      <table>
        <thead>
          <tr>
            <th>지역 번호</th>|
            <th>지역명</th>|
            <th>매니저번호</th>|
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {regions.map(region => (
            <tr key={region.regiono}>
              <td>{region.regiono}</td>
              <td
                onClick={() => window.location.href = `/regionfood/list?regiono=${region.regiono}`}
              >
                {region.regionname}
              </td>
              <td>{region.managerno}</td>
              <td>
                <a href={`/region/update?regiono=${region.regiono}`}>Update</a>
                <a href={`/region/delete?regiono=${region.regiono}`}>Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div dangerouslySetInnerHTML={{ __html: paging }} />
      <button onClick={() => setNowPage(nowPage - 1)} disabled={nowPage <= 1}>
        Previous
      </button>
      <button onClick={() => setNowPage(nowPage + 1)}>
        Next
      </button>
    </div>
  );
};

export default RegionList;
