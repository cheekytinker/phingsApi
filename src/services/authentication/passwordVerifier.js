import crypto from 'crypto';

function sha512(password, salt) {
  const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  const value = hash.digest('hex');
  return value;
};

export default class PasswordVerifier {
  static createHash(password, salt) {
    return sha512(password, salt);
  }
  verify(password, passwordHash, passwordSalt) {
    return new Promise((resolve, reject) => {
      const salted = sha512(password, passwordSalt);
      if (salted === passwordHash) {
        resolve(true);
        return;
      }
      reject('Password not verified');
    });
  }
}
