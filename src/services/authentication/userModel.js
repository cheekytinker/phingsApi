import model from './user';

export default class UserModel {
  find() {
    console.log('here');
    model.find({})
      .exec((err, users) => {
        if (err) {
          return null;
        }
        return users[0];
      });
    return null;
  }
}
