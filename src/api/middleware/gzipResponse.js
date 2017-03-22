import log from '../../logging';
import restify from 'restify';


export default function gzipResponse() {
  return (req, res, next) => {
    log.info(`My gzip ${res}`);
    if (res.statusCode === 400) {
      next();
      return;
    }
    restify.gzipResponse()(req, res, next);
  };
}
