import { Contact } from "../../Domain/Entity/Contact";
import { Credential } from "../../Domain/Entity/Credential";
import { Status } from "../../Domain/Entity/Status";
import { User } from "../../Domain/Entity/User";
import  UserInterface  from "../../Domain/Port/UserInterface";
import * as crypto from 'crypto';

function generarToken(longitud: number): string {
    const buffer = crypto.randomBytes(Math.ceil(longitud / 2));
    return buffer.toString('hex').slice(0, longitud);
}

export default class RegisterUserUseCase {

    constructor(readonly repository:UserInterface) {}

    async run( { name, lastName, cellphone, email, password }: {
        name: string;
        lastName: string;
        cellphone: string;
        email: string;
        password: string;
      } ):Promise<User|any> {
        try {
            let contact = new Contact(name,lastName,cellphone);
            let credentials = new Credential(email,password);
            let status = new Status(generarToken(16),null,false);

            let user = new User(
                contact,
                credentials,
                status
            );

            return await this.repository.registerUser(user);

        }catch(error) {

        }
    }

}