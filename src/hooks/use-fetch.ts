import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const resp = await axios.get(url).catch((error) => {
        setServerError(error);
        setIsLoading(false);
      });
      const data = await resp?.data;

      setApiData(data);
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return { isLoading, apiData, serverError };
};

export default useFetch;
