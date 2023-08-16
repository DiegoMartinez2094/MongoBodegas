import { con } from "../db/atlas.js";
import {Router} from "express";
import { limitGrt } from "../limit/config.js";
import {appMiddlewareCampusVerify, appDTOData} from "../middleware/Bodegas.js";
import { ObjectId } from "mongodb";

const appBodegas =Router();

let db = await con();
let Bodegas = db.collection('bodegas');

appBodegas.get("/", limitGrt(),appMiddlewareCampusVerify, async(req, res) => { 
    let db = await con();
    let Bodegas = db.collection('bodegas');
    let result = await Bodegas.find().sort({ nombre: 1 }).toArray();
    res.send(result); });

     
export default appBodegas; 