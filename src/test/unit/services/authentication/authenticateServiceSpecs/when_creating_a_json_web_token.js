import { describe, it, beforeEach } from 'mocha';
import sinon from 'sinon';
import crypto from 'crypto';
import { expect } from 'chai';
import jwt from 'jsonwebtoken';
import AuthenticateService from '../../../../../services/authentication/authenticateService';
import * as account from '../../../../../services/account/account';

let mockAccountModel = null;
let mockPasswordVerifier = null;
const saltLength = 64;
const salt = crypto
  .randomBytes(Math.ceil(saltLength/2))
  .toString('hex')
  .slice(0, saltLength);

const secret = 'secret';
const testUser = {
  userName: 'anthony',
  firstName: 'Anthony',
  lastName: 'Hollingsworth',
  passwordHash: 'hash',
  passwordSalt: salt,
};
const testTokenUser = {
  userName: 'anthony',
  firstName: 'Anthony',
  lastName: 'Hollingsworth',
};

describe('authenticateservice', () => {
  describe('when-creating-a-json-web-token', () => {
    beforeEach(() => {
      mockAccountModel = sinon.mock(account.default);
      mockAccountModel.users = [testUser];
      mockPasswordVerifier = sinon.mock({
        verify: () => Promise.resolve(),
      });
    });
    it('should ask account model to find by username', (done) => {
      const mockFind = {
        exec: () => Promise.resolve(mockAccountModel),
      };
      mockAccountModel.expects('findByUserName')
        .once()
        .withArgs('anthony')
        .returns(mockFind);
      const service = new AuthenticateService(mockPasswordVerifier.object);
      service.createJwtForUser('anthony')
        .then(() => {
          mockAccountModel.verify();
          mockAccountModel.restore();
          done();
        })
        .catch((err) => {
          mockAccountModel.restore();
          done(err);
        });
    });
    it('should ask passwordVerifier to verify password', (done) => {
      const password = 'password';
      const stubFind = {
        exec: () => Promise.resolve(mockAccountModel),
      };
      const stub = sinon.stub(account.default, 'findByUserName').returns(stubFind);
      mockPasswordVerifier.expects('verify')
        .once()
        .withArgs(
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
        exec: () => Promise.resolve(mockAccountModel),
      };
      const stub = sinon.stub(account.default, 'findByUserName').returns(mockFind);
      const service = new AuthenticateService(mockPasswordVerifier.object);
      service.createJwtForUser('anthony', 'password')
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
