import { describe, it, before } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import AuthenticateService from '../../../../../services/authentication/authenticateService';
import * as user from '../../../../../services/authentication/user';

let mockUserModel = null;
let mockPasswordVerifier = null;
const secret = 'secret';
const testUser = {
  userName: 'anthony',
  firstName: 'Anthony',
  lastName: 'Hollingsworth',
  passwordHash: 'hash',
  passwordSalt: 'salt',
};
const testTokenUser = {
  userName: 'anthony',
  firstName: 'Anthony',
  lastName: 'Hollingsworth',
};

describe('authenticateservice', () => {
  describe('when-creating-a-json-web-token', () => {
    before(() => {
      mockUserModel = sinon.mock(user.default);
      mockPasswordVerifier = sinon.mock({
        verify: () => Promise.resolve(),
      });
    });
    it('should ask user model to find by username', (done) => {
      const mockFind = {
        exec: () => Promise.resolve([testUser]),
      };
      mockUserModel.expects('find')
        .once()
        .withArgs({ userName: 'anthony' })
        .returns(mockFind);
      const service = new AuthenticateService(mockPasswordVerifier.object);
      service.createJwtForUser('anthony')
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
    it('should ask passwordVerifier to verify password', (done) => {
      const password = 'password';
      const stubFind = {
        exec: () => Promise.resolve([testUser]),
      };
      const stub = sinon.stub(user.default, 'find').returns(stubFind);
      mockPasswordVerifier.expects('verify')
        .once()
        .withArgs(
            testUser.userName,
            password,
            testUser.passwordHash,
            testUser.passwordSalt,
        )
        .returns(Promise.resolve());
      const service = new AuthenticateService(mockPasswordVerifier.object);
      service.createJwtForUser('anthony', password)
        .then(() => {
          mockPasswordVerifier.verify();
          mockPasswordVerifier.restore();
          stub.restore();
          done();
        })
        .catch((err) => {
          mockPasswordVerifier.restore();
          stub.restore();
          done(err);
        });
    });
    it('should return a Json Web Token', (done) => {
      const mockFind = {
        exec: () => Promise.resolve([testUser]),
      };
      const stub = sinon.stub(user.default, 'find').returns(mockFind);
      const service = new AuthenticateService(mockPasswordVerifier.object);
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
});
