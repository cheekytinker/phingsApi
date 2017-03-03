import jwt from 'jsonwebtoken';
import User from './user';

const secret = 'secret';
const options = { expiresIn: 1440 };

function createTokenFromUser(users, password, passwordVerifier, reject) {
  if (users.length !== 1) {
    return reject('user not found');
  }
  const { userName, firstName, lastName, passwordHash, passwordSalt } = users[0];
  return passwordVerifier
    .verify(userName, password, passwordHash, passwordSalt)
    .then(() => {
      const token = jwt.sign(
        { userName, firstName, lastName },
        secret,
        options,
      );
      return token;
    });
};

export default class AuthenticateService {
  constructor(passwordVerifier) {
    this.passwordVerifier = passwordVerifier;
  }
  createJwtForUser(userName, password) {
    return new Promise((resolve, reject) => {
      User.find({ userName })
        .exec()
        .then(users => resolve(createTokenFromUser(users, password, this.passwordVerifier, reject)))
        .catch(err => reject(err));
    });
  }
}
