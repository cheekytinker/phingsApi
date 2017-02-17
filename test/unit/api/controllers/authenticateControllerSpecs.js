import { describe, it } from 'mocha';
import sinon from 'sinon';
import AuthenticateController from '../../../../src/controllers/authenticateController';
import AuthenticateService from '../../../../src/services/authenticateService';


describe('unit', () => {
  describe('api', () => {
    describe('controllers', () => {
      describe('authenticateController', () => {
        describe('createToken', () => {
          it('should ask service to get user matching username and password', () => {
            const service = {
              findUser: () => {},
            };
            const serviceMock = sinon.mock(service);
            const controller = new AuthenticateController({ service: serviceMock.object });

            serviceMock.expects('findUser').once().withArgs('userName', 'password');
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
            controller.createToken(req, res);
            serviceMock.verify();
          });
          it('should return 404 if user not found', () => {
            const userModel = {
              find: () => {
              },
            };
            const serviceStub = sinon.stub(new AuthenticateService(userModel));
            const controller = new AuthenticateController({ service: serviceStub });
            serviceStub.findUser.returns(null);
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
            const resMock = sinon.mock(res);
            resMock.expects('status').once().withArgs(404);
            controller.createToken(req, res);

            resMock.verify();
          });
        });
      });
    });
  });
});

