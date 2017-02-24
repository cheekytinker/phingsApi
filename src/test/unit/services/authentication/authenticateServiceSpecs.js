import { describe, it, before, beforeEach, after, afterEach } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import AuthenticateService from '../../../../services/authentication/authenticateService';
import * as user from '../../../../services/authentication/user';

let mockUserModel = null;
const secret = 'secret';
const testUser = {
  userName: 'anthony',
  firstName: 'Anthony',
  lastName: 'Hollingsworth',
  password: 'pwd',
};
const testTokenUser = {
  userName: 'anthony',
  firstName: 'Anthony',
  lastName: 'Hollingsworth',
};

describe('authenticateservice', () => {
  before(() => {
    mockUserModel = sinon.mock(user.default);
  });
  after(() => {

  });
  it('should ask user model to find by username and password', (done) => {
    const mockFind = {
      exec: () => Promise.resolve([testUser]),
    };
    mockUserModel.expects('find')
      .once()
      .withArgs({ userName: 'anthony', password: 'password' })
      .returns(mockFind);
    const service = new AuthenticateService();
    service.createJwtForUser('anthony', 'password')
      .then(() => {
        mockUserModel.verify();
        mockUserModel.restore();
        done();
      })
      .catch((err) => {
        mockUserModel.restore();
        done(err);
      });
  });
  it('should return a Json Web Token', (done) => {
    const mockFind = {
      exec: () => Promise.resolve([testUser]),
    };
    const stub = sinon.stub(user.default, 'find').returns(mockFind);
    const service = new AuthenticateService();
    service.createJwtForUser('userName', 'password')
      .then((token) => {
        stub.restore();
        jwt.verify(token, secret, (err, decoded) => {
          expect(err).not.to.exist;
          expect(decoded.userName).to.equal(testTokenUser.userName);
          done(err);
        });
      })
      .catch((err) => {
        stub.restore();
        done(err);
      });
  });
});
