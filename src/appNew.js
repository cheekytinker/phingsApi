import restify from 'restify';
import swagger from 'swagger-tools';
import yaml from 'yamljs';
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

const swaggerObject = yaml.load('./api/swagger/swagger.yaml');
const routerOptions = { controllers: './api/controllerFactories' };

swagger.initializeMiddleware(swaggerObject, (middleware) => {
  app.use(restify.CORS());

  app.on('after', restify.auditLogger({
    log,
  }));

  app.on('uncaughtException', (request, response, route, error) => {
    log.info(error);
    response.send(error);
  });

  ['get', 'put', 'post', 'delete', 'head', 'patch'].forEach((verb) => {
    let mappedVerb = verb;
    if (verb === 'delete') {
      mappedVerb = 'del';
    }

    app[mappedVerb](/.*/,
      middleware.swaggerMetadata(),
      middleware.swaggerValidator({ validateResponse: true }),
      middleware.swaggerRouter(routerOptions),
      middleware.swaggerUi(),
    );
  });

  const port = process.env.PORT || 10010;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    AppStatusNotifier.appIsRunning();
  });
});
