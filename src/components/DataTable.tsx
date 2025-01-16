import React from "react";
import { useData } from "../hooks/useData";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const DataTable: React.FC = () => {
  const {
    data,
    total,
    loading,
    page,
    limit,
    filter,
    sort,
    handleNext,
    handlePrev,
    handleFilterChange,
    handleSortChange,
  } = useData(API_URL);

  return (
    <div>
      <div className="space-around">
        <label>
          <span>Filter: </span>
          <input type="text" value={filter} onChange={handleFilterChange} />
        </label>
        <label>
          <span>Sort: </span>
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
          <div className="space-around">
            <button onClick={handlePrev} disabled={page <= 1}>
              prev
            </button>
            <span> page {page} </span>
            <button onClick={handleNext} disabled={page * limit >= total}>
              next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { DataTable };

export default DataTable;
