import { useEffect, useState } from "react";
import axios from "axios";

// ✅ Directly set your backend base URL here
const API_BASE = "https://booking-app-backend-bw17.onrender.com/api";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fullUrl = `${API_BASE}${endpoint}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(fullUrl);
        setData(res.data);
        console.log("Fetched Data:", res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchData();
  }, [fullUrl]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(fullUrl);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
