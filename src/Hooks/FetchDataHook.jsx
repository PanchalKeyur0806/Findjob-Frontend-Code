import axios from "axios";
import { useState } from "react";

const usePostData = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const postData = async (urlPath, inputData) => {
    try {
      setError("");
      const response = await axios.post(urlPath, inputData);
      setMessage(response.data.message);
      setData(response.data);
      return response.data;
    } catch (error) {
      setError(error.response.data.message);
      setMessage("");
      setData(null);
      return null;
    }
  };

  return [postData, data, message, error];
};

export default usePostData;
