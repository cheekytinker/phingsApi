import { describe, it } from 'mocha';
import { expect } from 'chai';
import Account from '../../../../../services/account/account';

describe('unit', () => {
  describe('account', () => {
    describe('account', () => {
      describe('when creating an account', () => {
        it('should have a collection of user subdocuments', () => {
          const account = new Account();
          expect(account.users).to.be.instanceOf(Array);
        });
      });
    });
  });
});