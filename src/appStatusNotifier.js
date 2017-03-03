import https from 'https';

export default class AppStatusNotifier {
  static appIsRunning() {
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
}
