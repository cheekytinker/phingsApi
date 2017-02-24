import { describe, it } from 'mocha';
import sinon from 'sinon';
import AuthenticateService from '../../../../services/authentication/authenticateService';
import * as user from '../../../../services/authentication/user';

describe('authenticateservice', () => {
  it('should ask user model to find by username and password', (done) => {
    const mockUserModel = sinon.mock(user.default);
    mockUserModel.expects('find')
      .once()
      .returns({ id:123 });
    const service = new AuthenticateService(mockUserModel.object);
    service.findUser('userName', 'password')
      .catch(() => {
        mockUserModel.verify();
        done();
      });
  });
});
