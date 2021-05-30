import { useContext, useState, useEffect } from 'react';

import { BASE_URL } from '../../common/constants';
import ChangePassword from '../../components/CustomerProfile/ChangePassword';
import ServiceHistory from '../../components/CustomerProfile/ServiceHistory';
import CustomerNavigation from '../../components/CustomerProfile/CustomerNavigation';
import AuthContext, { getToken } from '../../providers/AuthContext';
import './CustomerProfile.css';

const CustomerProfile = () => {
  const [content, setContent] = useState('history');
  const [query, setQuery] = useState('');
  const [visits, setVisits] = useState([]);
  const [username, setUsername] = useState('');
  const [vehicles, setVehicles] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${BASE_URL}/vehicles?userId=${user.userId}${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(res => {
        setVehicles(res);
      });
  }, []);
  useEffect(() => {
    fetch(`${BASE_URL}/visits?userId=${user.userId}${query}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(res => {
        setVisits(res);
        setUsername(`${res[0].firstName} ${res[0].lastName}`);
      });
    // .catch((e) => setError(e.message));
  }, [query]);

  return (
    <main style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/profile.jpg)` }}>
      <div className="container profile">
        <div className="row gutters">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <CustomerNavigation
                setContent={setContent}
                query={query}
                setQuery={setQuery}
                username={username}
                vehicles={vehicles}
              />
            </div>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
            {content === 'history' && <ServiceHistory visits={visits} />}
            {content === 'changePassword' && <ChangePassword />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CustomerProfile;
