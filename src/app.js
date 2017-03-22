import restify from 'restify';
import SwaggerRestify from 'swagger-restify-mw';
import './initialiseExternalServices';
import log from './logging';
import AppStatusNotifier from './appStatusNotifier';
import EntityInitialiser from './services/authentication/entityInitialiser';
import gzipResponse from './api/middleware/gzipResponse';

log.info('App called');
EntityInitialiser.initialise();
log.info('after init');

const app = restify.createServer({
  name: 'phings-api',
  version: '0.1.0',
});

module.exports = app; // for testing

const config = {
  appRoot: __dirname,
};
SwaggerRestify.create(config, (err, swaggerRestify) => {
  if (err) {
    throw err;
  }
  //gzip here runs even when there is an error but causes 400 error to turn into 500
  //app.use(gzipResponse());
  swaggerRestify.register(app);
  //gzip here does not get called

  const port = process.env.PORT || 10010;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  AppStatusNotifier.appIsRunning();
});
