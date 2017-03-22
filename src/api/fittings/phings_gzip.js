import log from '../../logging';

module.exports = function create(fittingDef, bagpipes) {

  return function phings_gzip(context, next) {
    log.info(`trying to zip ${context.request}`);
    if (context.response.statusCode === 500) {
      context.response.statusCode = 400;
    }
    next();
  };
};
