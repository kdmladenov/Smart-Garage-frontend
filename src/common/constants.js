export const BASE_URL = 'http://localhost:5555';

export const CURRENCY_API_KEY = '3999479f12222de128aa';
export const FOREX_API_KEY = 'c05f8e71-8525-460f-9465-277a0bc89cce';
export const CURRENCY_URL = 'https://free.currconv.com';
export const FOREX_API_URL = 'https://v2.api.forex';

export const userInput = {
  MIN_FIRST_NAME_LENGTH: 2,
  MAX_FIRST_NAME_LENGTH: 20,
  MIN_LAST_NAME_LENGTH: 2,
  MAX_LAST_NAME_LENGTH: 20,
  MIN_COMPANY_NAME_LENGTH: 2,
  MAX_COMPANY_NAME_LENGTH: 40,
  MIN_CITY_LENGTH: 4,
  MAX_CITY_LENGTH: 50,
  MIN_COUNTRY_LENGTH: 4,
  MAX_COUNTRY_LENGTH: 50,
  MIN_POSTAL_CODE_VALUE: 100,
  MAX_POSTAL_CODE_VALUE: 9999,
  MAX_EMAIL_LENGTH: 50,
  MIN_STREET_LENGTH: 4,
  MAX_STREET_LENGTH: 50,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 20,
  EMAIL_REGEX: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  PHONE_REGEX: /^(08[0-9]{8})$/,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ // letters, numbers and at least 1 uppercase
};

export const vehicleInput = {
  VIN_REGEX: /^(?<wmi>[A-HJ-NPR-Z\d]{3})(?<vds>[A-HJ-NPR-Z\d]{5})(?<check>[\dX])(?<vis>(?<year>[A-HJ-NPR-Z\d])(?<plant>[A-HJ-NPR-Z\d])(?<seq>[A-HJ-NPR-Z\d]{6}))$/,
  LICENSE_PLATE_REGEX: /^[A-Z0-9]{7,8}/,
  MIN_MANUFACTURED_YEAR: 1900
};

export const modals = {
  VERTICALLY_CENTERED: 14
};

export const serviceInput = {
  SERVICE_NAME_MIN_LENGTH: 2,
  SERVICE_NAME_MAX_LENGTH: 100,
  SERVICE_PRICE_MIN_VALUE: 0.1,
  SERVICE_PRICE_MAX_VALUE: 100000
};

export const partInput = {
  PART_NAME_MIN_LENGTH: 2,
  PART_NAME_MAX_LENGTH: 100,
  PART_PRICE_MIN_VALUE: 0.1,
  PART_PRICE_MAX_VALUE: 100000
};

export const visitInput = {
  NOTES_MIN_LENGTH: 10,
  NOTES_MAX_LENGTH: 255
};

export const partPrice = {
  MIN: 0,
  MAX: 2000
};

export const servicePrice = {
  MIN: 0,
  MAX: 1000
};

export const emptyVisit = {
  carSegment: '',
  city: '',
  companyName: '',
  country: '',
  email: '',
  engineType: '',
  firstName: '',
  lastName: '',
  licensePlate: '',
  manufacturedYear: 0,
  manufacturerId: 0,
  manufacturer: '',
  modelId: 0,
  modelName: '',
  notes: '',
  performedServices: [],
  phone: '',
  visitStatus: '',
  streetAddress: '',
  transmission: '',
  usedParts: [],
  userId: 0,
  vehicleId: 0,
  vin: '',
  visitEnd: '',
  visitStart: '',
  addressId: 0
};

export const emptyVehicle = {
  userId: 0,
  vin: '',
  licensePlate: '',
  engineType: '',
  transmission: '',
  manufacturedYear: 0,
  modelName: '',
  manufacturer: '',
  carSegment: ''
};

export const emptyCustomer = {
  firstName: '',
  lastName: '',
  companyName: '',
  phone: '',
  email: '',
  reenteredEmail: '',
  country: '',
  city: '',
  postalCode: '',
  streetAddress: ''
};
