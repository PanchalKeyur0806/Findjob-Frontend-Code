import axios from "axios";
import { useState } from "react";

export function usePatchData() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const patchData = async (url, body) => {
    try {
      setError("");
      setProgress(30);

      const response = await axios.patch(url, body, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      //   const data = response?.data;
      setData(response?.data || []);
      setMessage(response.message);

      setProgress(100);
      return response.data.message;
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setProgress(0);
      return null;
    }
  };

  return [patchData, data, message, error, progress];
}
