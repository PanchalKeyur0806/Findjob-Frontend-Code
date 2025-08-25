import axios from "axios";
import { useState } from "react";

const useGetData = () => {
  const [getLoading, setGetLoading] = useState(true);
  const [getMessage, setGetMessage] = useState("");
  const [getError, setGetError] = useState("");

  const getData = async (url, headers) => {
    try {
      setGetError("");

      const response = await axios.get(url, headers);
      const data = response.data;
      setGetMessage(data.message);
      setGetLoading(false);
      setTimeout(() => {
        setGetMessage("");
      }, 3000);
      return data;
    } catch (error) {
      setGetMessage("");
      setGetLoading(false);
      console.log(error);
      setGetError(error.response.data.message);
      setTimeout(() => {
        setGetError("");
      }, 3000);
    }
  };

  return [getData, getLoading, getMessage, getError];
};

export default useGetData;
