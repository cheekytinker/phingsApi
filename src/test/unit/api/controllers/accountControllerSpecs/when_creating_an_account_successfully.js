import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import AccountController from '../../../../../api/controllers/accountController';

describe('unit', () => {
  describe('account', () => {
    describe('AccountController', () => {
      describe('when creating an account successfully', () => {
        it('should ask invoker to execute CreateAccountCommand', () => {
          const accountQueries = {
            exists: () => {},
          };
          const commandInvoker = {
            execute: () => {},
          };
          const commandInvokerMock = sinon.mock(commandInvoker);
          sinon.stub(accountQueries, 'exists').returns(false);
          const controller = new AccountController(accountQueries, commandInvokerMock.object);
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
          const next = () => {
          };
          commandInvokerMock
            .expects('execute')
            .once();
          controller.createAccount(req, res, next)
          commandInvokerMock.verify();
        });
        it('should return CreateAccountResponse with new account uri', () => {
          const accountQueries = {
            exists: () => {},
          };
          const commandInvoker = {
            execute: () => {},
          };
          sinon.stub(commandInvoker, 'execute');
          sinon.stub(accountQueries, 'exists').returns(false);
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
            json: (obj) => { returnedJson = obj; },
            send: () => { },
            setHeader: () => {
            },
          };
          const next = () => {
          };
          controller.createAccount(req, res, next);
          const { rel, uri } = returnedJson;
          expect(rel).to.eq('view');
          expect(uri).to.eq(`/accounts/${req.body.name}`);
        });
        it('should return CreateAccountResponse with new account uri in Location header', () => {
          const accountQueries = {
            exists: () => {},
          };
          const commandInvoker = {
            execute: () => {},
          };
          sinon.stub(commandInvoker, 'execute');
          sinon.stub(accountQueries, 'exists').returns(false);
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
            .withArgs('Location', `/accounts/${req.body.name}`);
          const next = () => {
          };
          controller.createAccount(req, resMock.object, next);
          resMock.verify();
        });
      });
    });
  });
});
