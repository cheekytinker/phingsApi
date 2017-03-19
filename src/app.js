import restify from 'restify';
import SwaggerRestify from 'swagger-restify-mw';
import './initialiseExternalServices';
import log from './logging';
import AppStatusNotifier from './appStatusNotifier';
import EntityInitialiser from './services/authentication/entityInitialiser';

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
  /*app.on('after', (req, res, route, error) => {
    const auditor = restify.auditLogger({
      log,
    });
    auditor(req, res, route, error);
  });*/


  swaggerRestify.register(app);
  /*app.use(restify.gzipResponse());
  app.use((req, res, next) => {
    const auditor = restify.auditLogger({
      log,
      body: true,
    });
    auditor(req, res);
    next();
  });
  app.on('after', (req, res, route, error) => {
    const auditor = restify.auditLogger({
      log,
    });
    auditor(req, res, route, error);
  });*/
  const port = process.env.PORT || 10010;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  AppStatusNotifier.appIsRunning();
});
