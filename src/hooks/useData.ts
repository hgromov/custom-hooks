import { useState, useEffect } from "react";
import axios from "axios";

const useData = (url: string) => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [filter, setFilter] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          params: {
            _page: page,
            _limit: limit,
            ...(sort ? { _sort: sort } : {}),
            ...(filter ? { title_like: filter } : {}),
          },
        });
        const totalResponse = response.headers["x-total-count"];
        setData(response.data);
        setTotal(Number(totalResponse));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, page, limit, filter, sort]);

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

  return {
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
  };
};

export { useData };

export default useData;
