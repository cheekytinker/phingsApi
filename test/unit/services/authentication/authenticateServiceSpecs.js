'use strict';

var _mocha = require('mocha');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _chai = require('chai');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _authenticateService = require('../../../../services/authentication/authenticateService');

var _authenticateService2 = _interopRequireDefault(_authenticateService);

var _user = require('../../../../services/authentication/user');

var user = _interopRequireWildcard(_user);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mockUserModel = null;
var secret = 'secret';
var testUser = {
  userName: 'anthony',
  firstName: 'Anthony',
  lastName: 'Hollingsworth',
  password: 'pwd'
};
var testTokenUser = {
  userName: 'anthony',
  firstName: 'Anthony',
  lastName: 'Hollingsworth'
};

(0, _mocha.describe)('authenticateservice', function () {
  (0, _mocha.before)(function () {
    mockUserModel = _sinon2.default.mock(user.default);
  });
  (0, _mocha.after)(function () {});
  (0, _mocha.it)('should ask user model to find by username and password', function (done) {
    var mockFind = {
      exec: function exec() {
        return Promise.resolve([testUser]);
      }
    };
    mockUserModel.expects('find').once().withArgs({ userName: 'anthony', password: 'password' }).returns(mockFind);
    var service = new _authenticateService2.default();
    service.createJwtForUser('anthony', 'password').then(function () {
      mockUserModel.verify();
      mockUserModel.restore();
      done();
    }).catch(function (err) {
      mockUserModel.restore();
      done(err);
    });
  });
  (0, _mocha.it)('should return a Json Web Token', function (done) {
    var mockFind = {
      exec: function exec() {
        return Promise.resolve([testUser]);
      }
    };
    var stub = _sinon2.default.stub(user.default, 'find').returns(mockFind);
    var service = new _authenticateService2.default();
    service.createJwtForUser('userName', 'password').then(function (token) {
      stub.restore();
      _jsonwebtoken2.default.verify(token, secret, function (err, decoded) {
        (0, _chai.expect)(err).not.to.exist;
        (0, _chai.expect)(decoded.userName).to.equal(testTokenUser.userName);
        done(err);
      });
    }).catch(function (err) {
      stub.restore();
      done(err);
    });
  });
});
//# sourceMappingURL=when_creating_a_json_web_token.js.map
