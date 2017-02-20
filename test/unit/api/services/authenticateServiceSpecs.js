import { describe, it, before } from 'mocha';
import sinon from 'sinon';
import inversify from 'inversify';
import AuthenticateService from '../../../../src/api/services/authenticateService';
import { TYPES } from '../../../../src/api/helpers/config';

describe('authenticateservice', () => {
  let container = null;
  before('setup container', () => {
    container = new inversify.Container();
    //container.bind(TYPES.AuthenticateService).to(AuthenticateService);
  });
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
