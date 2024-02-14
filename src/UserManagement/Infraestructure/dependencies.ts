import RegisterUserCase from "../Application/UseCase/RegisterUserUseCase";
import LoginUserCase from "../Application/UseCase/LoginUserCase";
import ActivateUserUseCase from "../Application/UseCase/ActivateUserUseCase";
import LogoutUserCase from "../Application/UseCase/LogoutUseCase";


import {JWTS} from "./Service/JWT"

import UserMongooseRepository from "./Repository/UserMongoRepository"
import UserMySQLRepository from "./Repository/UserMysqlRepository"

import RegisterController from './Controller/RegisterUserController'
import LoginController from './Controller/LoginController'
import ActivateController from './Controller/ActivateController'
import LogoutController from './Controller/LogoutController'


import { NodemailerEmailService } from "./Service/Email";

export const nodemailerEmailService = new NodemailerEmailService();
export const JWT = new JWTS();

export const productMongooseRepository = new UserMongooseRepository();
export const MySqlUserRepository = new UserMySQLRepository();
export const currentRepository =  MySqlUserRepository

export const registerCase = new RegisterUserCase(currentRepository);
export const loginUserCase = new LoginUserCase(currentRepository);
export const activateUserCase = new ActivateUserUseCase(currentRepository);
export const logoutUserCase = new LogoutUserCase(currentRepository);


export const registerController = new RegisterController(registerCase, nodemailerEmailService);
export const loginController = new LoginController(loginUserCase,JWT);
export const logoutController = new LogoutController(logoutUserCase,JWT);
export const activateController = new ActivateController(activateUserCase)