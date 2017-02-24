'use strict';

var _mocha = require('mocha');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chai = require('chai');

var _authenticateController = require('../../../../api/controllers/authenticateController');

var _authenticateController2 = _interopRequireDefault(_authenticateController);

var _authenticateService = require('../../../../services/authentication/authenticateService');

var _authenticateService2 = _interopRequireDefault(_authenticateService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('unit', function () {
  (0, _mocha.describe)('api', function () {
    (0, _mocha.describe)('controllers', function () {
      (0, _mocha.describe)('authenticateController', function () {
        (0, _mocha.describe)('createToken', function () {
          (0, _mocha.it)('should ask service to get user matching username and password', function (done) {
            var service = {
              createJwtForUser: function createJwtForUser(userName, password) {}
            };
            var serviceMock = _sinon2.default.mock(service);
            var controller = new _authenticateController2.default(serviceMock.object);

            serviceMock.expects('createJwtForUser').once().withArgs('userName', 'password').returns(Promise.resolve('123'));
            var req = {
              body: {
                userName: 'userName',
                password: 'password'
              }
            };
            var res = {
              status: function status() {},
              json: function json() {}
            };
            controller.createToken(req, res).then(function () {
              serviceMock.verify();
              done();
            });
          });
          (0, _mocha.it)('should return 404 if user not found', function () {
            var serviceStub = _sinon2.default.stub(new _authenticateService2.default());
            var controller = new _authenticateController2.default(serviceStub);
            serviceStub.createJwtForUser.returns(Promise.reject('an error'));
            var req = {
              body: {
                userName: 'userName',
                password: 'password'
              }
            };
            var res = {
              status: function status(code) {},
              json: function json() {}
            };
            var resMock = _sinon2.default.mock(res);
            resMock.expects('status').once().withArgs(404);
            controller.createToken(req, resMock.object).then(function () {}).catch(function () {
              resMock.verify();
              done();
            });
          });
          (0, _mocha.it)('should return 201 if user found', function (done) {
            var serviceStub = _sinon2.default.stub(new _authenticateService2.default());
            var controller = new _authenticateController2.default(serviceStub);
            serviceStub.createJwtForUser.returns(Promise.resolve(123));
            var req = {
              body: {
                userName: 'userName',
                password: 'password'
              }
            };
            var retCode = 0;
            var res = {
              status: function status(code) {
                retCode = code;
              },
              json: function json() {}
            };
            //const resMock = sinon.mock(res);
            //resMock.expects('status').once().withArgs(201);
            controller.createToken(req, res).then(function () {
              (0, _chai.expect)(retCode).to.equal(201);
              done();
            });

            //resMock.verify();
          });
        });
      });
    });
  });
});
//# sourceMappingURL=authenticateControllerSpecs.js.map
