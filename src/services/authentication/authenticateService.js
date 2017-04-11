import jwt from 'jsonwebtoken';
import Account from './../account/account';

const secret = 'secret';
const options = { expiresIn: 1440 };

function createTokenFromUser(user, password, passwordVerifier) {
  if (!user) {
    return Promise.reject('user not found');
  }
  const { userName, firstName, lastName, passwordHash, passwordSalt } = user;
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
}

export default class AuthenticateService {
  constructor(passwordVerifier) {
    this.passwordVerifier = passwordVerifier;
  }
  createJwtForUser(userName, password) {
    return Account.findByUserName(userName)
        .exec()
        .then((account) => {
          if (!account) {
            return Promise.reject('Account not found');
          }
          const user = account.users.find(foundUser => foundUser.userName === userName);
          return createTokenFromUser(user, password, this.passwordVerifier);
        });
  }
}
