import { useEffect, useState } from 'react';
// import { getToken } from '../providers/AuthContext';

const useHttp = (url, method = 'GET', initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const token = getToken();

  useEffect(() => {
    setLoading(true);

    fetch(url, {
      method
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [url]);

  return {
    data,
    setLocalData: setData,
    loading,
    error
  };
};

export default useHttp;
