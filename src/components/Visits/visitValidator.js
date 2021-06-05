import { visitInput } from '../../common/constants';
import visitStatusEnum from '../../common/visit-status.enum';

const validate = {
  notes: (value) =>
    typeof value === 'string' &&
    value.length > visitInput.NOTES_MIN_LENGTH &&
    value.length < visitInput.NOTES_MAX_LENGTH,
  visitEnd: (value) => typeof value === 'string' && !new Date(value).toString().includes('Invalid'),
  visitStatus: (value) => Object.values(visitStatusEnum).includes(value)
};

const validateInput = {
  notes: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.notes(value)) {
      return ` must be between ${visitInput.NOTES_MIN_LENGTH} and ${visitInput.NOTES_MAX_LENGTH} characters.`;
    }
    return '';
  },

  visitStatus: (value) => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.visitStatus(value)) {
      return ' must be one of the listed';
    }
    return '';
  }
};

export default validateInput;
