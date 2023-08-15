import dotenv from "dotenv";
import express from "express";
import appBodegas from "./routers/Bodegas.js";

dotenv.config();
let app = express();

app.use(express.json());

let config = JSON.parse(process.env.MY_SERVER);

app.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});

app.use("/Bodegas",appBodegas);