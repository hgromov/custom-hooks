import React, { useEffect } from "react";
import useAxios from "../hooks/useAxios";

interface PostData {
  body: string;
  id: number;
  title: string;
  userId: number
}


const ListComponent: React.FC = () => {
  const { data, isLoading, error, request } = useAxios<PostData[]>({
    url: "https://jsonplaceholder.typicode.com/posts"
  });

  useEffect(() => {
    request()
  }, [])

  console.log(data);
  

  return (
    <div>
      <h1>Custom Fetch Example</h1>
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

export default ListComponent;
