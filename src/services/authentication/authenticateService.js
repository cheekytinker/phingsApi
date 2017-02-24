import jwt from 'jsonwebtoken';
import User from './user';

const secret = 'secret';
const options = { expiresIn: 1440 };

function createTokenFormUser(users, reject) {
  if (users.length != 1) {
    return reject('user not found');
  }
  const { userName, firstName, lastName } = users[0];
  const token = jwt.sign(
    { userName, firstName, lastName },
    secret,
    options,
  );
  return token;
}

export default class AuthenticateService {
  createJwtForUser(userName, password) {
    return new Promise((resolve, reject) => {
      User.find({ userName, password })
        .exec()
        .then(users => resolve(createTokenFormUser(users, reject)))
        .catch(err => reject(err));
    });
  }
}

