import { Request, Response } from "express";
import  LogoutUserCase  from "../../Application/UseCase/LogoutUseCase";
import {AuthServices} from "../../Domain/Ser/AuthServices";
export default class LogoutController {

    constructor(readonly useCase:LogoutUserCase,readonly auth:AuthServices){}

    async run(request:Request,response:Response) {
        
        let token = request.headers.authorization ||""
        console.log(token)
        try {
            token = token.split(' ')[1];
            this.auth.addToBlacklist(token);
            this.useCase.run(token);
            response.status(200).send({
                status: true,
                info: "Correctamente has hecho sign out",
            });
            
            

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    message:"Error to create an order",
                    error:error
                });
        }
    }

}