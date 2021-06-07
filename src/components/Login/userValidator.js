import { userInput } from '../../common/constants';
import roleType from '../../common/role-type.enum';

const validate = {
  email: value => typeof value === 'string' && value.length <= userInput.MAX_EMAIL_LENGTH && value.match(userInput.EMAIL_REGEX),
  reenteredEmail: (value, match) => value === match,
  password: {
    length: value => typeof value === 'string' && value.length >= userInput.MIN_PASSWORD_LENGTH && value.length <= userInput.MAX_PASSWORD_LENGTH,
    upperCase: value => (/[A-Z]/.test(value)),
    lowerCase: value => (/[a-z]/.test(value)),
    digit: value => (/[\d]/.test(value))
  },
  reenteredPassword: (value, match) => value === match,
  firstName: value => typeof value === 'string' && value.length >= userInput.MIN_FIRST_NAME_LENGTH && value.length <= userInput.MAX_FIRST_NAME_LENGTH,
  lastName: value => typeof value === 'string' && value.length >= userInput.MIN_LAST_NAME_LENGTH && value.length <= userInput.MAX_LAST_NAME_LENGTH,
  role: value => Object.values(roleType).includes(value),
  companyName: value => typeof value === 'string' && value.length >= userInput.MIN_COMPANY_NAME_LENGTH && value.length <= userInput.MAX_COMPANY_NAME_LENGTH,
  phone: value => typeof value === 'string' && value.match(userInput.PHONE_REGEX),
  country: value => typeof value === 'string' && value.length >= userInput.MIN_COUNTRY_LENGTH && value.length <= userInput.MAX_COUNTRY_LENGTH,
  city: value => typeof value === 'string' && value.length >= userInput.MIN_CITY_LENGTH && value.length <= userInput.MAX_CITY_LENGTH,
  streetAddress: value => typeof value === 'string' && value.length >= userInput.MIN_STREET_LENGTH && value.length <= userInput.MAX_STREET_LENGTH,
  postalCode: value => typeof +value === 'number' && value >= userInput.MIN_POSTAL_CODE_VALUE && value <= userInput.MAX_POSTAL_CODE_VALUE
};

const validateInput = {
  email: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.email(value)) {
      return ' must be valid';
    }
    return '';
  },

  reenteredEmail: (value, match) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.reenteredEmail(value, match)) {
      return ' does not match';
    }
    return '';
  },

  password: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.password.length(value)) {
      return ` must be between ${userInput.MIN_PASSWORD_LENGTH} and ${userInput.MAX_PASSWORD_LENGTH} characters`;
    }
    if (!validate.password.lowerCase(value)) {
      return ' must include a lowercase letter';
    }
    if (!validate.password.upperCase(value)) {
      return ' must include an uppercase letter';
    }
    if (!validate.password.digit(value)) {
      return ' must include a digit';
    }
    return '';
  },

  reenteredPassword: (value, match) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.reenteredPassword(value, match)) {
      return ' does not match';
    }
    return '';
  },

  currentPassword: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.password.length(value)) {
      return `must be between ${userInput.MIN_PASSWORD_LENGTH} and ${userInput.MAX_PASSWORD_LENGTH} characters`;
    }
    if (!validate.password.lowerCase(value)) {
      return ' must include a lowercase letter';
    }
    if (!validate.password.upperCase(value)) {
      return ' must include an uppercase letter';
    }
    if (!validate.password.digit(value)) {
      return ' must include a digit';
    }
    return '';
  },

  firstName: (value) => {
    if (!validate.firstName(value)) {
      return ` must be between ${userInput.MIN_FIRST_NAME_LENGTH} and ${userInput.MAX_FIRST_NAME_LENGTH} characters`;
    }
    return '';
  },

  lastName: (value) => {
    if (!validate.lastName(value)) {
      return ` must be between ${userInput.MIN_LAST_NAME_LENGTH} and ${userInput.MAX_LAST_NAME_LENGTH} characters`;
    }
    return '';
  },

  companyName: (value) => {
    if (!validate.companyName(value)) {
      return ` must be between ${userInput.MIN_COMPANY_NAME_LENGTH} and ${userInput.MAX_COMPANY_NAME_LENGTH} characters`;
    }
    return '';
  },

  phone: (value) => {
    if (!validate.phone(value)) {
      return ' must be valid';
    }
    return '';
  },

  role: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.role(value)) {
      return ' must be one of the listed';
    }
    return '';
  },

  country: (value) => {
    if (!validate.country(value)) {
      return ` must be between ${userInput.MIN_COUNTRY_LENGTH} and ${userInput.MAX_COUNTRY_LENGTH} characters`;
    }
    return '';
  },

  city: (value) => {
    if (!validate.city(value)) {
      return ` must be between ${userInput.MIN_CITY_LENGTH} and ${userInput.MAX_CITY_LENGTH} characters`;
    }
    return '';
  },

  streetAddress: (value) => {
    if (!validate.streetAddress(value)) {
      return ` must be between ${userInput.MIN_STREET_LENGTH} and ${userInput.MAX_STREET_LENGTH} characters`;
    }
    return '';
  },

  postalCode: (value) => {
    if (!validate.postalCode(value)) {
      return ` must be between a number in range ${userInput.MIN_POSTAL_CODE_VALUE} - ${userInput.MAX_POSTAL_CODE_VALUE}`;
    }
    return '';
  }
};

export default validateInput;
