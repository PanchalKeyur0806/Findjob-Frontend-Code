import axios from "axios";
import { useState } from "react";

const usePostData = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const postData = async (urlPath, inputData) => {
    try {
      setError("");
      setProgress(30);
      const response = await axios.post(urlPath, inputData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessage(response.data.message);
      setData(response.data);
      setProgress(100);
      return response.data;
    } catch (error) {
      setError(error.response.data.message);
      setMessage("");
      setData(null);
      setProgress(0);
      return null;
    }
  };

  return [postData, data, message, error, progress];
};

export default usePostData;
