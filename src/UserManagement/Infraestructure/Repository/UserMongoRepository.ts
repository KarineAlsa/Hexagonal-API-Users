
import { User } from "../../Domain/Entity/User";
import  UserInterface  from "../../Domain/Port/UserInterface";
import { connectToDatabase } from '../../../Database/mongo';
import { collections } from "../../../Database/mongo";
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt'

  export default class UserMongooseRepository implements UserInterface {
    searchUserById(token: string): Promise<any> {
        throw new Error("Method not implemented.");
    }

    async registerUser(user:User): Promise<User|any> {
        try {
            const collectionName = "users"
            await connectToDatabase(collectionName);
            user.credentials.password = bcrypt.hashSync(user.credentials.password, 10);

            const result = await collections.name?.insertOne(user);

            if (result && result.insertedId) {
                return user;
            } else {
                throw new Error("Error al insertar el usuario en la base de datos");
            }
        }catch (error) {
            throw new Error(`Error en la operación de guardado`);
        }
    }

    async updateUserVerified(activateToken:string): Promise<User | any> {
      try {
        
        const collectionName = "users"
        await connectToDatabase(collectionName);
        const pudate = {
            "status.state":true,
            "status.verifiedAt":new Date()
        }
        const query = { "status.token": activateToken };
        
        const user = await collections.name?.updateOne(query, { $set: pudate });
        console.log(user)
        if (user) {
            return "Usuario activado"
        }
    } catch (error) {
        return "No se encontró con el id"
    }
      return 'no se encontró'
    }

    async logout(activateToken:string): Promise<User | any> {
        return "logout exitoso"
      }


/*
    async findById(id: string|number): Promise<User | string> {
        try {
          const collectionName = "users"
          await connectToDatabase(collectionName);
          const query = { _id: new ObjectId(id) };
          const product= (await collections.name?.findOne(query)) as User|null;
  
          if (product) {
              return product
          }
      } catch (error) {
          return "No se encontró con el id"
      }
        return 'no se encontró'
      }*/
    async login(mail:string,password:string): Promise<User|any> {
        
        try {
          const collectionName = "users"
          await connectToDatabase(collectionName);
          
          const query = { "credentials.email":mail };
          const product= (await collections.name?.findOne(query)) as User|null;
          if (product){
            if(bcrypt.compareSync(password, product.credentials.password) && product.status.state == true){
              return product;
            }
            else{
              return "Datos incorrectos"
            }
          }
          
  
          else{
            return 'No existe el usuario'
          }
      } catch (error) {
        
          return 'ocurrió un error'
      }

    }
    
  
}
