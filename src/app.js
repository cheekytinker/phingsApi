import './initialiseExternalServices';
import AppStatusNotifier from './appStatusNotifier';
import EntityInitialiser from './services/authentication/entityInitialiser';


console.log('App1 called');
EntityInitialiser.initialise();
console.log('after init');

const SwaggerRestify = require('swagger-restify-mw');
const restify = require('restify');
const app = restify.createServer();

module.exports = app; // for testing

const config = {
  appRoot: __dirname,
};

SwaggerRestify.create(config, (err, swaggerRestify) => {
  if (err) { throw err; }

  swaggerRestify.register(app);

  const port = process.env.PORT || 10010;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  AppStatusNotifier.appIsRunning();
});
