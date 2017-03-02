import https from 'https';
import process from 'process';
import './initialiseExternalServices';
import EntityInitialiser from './services/authentication/entityInitialiser';


console.log('App1 called');
EntityInitialiser.initialise();
console.log('after init');

const SwaggerRestify = require('swagger-restify-mw');
const restify = require('restify');
const app = restify.createServer();

module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required config
  //configDir: 'config',
  //swaggerFile: 'app/api/swagger/swagger.yaml',
};

function triggerApiTests() {
  console.log(`${process.env.RUN_API_TESTS} and ${process.env.CIRCLE_TOKEN}`)
  const shouldRunTests = process.env.RUN_API_TESTS === 'true';
  const circleToken = process.env.CIRCLE_TOKEN || '';
  if (!shouldRunTests) {
    console.log('skipping requesting api tests');
    return;
  }
  const options = {
    host: 'circleci.com',
    path: `/api/v1.1/project/github/cheekytinker/phings-api-tests/tree/master?circle-token=${circleToken}`,
    method: 'POST',
  };
  const request = https
    .request(options, () => {
      console.log('triggering api tests');
    });
  request.on('error', (err) => {
    console.log(err);
  });
  request.end();
}

SwaggerRestify.create(config, (err, swaggerRestify) => {
  if (err) { throw err; }

  swaggerRestify.register(app);

  const port = process.env.PORT || 10010;

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  triggerApiTests();
});
