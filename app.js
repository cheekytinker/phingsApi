'use strict';

require('./initialiseExternalServices');

var _entityInitialiser = require('./services/authentication/entityInitialiser');

var _entityInitialiser2 = _interopRequireDefault(_entityInitialiser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('App1 called');
_entityInitialiser2.default.initialise();
console.log('after init');

var SwaggerRestify = require('swagger-restify-mw');
var restify = require('restify');
var app = restify.createServer();

module.exports = app; // for testing

var config = {
  appRoot: __dirname };

SwaggerRestify.create(config, function (err, swaggerRestify) {
  if (err) {
    throw err;
  }

  swaggerRestify.register(app);

  var port = process.env.PORT || 10010;

  app.listen(port, function () {
    console.log('Listening on port ' + port);
  });

  if (swaggerRestify.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
//# sourceMappingURL=app.js.map
