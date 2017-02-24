'use strict';

var _mocha = require('mocha');

var _should = require('should');

var _should2 = _interopRequireDefault(_should);

var _container = require('../../../../api/helpers/container');

var _config = require('../../../../api/helpers/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _mocha.describe)('acceptance', function () {
  (0, _mocha.describe)('api', function () {
    (0, _mocha.describe)('helpers', function () {
      (0, _mocha.describe)('container', function () {
        (0, _mocha.describe)('should be able to resolve all dependencies', function () {
          (0, _mocha.it)('should fail', function () {
            var controller = _container.Container.get(_config.TYPES.AuthenticateController);
            _should2.default.exist(controller);
          });
        });
      });
    });
  });
});
//# sourceMappingURL=containerSpecs.js.map
