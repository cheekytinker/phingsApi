import {describe, it} from 'mocha';
import {expect} from 'chai';
import shortid from 'shortid';
import CreateAccountCommand from '../../../../../services/account/createAccountCommand';
import '../../../../../initialiseExternalServices';

describe('integration', () => {
  describe('account', () => {
    describe('CreateAccountCommand', () => {
      describe('when executed and account already exists', () => {
        it('should error', (done) => {
          const accountName = shortid.generate();
          const primaryContact = {
            userName: 'Anthony',
            password: 'pass123',
            firstName: 'Anthony',
            lastName: 'Hollingsworth',
            email: 'phing@cheekytinker.com',
          };
          const command = new CreateAccountCommand(accountName, primaryContact);
          const command2 = new CreateAccountCommand(accountName, primaryContact);
          command
            .execute()
            .then(() => {
              return command2
                .execute();
            })
            .catch((err) => {
              expect(`${err}`).to.contain('duplicate key error');
              done();
            });
        });
      });
    });
  });
});