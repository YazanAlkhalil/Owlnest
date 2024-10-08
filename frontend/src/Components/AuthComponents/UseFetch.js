import axios from 'axios';
import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useFetch = () => {
  const navigate = useNavigate();
  const [resData, setResData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
  });

  const refreshToken = async () => {
    try {
      const refreshResponse = await axiosInstance.post('/refresh/');
      return refreshResponse.status === 200;
    } catch (error) {
      navigate('/login')
      console.log('Error refreshing token:', error);
      return false;
    }
  };

  const fetchData = useCallback(async ({
    url,
    method = 'get',
    data = {},
    params = {},
    headers = {}
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance({
        url,
        method,
        data,
        params,
        headers
      });
      if(response.data.message)
        toast.success(response.data.message)
      setResData(response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        const refreshSuccessful = await refreshToken();
        if (refreshSuccessful) {
          return fetchData({ url, method, data, params, headers });
        } else {
          navigate('/', { replace: true });
        }
      } else {
        console.error('API Error:', error);
        const errorMessage = getFirstItemOfFirstKey(error.response.data)
        if(errorMessage){
          toast.error(errorMessage);
        }
        else{
          toast.error(error.response.data.message);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return { fetchData, resData, loading, error };
};

function getFirstItemOfFirstKey(obj={}) {
  const keys = Object.keys(obj);
  
  if (keys.length > 0) {
      const firstKey = keys[0];
      const firstArray = obj[firstKey];
      
      if (Array.isArray(firstArray) && firstArray.length > 0) {
          return firstArray[0];
      }
  }
  
  return null;
}
export default useFetch;