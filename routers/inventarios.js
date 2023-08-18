import { con } from "../db/atlas.js";
import {Router} from "express";
import { limitGrt } from "../limit/config.js";
import {appMiddlewareCampusVerify, appDTOData} from "../middleware/Inventarios.js";
import { ObjectId } from "mongodb";
import { inventarios } from "./storage/Inventarios.js";

const appInventarios =Router();

let db = await con();

appInventarios.post("/", limitGrt(),appMiddlewareCampusVerify,appDTOData, async (req, res) => {
    let data = req.body;
    let idR = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
    try {
        const exis = await Inventarios.findOne({
            id_producto: data.id_producto,
            id_bodega: data.id_bodega
        });
        if(exis){
            let Update = await Inventarios.updateOne(
                {
                    id_producto: { $eq: data.id_producto },
                    id_bodega: { $eq: data.id_bodega }
                },  
                {
                    $set: { cantidad: data.cantidad }
                }
            )
            res.status(200).send({msg: "Se han enviado correctamente los datos" , data: Update })}
        else {
            let insert = await Inventarios.insertOne(
                {
                    id: idR,
                    id_bodega: data.id_bodega,
                    id_producto: data.id_producto,
                    cantidad: data.cantidad,
                    created_by: 166
                }
            )
            res.status(200).send({msg: "Se ha ingresado correctamente la data" , data: insert })
        }
    } catch (error) {
        res.status(400).send({ error: error });
    }

});


export default appInventarios; 