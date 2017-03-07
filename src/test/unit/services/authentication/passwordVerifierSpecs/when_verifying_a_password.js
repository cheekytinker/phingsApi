import { describe, it } from 'mocha';
import { expect } from 'chai';
import PasswordVerifier from '../../../../../services/authentication/passwordVerifier';

describe('unit', () => {
  describe('authentication', () => {
    describe('PasswordVerifier', () => {
      describe('when verifying a password', () => {
        it('should succeed if user\'s passwordHash equals supplied hash of password using passwordSalt', (done) => {
          const password = 'test123';
          const passwordHash = 'fred';
          const passwordSalt = 'salt';
          new PasswordVerifier()
            .verify(password, passwordHash, passwordSalt)
            .then((isValid) => {
              expect(isValid).to.equal(true);
              done();
            });
        });
        it('should fail if user\'s passwordHash not equal supplied hash of password using passwordSalt', (done) => {
          const password = 'test123';
          const passwordHash = 'fred';
          const passwordSalt = 'salt';
          new PasswordVerifier()
            .verify(password, passwordHash, passwordSalt)
            .then((isValid) => {
              expect(isValid).to.equal(true);
              done();
            });
        });
      });
    });
  });
});