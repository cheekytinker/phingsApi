import {describe, it} from 'mocha';
import {expect} from 'chai';
import PasswordVerifier from '../../../../../services/authentication/passwordVerifier';

describe('unit', () => {
  describe('authentication', () => {
    describe('PasswordVerifier', () => {
      describe('when verifying a password', () => {
        it('should succeed if user\'s passwordHash equals supplied hash of password using passwordSalt', () => {
          const password = 'test123';
          const passwordHash = 'fred';
          const passwordSalt = 'salt';
          const isValid = PasswordVerifier.verify(password, passwordHash, passwordSalt);
          expect(isValid).to.equal(true);
        });
      });
    });
  });
});