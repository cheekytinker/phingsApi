import { Container } from '../helpers/container';
import { TYPES } from '../helpers/config';

export const createAccount = function (req, res, next) {
  return Container.get(TYPES.AccountController).createAccount(req, res, next);
};