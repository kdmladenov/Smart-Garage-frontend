import { Button, Form } from 'react-bootstrap';
import {
  // useContext,
  useState
} from 'react';
import { Link, useParams } from 'react-router-dom';
import validateInput from '../Login/userValidator';
import { BASE_URL } from '../../common/constants';
// import AuthContext, { getUser } from '../../providers/AuthContext';

const ResetPassword = () => {
  // const { setAuthValue } = useContext(AuthContext);
  // const history = useHistory();
  const { userId, token } = useParams();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState({
    password: '',
    reenteredPassword: ''
  });

  const updateData = (prop, value) => setData({ ...data, [prop]: value });

  const [inputErrors, setInputErrors] = useState({
    password: '',
    reenteredPassword: ''
  });

  const handleInput = (prop, value, match) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value, match) });
    updateData(prop, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (inputErrors.password || inputErrors.reenteredPassword || !data.password || !data.reenteredPassword) {
      setError('Invalid username or password');
    } else {
      fetch(`${BASE_URL}/users/reset-password/${userId}/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          setData({ password: '', reenteredPassword: '' });

          if (res.message.includes('used or expired')) {
            setError(res.message);
          } else if (res.message.includes('do not match')) {
            setError(res.message);
          } else if (res.message.includes('not found')) {
            setError(res.message);
          } else if (res.message.includes('successfully')) {
            setMessage(res.message);
          } else {
            setError('Ooops... something went wrong please try again later.');
          }
        });
    }
  };

  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/login.jpg)` }} className="form-wrapper-outer">
      <div className="form-wrapper-inner">
        <Form onSubmit={handleFormSubmit} className="login">
          <h3>Reset Password</h3>
          {error && (
            <Form.Group className="error">
              <p>{`${error}`}</p>
            </Form.Group>
          )}
          {message &&
            <Form.Group className="message">
              <p>{`${message}`}</p>
            </Form.Group>
          }
          <Form.Group controlId="formBasicPassword" className={inputErrors.password ? 'error' : ''}>
            <Form.Label>
              {`Password${inputErrors.password}`}
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              autoComplete="off"
              value={data.password}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className={inputErrors.reenteredPassword ? 'error' : ''}>
            <Form.Label>
              {`Confirm Password${inputErrors.reenteredPassword}`}
            </Form.Label>
            <Form.Control
              type="password"
              name="reenteredPassword"
              placeholder="Confirm Password"
              autoComplete="off"
              value={data.reenteredPassword}
              onChange={(e) => handleInput(e.target.name, e.target.value, data.password)}
            />
          </Form.Group>

          <Form.Group>
            <Button
              type="submit"
              className="btn btn-dark btn-lg btn-block"
              disabled={(inputErrors.password || inputErrors.reenteredPassword || !data.password || !data.reenteredPassword)}
            >
              Reset Password
            </Button>
          </Form.Group>
          <Form.Group className="message">
              <Link to='/login' className='message'>Back to Login</Link>
          </Form.Group>
        </Form>
      </div>
    </div>

  );
};

export default ResetPassword;
