import { Request, Response } from "express";
import  ActivateUserCase  from "../../Application/UseCase/ActivateUserUseCase";

export default class ActivateController {

    constructor(readonly useCase:ActivateUserCase){}

    async run(request:Request,response:Response) {

        const id = request.params.id
        try {
            
            let orderItem = await this.useCase.run(id);

            return response.status(200).json(orderItem);

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    message:"Error to get an order",
                    error:error
                });
        }
    }

}