import React, { useEffect } from "react";
import useAxios from "../hooks/useAxios";

interface PostData {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const List: React.FC = () => {
  const { data, isLoading, error, request } = useAxios<PostData[]>({
    url: "https://jsonplaceholder.typicode.com/posts",
  });

  useEffect(() => {
    request();
  }, []);

  return (
    <div>
      <h1>Custom Fetch Hook Example</h1>
      <button onClick={request}>refetch</button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && data.length && (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { List };

export default List;
