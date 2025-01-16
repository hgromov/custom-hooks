import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
 
const useAxios = <T>(config: AxiosRequestConfig): {
  data: T | undefined;
  isLoading: boolean;
  error: string | null;
  request: () => void;
} => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = () => {
    setIsLoading(true);

    axios(config)
      .then((response) => {
        setError(null);
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const request = () => {
    sendRequest();
  };

  return { data, isLoading, error, request };
};

export { useAxios };

export default useAxios;
