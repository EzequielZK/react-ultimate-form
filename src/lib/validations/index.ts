import isCep from './isCep';
import isCpf from './isCpf';
import isEmail from './isEmail';
import isPhone from './isPhone';
import isValidPassword from './isValidPassword';

const validations = {
  isValidPassword,
  isEmail,
  isCpf,
  isCep,
  isPhone,
};

export default validations;
