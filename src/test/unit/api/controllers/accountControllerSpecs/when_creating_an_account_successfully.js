import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import AccountController from '../../../../../api/controllers/accountController';

describe('unit', () => {
  describe('account', () => {
    describe('AccountController', () => {
      describe('when creating an account successfully', () => {
        it('should return CreateAccountResponse with new account uri', (done) => {
          const accountQueries = {
            exists: () => {},
          };
          const commandInvoker = {
            execute: () => {
              console.log('executing');
              return Promise.resolve();
            },
          };
          sinon.stub(accountQueries, 'exists').returns(Promise.resolve(false));
          const controller = new AccountController(accountQueries, commandInvoker);
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
          let returnedJson = null;
          const res = {
            status: () => { },
            json: (obj) => {
              returnedJson = obj;
            },
            send: () => { },
            setHeader: () => {
            },
          };
          const next = () => {
          };
          controller.createAccount(req, res, next)
            .then(() => {
              const { rel, uri } = returnedJson;
              expect(rel).to.eq('view');
              expect(uri).to.eq(`/accounts/${req.body.name}`);
              done();
            });
        });
        it('should return CreateAccountResponse with new account uri in Location header', () => {
          const accountQueries = {
            exists: () => {},
          };
          const commandInvoker = {
            execute: () => { return Promise.resolve(); },
          };
          sinon.stub(accountQueries, 'exists').returns(Promise.resolve(false));
          const controller = new AccountController(accountQueries, commandInvoker);
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
            setHeader: () => {
            },
          };
          const resMock = sinon.mock(res);
          resMock
            .expects('setHeader')
            .once()
            .withArgs('location', `/accounts/${req.body.name}`);
          const next = () => {
          };
          controller.createAccount(req, resMock.object, next)
            .then(() => {
              resMock.verify();
            });
        });
      });
    });
  });
});
