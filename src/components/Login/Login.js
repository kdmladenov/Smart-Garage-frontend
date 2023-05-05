import './Login.css';
import { Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import validateInput from './userValidator';
import { BASE_URL, TEST_ACCOUNT_EMAIL, TEST_ACCOUNT_PASSWORD } from '../../common/constants';
import AuthContext, { getUser } from '../../providers/AuthContext';

const Login = () => {
  const { setAuthValue } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [remember, setRemember] = useState(false);
  const [formContent, setFormContent] = useState('login');

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const updateUser = (prop, value) => setUser({ ...user, [prop]: value });

  const [inputErrors, setInputErrors] = useState({
    email: '',
    password: ''
  });

  const handleInput = (prop, value) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value) });
    updateUser(prop, value);
  };

  const handleLoginFormSubmit = (e, userCredentials = user) => {
    e.preventDefault();
    setUser(userCredentials);
    if (
      (user.email && inputErrors.email) ||
      (user.password && inputErrors.password) ||
      !userCredentials.email ||
      !userCredentials.password
    ) {
      setError('Invalid username or password');
    } else {
      fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.status);
          }
          return res.json();
        })
        .then((data) => {
          const { token } = data;
          localStorage.setItem('token', token);
          const user = getUser();
          setAuthValue({
            isLoggedIn: true,
            user: getUser()
          });
          if (user.role === 'employee') {
            history.push('/customers');
          }
          if (user.role === 'customer') {
            history.push('/customer-profile');
          }
        })
        .catch((err) => {
          if (err.message === '401') {
            setError('Invalid username or password!');
          }
          if (err.message.startsWith('5')) {
            history.push('/serviceUnavailable');
          }
        });
    }
  };

  const forgottenPassword = () => {
    setError('');
    setFormContent('forgottenPassword');
  };

  const handleForgottenPasswordFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (inputErrors.email || !user.email) {
      setError('Please enter a valid email address');
    } else {
      fetch(`${BASE_URL}/users/forgotten-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message.includes('is not found')) {
            setError(res.message);
          }
          if (res.message.includes('link has been send')) {
            setMessage(res.message);
          }
          updateUser('email', '');
        });
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/login.jpg)` }}
      className="form-wrapper-outer"
    >
      <div className="form-wrapper-inner">
        {formContent === 'login' && (
          <Form onSubmit={handleLoginFormSubmit} className="login">
            <h3>Login</h3>
            {error && (
              <Form.Group className="error">
                <p>{`${error}`}</p>
              </Form.Group>
            )}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={user.email}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Password"
                autoComplete="off"
                value={user.password}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox1">
              <Form.Check
                name="remember"
                type="checkbox"
                label="Remember me"
                value={remember}
                onChange={() => setRemember(!remember)}
              />
              <p type="button" className="forgot-password text-right" onClick={forgottenPassword}>
                Forgot Your Password
              </p>
            </Form.Group>

            <Form.Group>
              <Button type="submit" className="btn btn-dark btn-lg btn-block">
                Login
              </Button>
            </Form.Group>
            <Form.Group>
              <Button
                className="btn btn-dark btn-lg btn-block"
                onClick={(e) => {
                  handleLoginFormSubmit(e, {
                    email: TEST_ACCOUNT_EMAIL,
                    password: TEST_ACCOUNT_PASSWORD
                  });
                }}
              >
                Login with test account
              </Button>
            </Form.Group>
          </Form>
        )}
        {formContent === 'forgottenPassword' && (
          <Form onSubmit={handleForgottenPasswordFormSubmit} className="login">
            <h3>Forgot Password</h3>
            {error && (
              <Form.Group className="error">
                <p>{`${error}`}</p>
              </Form.Group>
            )}
            {message && (
              <Form.Group className="message">
                <p>{`${message}`}</p>
              </Form.Group>
            )}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Enter your email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={user.email}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Button type="submit" className="btn btn-dark btn-lg btn-block">
                Send email
              </Button>
            </Form.Group>
            <Form.Group>
              <Button
                type="button"
                className="btn btn-dark btn-lg btn-block"
                onClick={() => {
                  setError('');
                  setFormContent('login');
                }}
              >
                Cancel
              </Button>
            </Form.Group>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Login;
