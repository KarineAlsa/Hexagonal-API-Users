import { User } from "../Entity/User";

export default interface UserInterface {
    registerUser(user:User):Promise<User|any>;
    searchUserById(token:string):Promise<User|any>;
    updateUserVerified(activateToken:string):Promise<User|any>;
    login(mail:string,password:string):Promise<User|any>;
    logout(token:string):Promise<User|any>;

}