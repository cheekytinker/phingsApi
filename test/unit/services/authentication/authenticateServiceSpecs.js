'use strict';

var _mocha = require('mocha');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _authenticateService = require('../../../../services/authentication/authenticateService');

var _authenticateService2 = _interopRequireDefault(_authenticateService);

var _user = require('../../../../services/authentication/user');

var user = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('authenticateservice', function () {
  (0, _mocha.it)('should ask user model to find by username and password', function (done) {
    var mockUserModel = _sinon2.default.mock(user.default);
    mockUserModel.expects('find').once().returns({ id: 123 });
    var service = new _authenticateService2.default(mockUserModel.object);
    service.findUser('userName', 'password').catch(function () {
      mockUserModel.verify();
      done();
    });
  });
});
//# sourceMappingURL=authenticateServiceSpecs.js.map
