'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _mocha = require('mocha');

var _chai = require('chai');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _app = require('../../../../app');

var _app2 = _interopRequireDefault(_app);

var _user = require('../../../../services/authentication/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = null;
var uniqueUserName = _shortid2.default.generate();

(0, _mocha.describe)('acceptance', function () {
  (0, _mocha.describe)('api', function () {
    (0, _mocha.describe)('controllers', function () {
      (0, _mocha.after)('close server', function () {
        console.log('closing server and mongoose connection');
        _app2.default.close();
      });
      (0, _mocha.describe)('authenticate', function () {
        (0, _mocha.describe)('POST /authTokens', function () {
          (0, _mocha.before)('create test users', function (done) {
            user = new _user2.default();
            user.firstName = 'Anthony';
            user.userName = uniqueUserName;
            user.passwordHash = 'hash';
            user.passwordSalt = 'salt';
            user.save(function (err) {
              if (err) {
                console.log(err);
              }
              done();
            });
          });
          (0, _mocha.after)('Remove test users', function (done) {
            _user2.default.findOneAndRemove(user, function () {
              done();
            });
          });
          (0, _mocha.it)('should require a password parameter', function (done) {
            (0, _supertest2.default)(_app2.default).post('/authTokens').send({
              userName: 'myUserName'
            }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(400).end(function (err, res) {
              _should2.default.not.exist(err);

              var _res$body$results$err = _slicedToArray(res.body.results.errors, 1),
                  theMessage = _res$body$results$err[0].message;

              theMessage.should.match(/.*Missing required property: password.*/);
              done();
            });
          });
          (0, _mocha.it)('should require a userName parameter', function (done) {
            (0, _supertest2.default)(_app2.default).post('/authTokens').send({
              password: 'myUserName'
            }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(400).end(function (err, res) {
              _should2.default.not.exist(err);

              var _res$body$results$err2 = _slicedToArray(res.body.results.errors, 1),
                  theMessage = _res$body$results$err2[0].message;

              theMessage.should.match(/.*Missing required property: userName.*/);
              done();
            });
          });
          (0, _mocha.it)('should return a 404  if creds not valid', function (done) {
            (0, _supertest2.default)(_app2.default).post('/authTokens').send({
              userName: 'invalidmyUserName',
              password: 'myPassword'
            }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(404).end(function (err, res) {
              _should2.default.not.exist(err);
              console.log(res.body);
              done(err);
            });
          });
          (0, _mocha.describe)('if  credentials are valid', function () {
            (0, _mocha.it)('should return 201', function (done) {
              (0, _supertest2.default)(_app2.default).post('/authTokens').send({
                userName: uniqueUserName,
                password: 'password456'
              }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201).end(function (err, res) {
                _should2.default.not.exist(err);
                done(err);
              });
            });
            (0, _mocha.it)('should return a valid jwt token', function (done) {
              (0, _supertest2.default)(_app2.default).post('/authTokens').send({
                userName: uniqueUserName,
                password: 'password456'
              }).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201).end(function (err, res) {
                _jsonwebtoken2.default.verify(res.body, 'secret', function (decodeErr, decoded) {
                  if (decodeErr) {
                    done(decodeErr);
                    return;
                  }
                  (0, _chai.expect)(decoded).to.exist;
                  done();
                });
              });
            });
          });
        });
      });
    });
  });
});
//# sourceMappingURL=authenticateControllerSpecs.js.map
