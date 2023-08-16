import { con } from "../db/atlas.js";
import {Router} from "express";
import { limitGrt } from "../limit/config.js";
import {appMiddlewareCampusVerify, appDTOData} from "../middleware/Bodegas.js";
import { ObjectId } from "mongodb";
import { bodega } from "./storage/Bodegas.js";

const appBodegas =Router();

let db = await con();
let Bodegas = db.collection('bodegas');

appBodegas.get("/", limitGrt(),appMiddlewareCampusVerify, async(req, res) => { 
    let db = await con();
    let Bodegas = db.collection('bodegas');
    let result = await Bodegas.find().sort({ nombre: 1 }).toArray();
    res.send(result); });

    appBodegas.post("/", limitGrt(), appMiddlewareCampusVerify, appDTOData, async(req, res) => {
        // Datos de entrada : {
        //     "id":,
        //     "nombre":,
        //     "id_responsable":,
        //     "estado":,
        //     "created_by":,
        //     "created_at":
        //   }
    let resul;
    try { 
        resul = await Bodegas.insertOne(req.body);
        res.status(201).send(resul);
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        res.send();
    }
});     
export default appBodegas; 