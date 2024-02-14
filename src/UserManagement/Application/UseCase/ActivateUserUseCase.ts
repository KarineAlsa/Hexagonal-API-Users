import {User} from "../../Domain/Entity/User";
import userRepository from "../../Domain/Port/UserInterface";

export default class ActivateUserUseCase {
    constructor(readonly productRepository: userRepository) {}

    async run(activateToken: string): Promise<User | string> {
        try {
        const result = await this.productRepository.updateUserVerified(activateToken);
        return result;
        } catch {
        return 'ocurrió un error';
        }
    }
}