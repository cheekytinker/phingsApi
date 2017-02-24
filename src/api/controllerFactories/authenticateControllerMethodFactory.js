import { Container } from '../helpers/container';
import { TYPES } from '../helpers/config';

export const createToken = function (req, res) {
  return Container.get(TYPES.AuthenticateController).createToken(req, res);
};
