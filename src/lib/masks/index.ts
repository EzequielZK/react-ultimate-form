import { onlyNumbersMask } from './onlyNumbersMask';
import emailMask from './emailMask';
import phoneMask from './phoneMask';
import cpfCnpjMask from './cpfCnpjMask';
import moneyMask from './moneyMask';
import cepMask from './cepMask';

const masks = {
  emailMask,
  phoneMask,
  cpfCnpjMask,
  moneyMask,
  cepMask,
  onlyNumbersMask,
};

export default masks;
