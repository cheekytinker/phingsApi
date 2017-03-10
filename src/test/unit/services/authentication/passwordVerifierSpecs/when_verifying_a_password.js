import { describe, it } from 'mocha';
import { expect } from 'chai';
import PasswordVerifier from '../../../../../services/authentication/passwordVerifier';

describe('unit', () => {
  describe('authentication', () => {
    describe('PasswordVerifier', () => {
      describe('when verifying a password', () => {
        it('should succeed if user\'s passwordHash equals supplied hash of password using passwordSalt', (done) => {
          const password = 'test123';
          const passwordHash = 'e9af9689e7b408bf2d9e5540c8a0926889061061e28c0bdcc96e0f1a27fc9d19a426debb0a27c2057156326a911a3d05a2cff9e1cf6250768d15a0e23413e168';
          const passwordSalt = 'salt';
          new PasswordVerifier()
            .verify(password, passwordHash, passwordSalt)
            .then(() => {
              done();
            });
        });
        it('should fail if user\'s passwordHash not equal supplied hash of password using passwordSalt', (done) => {
          const password = 'test123';
          const passwordHash = 'fred';
          const passwordSalt = 'salt';
          new PasswordVerifier()
            .verify(password, passwordHash, passwordSalt)
            .then(() => {
            })
            .catch((err) => {
              console.log(err);
              done();
            });
        });
      });
    });
  });
});