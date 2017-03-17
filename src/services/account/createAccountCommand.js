import crypto from 'crypto';
import User from '../authentication/user';
import Account from '../account/account';

export default class CreateAccountCommand {
  constructor(name, primaryContact) {
    this.name = name;
    this.primaryContact = primaryContact;
  }

  execute() {
    const user = new User();
    user.userName = this.primaryContact.userName;
    user.firstName = this.primaryContact.userName;
    user.passwordSalt = this.createSalt();
    user.passwordHash = this.createHash(this.primaryContact.password, user.passwordSalt);
    user.email = this.primaryContact.email;
    return user
      .save()
      .then(() => {
        const account = new Account();
        account.primaryContact = user.id;
        account.name = this.name;
        return account.save();
      })
      .then(() => {
        console.log('saved account');
      })
      .catch((err) => {
        console.log(`failed to save account ${err}`);
        user.remove();
        return Promise.reject(err);
      });
  }

  createSalt() {
    const saltLength = 128;
    const salt = crypto
      .randomBytes(Math.ceil(saltLength))
      .toString('hex')
      .slice(0, saltLength);
    return salt;
  }
  createHash(password, salt) {
    const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    const value = hash.digest('hex');
    return value;
  }
}
