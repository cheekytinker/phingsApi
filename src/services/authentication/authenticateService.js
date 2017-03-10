import jwt from 'jsonwebtoken';
import User from './user';

const secret = 'secret';
const options = { expiresIn: 1440 };

function createTokenFromUser(users, password, passwordVerifier) {
  if (users.length !== 1) {
    return Promise.reject('user not found');
  }
  const { userName, firstName, lastName, passwordHash, passwordSalt } = users[0];
  return passwordVerifier
    .verify(password, passwordHash, passwordSalt)
    .then(() => {
      const token = jwt.sign(
        { userName, firstName, lastName },
        secret,
        options,
      );
      return Promise.resolve(token);
    });
};

export default class AuthenticateService {
  constructor(passwordVerifier) {
    this.passwordVerifier = passwordVerifier;
  }
  createJwtForUser(userName, password) {
    return User.find({ userName })
        .exec()
        .then(users => createTokenFromUser(users, password, this.passwordVerifier));
  }
}
