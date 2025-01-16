import { useState, useEffect } from 'react';
import axios from 'axios';

interface FetchOptions {
  page: number;
  limit: number;
  filter?: string;
  sort?: string;
}

const useDataFetch = (url: string, options: FetchOptions) => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          params: {
            _page: options.page,
            _limit: options.limit,
            ...(options.sort ? { _sort: options.sort } : {}),
            ...(options.filter ? { title_like: options.filter } : {}),
          },
        });
        const totalResponse = response.headers['x-total-count'];
        setData(response.data);
        setTotal(Number(totalResponse));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options.page, options.limit, options.filter, options.sort]);

  return { data, total, loading };
};

export default useDataFetch;
