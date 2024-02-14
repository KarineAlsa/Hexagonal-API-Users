import { Request, Response } from "express";
import  RegisterUseCase  from "../../Application/UseCase/RegisterUserUseCase";
import {NodemailerEmailService} from "../Service/Email"

export default class RegisterController {

    constructor(readonly useCase:RegisterUseCase, readonly emailService: NodemailerEmailService){}

    async run(request:Request,response:Response) {

        const mail = request.body.mail
        const name = request.body.name
        const lastName = request.body.lastName
        const phone = request.body.phone
        const password = request.body.password
        if (mail != "" || name != "" || password != "" ){

        try {
            
            let user = await this.useCase.run({
                name: name,
                lastName: lastName,
                cellphone: phone,
                email: mail,
                password: password
            });
            if (user) {
                console.log(user)
                const verificationUrl = `http://${process.env.HOST_SERVER}:${process.env.PORT}/user/activate/${user.status.token}`;
                
                await this.emailService.sendEmail(mail, "Verificar", `Para hacer la verificación: ${verificationUrl}`);
                return response.status(200).json({info:"Usuario creado", status:true});
            } else {
                response.status(500).send({
                    status: "internal server error",
                    data: "No se pudo crear el usuario",
                });
            }
        } catch (error) {
            console.log(error)
            response.status(204).send({
                status: "error",
                data: "Ha ocurrido un error durante su petición.",
                msg: error,
            });
        }
            

        }else{
            response.status(204).send({
                status: false,
                info: "Debe completar todos los datos"
            });
        }
    }
    }

