import restify from 'restify';

module.exports = function create(fittingDef, bagpipes) {

  return function phings_gzip(context, next) {
    restify.gzipResponse()(context.request, context.response, next);
  };
};
