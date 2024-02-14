import  express  from "express";
import { registerController } from "../dependencies";
import { activateController } from "../dependencies";
import { loginController } from "../dependencies";
import {VerifyToken} from "../Controller/middleware/verifyToken";
import {logoutController} from "../dependencies";;
const userRouter = express.Router();


userRouter.post("/register",registerController.run.bind(registerController));
userRouter.put("/:token/activate");
userRouter.get("/activate/:id", activateController.run.bind(activateController))
userRouter.post("/login", loginController.run.bind(loginController));
userRouter.post("/logout", VerifyToken,logoutController.run.bind(loginController));
export default userRouter;