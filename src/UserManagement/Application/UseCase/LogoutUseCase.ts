import {User} from "../../Domain/Entity/User";
import userRepository from "../../Domain/Port/UserInterface";

export default class LogoutCase {
    constructor(readonly productRepository: userRepository) {}

    async run(token:string|""): Promise<User | any> {
        try {
        return await this.productRepository.logout(token);
        
        } catch {
        return 'ocurrió un error';
        }
    }
}