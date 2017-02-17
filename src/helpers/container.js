import 'reflect-metadata';
import inversify from 'inversify';
import { helpers } from 'inversify-vanillajs-helpers';
import { TYPES } from './config';
import AuthenticateController from '../controllers/authenticateController';
import AuthenticateService from '../services/authenticateService';
import UserModel from '../helpers/models';


helpers.annotate(UserModel);
helpers.annotate(AuthenticateController, [TYPES.AuthenticateService]);
helpers.annotate(AuthenticateService, [TYPES.UserModel]);


const container = new inversify.Container();
container.bind(TYPES.AuthenticateController).to(AuthenticateController);
container.bind(TYPES.AuthenticateService).to(AuthenticateService);
container.bind(TYPES.UserModel).to(UserModel);

exports.Container = container;
