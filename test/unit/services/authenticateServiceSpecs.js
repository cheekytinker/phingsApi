import { describe, it, before } from 'mocha';
import sinon from 'sinon';
import AuthenticateService from '../../../src/services/authentication/authenticateService';

describe('authenticateservice', () => {
  it('should allow findUser', () => {
    const userModel = {
      find: () => {
      },
    };
    const service = new AuthenticateService(userModel);
    service.findUser();
  });
  it('should ask user model to find by username and password', () => {
    const userModel = {
      find: () => {
      },
    };
    const mockUserModel = sinon.mock(userModel)
    mockUserModel.expects('find').once().returns({ id:123 })
    const service = new AuthenticateService(mockUserModel.object);
    service.findUser();
    mockUserModel.verify();
  });
});
