import { serviceInput } from '../../common/constants';

const validate = {
  name: (value) =>
    typeof value === 'string' &&
    value.length >= serviceInput.SERVICE_NAME_MIN_LENGTH &&
    value.length <= serviceInput.SERVICE_NAME_MAX_LENGTH,
  carSegment: (value) =>
    typeof +value === 'string',
  price: (value) =>
    typeof +value === 'number' &&
    value >= serviceInput.SERVICE_PRICE_MIN_VALUE &&
    value <= serviceInput.SERVICE_PRICE_MAX_VALUE
};

const validateService = {
  name: (value) => {
    if (!validate.name(value)) {
      return ` must be between ${serviceInput.SERVICE_NAME_MIN_LENGTH} and ${serviceInput.SERVICE_NAME_MAX_LENGTH} characters`;
    }
    return '';
  },

  carSegment: () => {
    return '';
  },

  price: (value) => {
    if (!validate.price(value)) {
      return ' must be a positive number';
    }
    return '';
  }
};

export default validateService;
