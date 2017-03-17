import 'reflect-metadata';
import inversify from 'inversify';
import { helpers } from 'inversify-vanillajs-helpers';
import { TYPES } from './config';
import AuthenticateController from '../controllers/authenticateController';
import AccountQueries from '../../services/account/accountQueries';
import CommandInvoker from '../helpers/commandInvoker';
import AccountController from '../controllers/accountController';
import AuthenticateService from '../../services/authentication/authenticateService';
import PasswordVerifier from '../../services/authentication/passwordVerifier';

const container = new inversify.Container();
const register = helpers.register(container);
register(TYPES.PasswordVerifier)(PasswordVerifier);
register(TYPES.AccountQueries)(AccountQueries);
register(TYPES.CommandInvoker)(CommandInvoker);
register(TYPES.AuthenticateService, [TYPES.PasswordVerifier])(AuthenticateService);
register(TYPES.AuthenticateController, [TYPES.AuthenticateService])(AuthenticateController);
register(TYPES.AccountController, [TYPES.AccountQueries, TYPES.CommandInvoker])(AccountController);

exports.Container = container;
