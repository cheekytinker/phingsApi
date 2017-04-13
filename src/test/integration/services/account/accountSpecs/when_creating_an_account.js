import { describe, it } from 'mocha';
import { expect } from 'chai';
import Account, { ACCOUNT_STATUS } from '../../../../../services/account/account';
import '../../../../../initialiseExternalServices';

describe('integration', () => {
  describe('account', () => {
    describe('Account', () => {
      describe('when creating an account', () => {
        it('should require a name', (done) => {
          const account = new Account();
          account.name = null;
          account.validate((err) => {
            expect(err.errors.name.kind).to.equal('required');
            done();
          });
        });
        it('should require a primaryContact', (done) => {
          const account = new Account();
          account.name = 'myaccount';
          account.validate((err) => {
            expect(err.errors.users.message).to.equal('primary contact must be supplied');
            done();
          });
        });
        it('should allow an account to be validated', (done) => {
          const account = new Account();
          account.name = 'myaccount';
          account.setPrimaryContact({
            firstName: 'anthony',
            lastName: 'hollingsworth',
            email: 'test@cheekytinker.com',
            userName: 'anthony',
            password: 'anthony',
          });
          account.validate((err) => {
            expect(err).not.to.exist;
            done();
          });
        });
        it('should set account status to Created', () => {
          const account = new Account();
          expect(account.status).to.equal(ACCOUNT_STATUS.Created);
        });
      });
    });
  });
});
