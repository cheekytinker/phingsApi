import 'reflect-metadata';
import inversify from 'inversify';
import { helpers } from 'inversify-vanillajs-helpers';
import { TYPES } from './config';
import AuthenticateController from '../controllers/authenticateController';
import AuthenticateService from '../../services/authentication/authenticateService';
import UserModel from '../../services/authentication/userModel';

const container = new inversify.Container();
const register = helpers.register(container);
register(TYPES.UserModel)(UserModel);
register(TYPES.AuthenticateService, [TYPES.UserModel])(AuthenticateService);
register(TYPES.AuthenticateController, [TYPES.AuthenticateService])(AuthenticateController);

exports.Container = container;
