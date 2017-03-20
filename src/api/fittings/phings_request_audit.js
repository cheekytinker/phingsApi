import restify from 'restify';
import logging from '../../logging';


module.exports = function create(fittingDef, bagpipes) {

  return function phings_request_audit(context, next) {
    const auditor = restify.auditLogger({
      log: logging,
    });
    auditor(context.request, context.response);
    next();
  };
};