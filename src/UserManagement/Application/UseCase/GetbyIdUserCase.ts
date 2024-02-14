import {User} from "../../Domain/Entity/User";
import userRepository from "../../Domain/Port/UserInterface";

export default class GetOneCase {
    constructor(readonly productRepository: userRepository) {}

    async run(id: string): Promise<User | string> {
        try {
        const result = await this.productRepository.searchUserById(id);
        return result;
        } catch {
        return 'ocurrió un error';
        }
    }
}