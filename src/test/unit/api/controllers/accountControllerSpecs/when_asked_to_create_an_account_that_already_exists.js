import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import AccountController from '../../../../../api/controllers/accountController';

describe('unit', () => {
  describe('account', () => {
    describe('AccountController', () => {
      describe('when asked to create an account that already exists', () => {
        it('should return 403 Forbidden with message', () => {
          const accountQueries = {
            exists: () => {},
          };
          const accountQueriesMock = sinon.mock(accountQueries);
          const controller = new AccountController(accountQueriesMock.object);

          accountQueriesMock
            .expects('exists')
            .once()
            .withArgs('myaccount')
            .returns(true)
          const req = {
            body: {
              name: 'myaccount',
              primaryContact: {
                userName: '',
                password: '',
                email: '',
              },
            },
          };
          const res = {
            status: () => { },
            json: () => { },
            send: () => { },
          };
          const next = () => {
          };
          controller.createAccount(req, res, next)
          accountQueriesMock.verify();
        });
      });
    });
  });
});
