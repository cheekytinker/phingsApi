import User from './user';

export default class EntityInitialiser {
  static initialise() {
    return User
      .find({ userName: 'master' })
      .exec()
      .then((user) => {
        if (user.length === 0) {
          const master = new User();
          master.firstName = 'master';
          master.lastName = 'user';
          master.userName = 'master';
          master.passwordHash = 'test123';
          master.passwordSalt = 'test123';
          return master
            .save();
        }
        return null;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

