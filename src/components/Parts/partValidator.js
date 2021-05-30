import { partInput } from '../../common/constants';

const validate = {
  name: (value) =>
    typeof value === 'string' &&
    value.length >= partInput.PART_NAME_MIN_LENGTH &&
    value.length <= partInput.PART_NAME_MAX_LENGTH,
  carSegment: (value) => typeof +value === 'string',
  price: (value) =>
    typeof +value === 'number' &&
    value >= partInput.PART_PRICE_MIN_VALUE &&
    value <= partInput.PART_PRICE_MAX_VALUE
};

const validatePart = {
  name: (value) => {
    if (!validate.name(value)) {
      return ` must be between ${partInput.PART_NAME_MIN_LENGTH} and ${partInput.PART_NAME_MAX_LENGTH} characters`;
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

export default validatePart;
