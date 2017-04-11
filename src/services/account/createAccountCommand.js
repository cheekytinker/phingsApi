import crypto from 'crypto';
import Account from '../account/account';
import log from '../../logging';

export default class CreateAccountCommand {
  constructor(name, primaryContact) {
    this.name = name;
    this.primaryContact = primaryContact;
  }

  execute() {
    const account = new Account();
    account.setPrimaryContact(this.primaryContact);
    account.name = this.name;
    return account
      .save()
      .then(() => {
        log.info('saved account');
      })
      .catch((err) => {
        log.info(`failed to save account ${err}`);
        account.remove();
        return Promise.reject(err);
      });
  }

  static createSalt() {
    const saltLength = 128;
    const salt = crypto
      .randomBytes(Math.ceil(saltLength))
      .toString('hex')
      .slice(0, saltLength);
    return salt;
  }
  static createHash(password, salt) {
    const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    const value = hash.digest('hex');
    return value;
  }
}
