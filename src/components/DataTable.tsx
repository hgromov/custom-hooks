import React, { useState } from 'react';
import useDataFetch from '../hooks/useData';

const DataTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

  const { data, total, loading } = useDataFetch('https://jsonplaceholder.typicode.com/posts', {
    page,
    limit,
    filter,
    sort,
  });

  const handleNext = () => {
    if (page * limit < total) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  return (
    <div>
      <div>
        <label>Filter:
          <input type="text" value={filter} onChange={handleFilterChange} />
        </label>
        <label>Sort:
          <select value={sort} onChange={handleSortChange}>
            <option value="">Without sorting</option>
            <option value="title">By tytle (A - Z)</option>
            <option value="id">By ID</option>
          </select>
        </label>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            {data.map((item: any) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
          <div>
            <button onClick={handlePrev} disabled={page <= 1}>prev</button>
            <span>page {page}</span>
            <button onClick={handleNext} disabled={page * limit >= total}>next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
