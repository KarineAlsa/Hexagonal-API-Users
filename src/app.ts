//TODO: SERVIDOR
//TODO: RUTAS
//TODO: INICIALIZAR SERVIDOR
import express from "express";
import userRouter from "./UserManagement/Infraestructure/Route/UserRoute";

const server = express();
const server_port =process.env.PORT;

server.use(express.json());
server.use("/user", userRouter);


server.listen(process.env.PORT, () => {
console.log(`Server listening on http://localhost:${server_port}/`);
});