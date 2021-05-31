import { MDBBtn } from 'mdbreact';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import { getToken, getUser } from '../../providers/AuthContext';
import validateInput from '../Login/userValidator';

const ChangePassword = () => {
  const history = useHistory();
  const params = useParams();
  const id = params.userId || getUser().userId;
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [input, setInput] = useState({
    currentPassword: '',
    password: '',
    reenteredPassword: ''
  });

  const [inputErrors, setInputErrors] = useState({
    currentPassword: '',
    password: '',
    reenteredPassword: ''
  });

  const updateInput = (prop, value) => setInput({ ...input, [prop]: value });

  const handleInput = (prop, value, match) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value, match) });
    updateInput(prop, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch(`${BASE_URL}/users/${id}/change-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(input)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(res => {
        setError('');
        setMessage(res.message);
        setInput({
          currentPassword: '',
          password: '',
          reenteredPassword: ''
        });
      })
      .catch(err => {
        if (err.message === '400') {
          setMessage('');
          setError('Unsuccessful attempt!');
        } else if (err.message === '404') {
          history.push('*');
        } else history.push('/serviceUnavailable');
      });
  };

  return (
    <div className="card h-100">
      <Form className="card-body change-password" onSubmit={handleFormSubmit}>
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            {error && (
              <Form.Group className="error">
                <h4>{`${error}`}</h4>
              </Form.Group>
            )}
            {message && (
              <Form.Group className="message">
                <h4>{`${message}`}</h4>
              </Form.Group>
            )}
            <h3 className="mb-3">Change Password</h3>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <Form.Group controlId="FormGridCurrentPassword" className={inputErrors.currentPassword ? 'error' : ''}>
              <Form.Label>
                {`Current Password ${inputErrors.currentPassword}`}
              </Form.Label>
              <Form.Control
                type="password"
                name="currentPassword"
                placeholder="Enter Current Password"
                autoComplete="off"
                value={input.currentPassword}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <Form.Group controlId="FormGridNewPassword" className={inputErrors.password ? 'error' : ''}>
              <Form.Label>
                {`New Password ${inputErrors.password}`}
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter New Password"
                autoComplete="off"
                value={input.password}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <Form.Group controlId="FormGridConfirmNewPassword" className={inputErrors.reenteredPassword ? 'error' : ''}>
              <Form.Label>
                {`Confirm New Password ${inputErrors.reenteredPassword}`}
              </Form.Label>
              <Form.Control
                type="password"
                name="reenteredPassword"
                placeholder="Confirm New Password"
                autoComplete="off"
                value={input.reenteredPassword}
                onChange={(e) => handleInput(e.target.name, e.target.value, input.password)}
              />
            </Form.Group>
          </div>

          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <Form.Group>
              <MDBBtn
                type="submit"
                className="btn btn-lg btn-block"
                disabled={(!input.currentPassword || !input.password || !input.reenteredPassword) || !Object.values(inputErrors).every(err => err === '')}
              >
                Save Changes
              </MDBBtn>
            </Form.Group>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ChangePassword;
