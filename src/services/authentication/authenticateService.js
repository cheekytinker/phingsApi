import User from './user';

function createTokenFormUser(users, reject) {
  if (users.length === 0) {
    return reject('user not found');
  }
  return '123';
}

export default class AuthenticateService {
  findUser(userName, password) {
    return new Promise((resolve, reject) => {
      User.find({ userName, password })
        .exec()
        .then(users => resolve(createTokenFormUser(users, reject)))
        .catch(err => reject(err));
    });
  }
}

