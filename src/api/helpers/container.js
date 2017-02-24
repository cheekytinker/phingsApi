import 'reflect-metadata';
import inversify from 'inversify';
import { helpers } from 'inversify-vanillajs-helpers';
import { TYPES } from './config';
import AuthenticateController from '../controllers/authenticateController';
import AuthenticateService from '../../services/authentication/authenticateService';

const container = new inversify.Container();
const register = helpers.register(container);
register(TYPES.AuthenticateService)(AuthenticateService);
register(TYPES.AuthenticateController, [TYPES.AuthenticateService])(AuthenticateController);

exports.Container = container;
