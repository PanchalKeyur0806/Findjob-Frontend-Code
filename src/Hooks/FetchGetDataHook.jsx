import axios from "axios";
import { useState } from "react";

const useGetData = () => {
  const [getLoading, setGetLoading] = useState(true);
  const [getMessage, setGetMessage] = useState("");
  const [getError, setGetError] = useState("");
  const [progress, setProgress] = useState(0);

  const getData = async (url, headers) => {
    try {
      setGetError("");
      setProgress(30);
      const response = await axios.get(url, headers);
      const data = response.data;
      setGetMessage(data.message);
      setProgress(100);
      setGetLoading(false);
      setTimeout(() => {
        setGetMessage("");
      }, 3000);
      return data;
    } catch (error) {
      setGetMessage("");
      setProgress(100);
      setGetLoading(false);
      console.log(error);
      setGetError(error.response.data.message);
      setTimeout(() => {
        setGetError("");
      }, 3000);
    }
  };

  return [getData, getLoading, getMessage, getError, progress, setProgress];
};

export default useGetData;
