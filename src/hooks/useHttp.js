import { useEffect, useState } from 'react';
import { getToken } from '../providers/AuthContext';

const useHttp = (url, method = 'GET', initialData = null, dependencies = [url]) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = getToken();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((result) => {
        if (isMounted) {
          setLoading(false);
          setData(result);
        }
      })
      .catch((e) => {
        if (isMounted) setError(e.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, dependencies);

  return {
    data,
    setData,
    loading,
    error
  };
};

export default useHttp;
