export default class AuthenticateService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  findUser() {
    return this.userModel.find();
  }
}

