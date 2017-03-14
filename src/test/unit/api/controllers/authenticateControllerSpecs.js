import { describe, it } from 'mocha';
import sinon from 'sinon';
import { expect } from 'chai';
import AuthenticateController from '../../../../api/controllers/authenticateController';
import AuthenticateService from '../../../../services/authentication/authenticateService';

describe('unit', () => {
  describe('api', () => {
    describe('controllers', () => {
      describe('authenticateController', () => {
        describe('createToken', () => {
          it('should ask service to get user matching username and password', (done) => {
            const service = {
              createJwtForUser: (userName, password) => {},
            };
            const serviceMock = sinon.mock(service);
            const controller = new AuthenticateController(serviceMock.object);

            serviceMock
              .expects('createJwtForUser')
              .once()
              .withArgs('userName', 'password')
              .returns(Promise.resolve('123'))
            const req = {
              body: {
                userName: 'userName',
                password: 'password',
              },
            };
            const res = {
              status: () => {},
              json: () => {},
            };
            controller.createToken(req, res, () => {})
              .then(() => {
                serviceMock.verify();
                done();
              });
          });
          it('should return 404 if user not found', () => {
            const serviceStub = sinon.stub(new AuthenticateService());
            const controller = new AuthenticateController(serviceStub);
            serviceStub
              .createJwtForUser
              .returns(Promise.reject('an error'));
            const req = {
              body: {
                userName: 'userName',
                password: 'password',
              },
            };
            const res = {
              status: (code) => {},
              json: () => {},
            };
            const resMock = sinon.mock(res);
            resMock.expects('status').once().withArgs(404);
            controller.createToken(req, resMock.object, () => {})
              .then(() => {

              })
              .catch(() => {
                resMock.verify();
                done();
              });
          });
          it('should return 201 if user found', (done) => {
            const serviceStub = sinon.stub(new AuthenticateService());
            const controller = new AuthenticateController(serviceStub);
            serviceStub
              .createJwtForUser
              .returns(Promise.resolve(123));
            const req = {
              body: {
                userName: 'userName',
                password: 'password',
              },
            };
            let retCode = 0
            const res = {
              status: (code) => { retCode = code; },
              json: () => {},
            };
            controller.createToken(req, res, () => {})
              .then(() => {
                expect(retCode).to.equal(201);
                done();
              });
          });
        });
      });
    });
  });
});

