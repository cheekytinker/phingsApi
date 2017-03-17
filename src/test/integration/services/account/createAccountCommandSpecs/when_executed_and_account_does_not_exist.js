import {describe, it} from 'mocha';
import {expect} from 'chai';
import shortid from 'shortid';
import Account from '../../../../../services/account/account';
import CreateAccountCommand from '../../../../../services/account/createAccountCommand';
import '../../../../../initialiseExternalServices';

describe('integration', () => {
  describe('account', () => {
    describe('CreateAccountCommand', () => {
      describe('when executed and account does not exist', () => {
        it('should create account in repository', (done) => {
          const accountName = shortid.generate();
          const primaryContact = {
            userName: 'Anthony',
            password: 'pass123',
            email: 'phing@cheekytinker.com',
          };
          const command = new CreateAccountCommand(accountName, primaryContact);
          command
            .execute()
            .then(() => {
              Account.find({ name: accountName })
                .then((account) => {
                  expect(account).to.exist;
                  done();
                });
            })
            .catch((err) => {
              done(err);
            });
        });
      });
    });
  });
});