import { describe, it, before } from 'mocha';
import { expect } from 'chai';
import shortid from 'shortid';
import Account from '../../../../../services/account/account';
import '../../../../../initialiseExternalServices';

const accountName = shortid.generate();
describe('integration', () => {
  describe('account', () => {
    describe('Account', () => {
      before('create test account', (done) => {
        const testAccount = new Account();
        testAccount.name = accountName;
        testAccount.setPrimaryContact({
          firstName: 'anthony',
          lastName: 'hollingsworth',
          email: 'test@cheekytinker.com',
          userName: `${accountName}username`,
          password: 'anthony',
        });
        testAccount
          .save()
          .then(() => {
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
      describe('when finding account by user name', () => {
        it('should find an account that contains a user with given username', (done) => {
          Account
            .findByUserName(`${accountName}username`)
            .exec()
            .then((user) => {
              expect(user).to.exist;
              done();
            })
            .catch((err) => {
              done(err);
            });
        });
      });
    });
  });
});