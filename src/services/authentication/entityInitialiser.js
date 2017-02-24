import User from './user';

export default class EntityInitialiser {
  static initialise() {
    console.log('initialise called');
    return User
      .find({ userName: 'master' })
      .exec()
      .then((user) => {
        if (user.length === 0) {
          const master = new User();
          master.firstName = 'master';
          master.lastName = 'user';
          master.userName = 'master';
          master.password = 'test123';
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

