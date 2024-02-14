import { Request, Response } from "express";
import  LoginUserCase  from "../../Application/UseCase/LoginUserCase";
import {AuthServices} from "../../Domain/Ser/AuthServices";
export default class LoginController {

    constructor(readonly useCase:LoginUserCase,readonly auth:AuthServices){}

    async run(request:Request,response:Response) {
        const mail = request.body.mail
        const password = request.body.password
        try {
            
            let orderItem = await this.useCase.run(mail,password);
            if (orderItem == "Datos incorrectos" || orderItem == "No existe el usuario" || orderItem == "ocurrió un error" || orderItem == "Usuario no verificado"){
                return response.status(200).json({"login":false, "info":orderItem});
            }
            else{
                console.log(orderItem)
                const token = this.auth.generateToken(orderItem.name + " " + orderItem.lastName || "");
                return response.status(200).json({"login: ":true,"token: " :token});
            }
            
           

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    message:"Error to create an order",
                    error:error
                });
        }
    }

}