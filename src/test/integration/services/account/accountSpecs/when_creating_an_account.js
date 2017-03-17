import { describe, it } from 'mocha';
import { expect } from 'chai';
import Account from '../../../../../services/account/account';
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
            expect(err.errors.primaryContact.kind).to.equal('required');
            done();
          });
        });
      });
    });
  });
});