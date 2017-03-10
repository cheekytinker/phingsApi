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
          master.passwordHash = 'e9af9689e7b408bf2d9e5540c8a0926889061061e28c0bdcc96e0f1a27fc9d19a426debb0a27c2057156326a911a3d05a2cff9e1cf6250768d15a0e23413e168';
          master.passwordSalt = 'salt';
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

