import model from './user';

export default class UserModel {
  find() {
    console.log('here');
    model.find();
    return null;
  }
}
