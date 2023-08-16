import dotenv from "dotenv";
import express from "express";
import appBodegas from "./routers/Bodegas.js";
import appProductos from "./routers/productos.js";
import { appToken, appVerify } from "./limit/token.js";

dotenv.config();
let app = express();

app.use(express.json());

let config = JSON.parse(process.env.MY_SERVER);

app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});


app.use("/token", appToken);

app.use("/Bodegas",appVerify,appBodegas);
app.use("/Productos",appVerify,appProductos);