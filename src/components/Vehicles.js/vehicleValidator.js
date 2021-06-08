import { vehicleInput } from '../../common/constants';
import engineType from '../../common/engine-type.enum';
import transmission from '../../common/transmission.enum';

const validate = {
  vin: (value) => vehicleInput.VIN_REGEX.test(value),
  licensePlate: (value) => vehicleInput.LICENSE_PLATE_REGEX.test(value) && value.length <= vehicleInput.MAX_LICENSE_PLATE_LENGTH,
  engineType: (value) => Object.values(engineType).includes(value),
  transmission: (value) => Object.values(transmission).includes(value),
  manufacturedYear: (value) => value > vehicleInput.MIN_MANUFACTURED_YEAR && value <= new Date().getFullYear(),
  modelName: (value) => typeof value === 'string',
  manufacturer: (value) => typeof value === 'string',
  carSegment: (value) => typeof value === 'string'
};

const validateInput = {
  vin: value => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.vin(value)) {
      return ' must be valid';
    }
    return '';
  },

  licensePlate: value => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.licensePlate(value)) {
      return ' must be valid';
    }
    return '';
  },

  engineType: value => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.engineType(value)) {
      return ' must be one of the listed';
    }
    return '';
  },

  transmission: value => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.transmission(value)) {
      return ' must be one of the listed';
    }
    return '';
  },

  manufacturedYear: value => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.manufacturedYear(value)) {
      return ' must be a valid year';
    }
    return '';
  },

  modelName: value => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.modelName(value)) {
      return ' must be one of the listed';
    }
    return '';
  },

  manufacturer: value => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.manufacturer(value)) {
      return ' must be one of the listed';
    }
    return '';
  },

  carSegment: value => {
    if (!value) {
      return ' is required!';
    }
    if (!validate.carSegment(value)) {
      return ' must be one of the listed';
    }
    return '';
  }
};

export default validateInput;
