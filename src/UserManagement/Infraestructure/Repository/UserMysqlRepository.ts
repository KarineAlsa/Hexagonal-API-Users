import { User } from "../../Domain/Entity/User";
import UserInterface  from "../../Domain/Port/UserInterface";
import bcrypt from 'bcrypt'
import query from "../../../Database/mysql";

export default class UserMysqlRepository implements UserInterface {
    async registerUser(user: User): Promise<any> {
        const sql = "INSERT INTO users (name, lastName,cellphone,email,password,activationtoken, verifiedAt,activate) VALUES (?, ?,?,?,?,?,?,?)";
        const hash = bcrypt.hashSync(user.credentials.password, 10);
        const params: any[] = [user.contact.name, user.contact.lastName, user.contact.cellphone,user.credentials.email,hash, user.status.token,null,false];
    try {
      const [result]: any = await query(sql, params);
      console.log(result);

      if (result) {
        result.id = result.insertId
        return user

      } else {
        throw new Error("Error al insertar el usuario en la base de datos");
      }
    } catch (error) {
      throw new Error(`Error en la operación de guardado`);
    }
    }
    async searchUserById(token: string): Promise<any> {
        throw new Error("Method not implemented.");
    }


    async updateUserVerified(activateToken: string): Promise<any> {
        const sql = "UPDATE users SET activate = true, verifiedAt = ? WHERE activationtoken = ?";
        const params: any[] = [new Date(),activateToken];
    try {
        const [result]: any = await query(sql, params);
        console.log(result);

      if (result) {
        return "usuario verificado";
      }
    } catch (error) {
      return "No se encontró con el id";
    }
    return "no se encontró";
    }
    async login(mail: string, password: string): Promise<any> {
        const sql = "SELECT * FROM users WHERE email = ?";
        const params: any[] = [mail];
        try {
            const [[result]]: any = await query(sql, params);
            console.log(result.password)
        if (result){
            if(bcrypt.compareSync(password, result.password) && result.activate == true){
            return "Login exitoso";
            }
            else{
            if (result.activate != true){
                return "Usuario no verificado"
            }
            else{
                return "Datos incorrectos"
            }
            
            }
        }
        else {
            return "No existe el usuario";
        }
        } catch (error) {
        return "ocurrió un error";
        }
    }
    async logout(token: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    
}