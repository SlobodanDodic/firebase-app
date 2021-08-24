import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setResult(data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }

    getData();
  }, [url]);

  return [result, error, isLoading];
};

export default useFetch;
