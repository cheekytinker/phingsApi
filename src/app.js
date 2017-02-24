require('./initialiseExternalServices');

console.log('App called');

const SwaggerRestify = require('swagger-restify-mw');
const restify = require('restify');
const app = restify.createServer();

module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required config
  //configDir: 'config',
  //swaggerFile: 'app/api/swagger/swagger.yaml',
};

SwaggerRestify.create(config, (err, swaggerRestify) => {
  if (err) { throw err; }

  swaggerRestify.register(app);

  const port = process.env.PORT || 10010;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  if (swaggerRestify.runner.swagger.paths['/hello']) {
    console.log(`try this:\ncurl http://127.0.0.1:${port}/hello?name=Scott`);
  }
});
