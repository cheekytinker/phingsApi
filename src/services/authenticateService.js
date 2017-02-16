import { helpers } from 'inversify-vanillajs-helpers';
import config from '../helpers/config';

export default class AuthenticateService {
  constructor(userModel) {
    this.userModel = userModel;
  }
  findUser() {
    return this.userModel.find();
  }
}

helpers.annotate(AuthenticateService);
