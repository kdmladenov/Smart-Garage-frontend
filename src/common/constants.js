export const BASE_URL = 'http://localhost:5555';

export const userInput = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 20,
  MIN_FIRSTNAME_LENGTH: 2,
  MAX_FIRSTNAME_LENGTH: 20,
  MIN_LASTNAME_LENGTH: 2,
  MAX_LASTNAME_LENGTH: 20,
  MIN_EMAIL_LENGTH: 4,
  MAX_EMAIL_LENGTH: 50,
  EMAIL_REGEX: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  PHONE_REGEX: /^\(?(0[0-9]{3})\)?[-\s]?([0-9]{3})[-\s]?([0-9]{3})$/,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ // letters, numbers and at least 1 uppercase
};

export const modals = {
  VERTICALLY_CENTERED: 14
};