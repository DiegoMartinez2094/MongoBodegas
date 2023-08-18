import { con } from "../db/atlas.js";
import {Router} from "express";
import { limitGrt } from "../limit/config.js";
import {appMiddlewareCampusVerify, appDTOData} from "../middleware/Productos.js";
import { ObjectId } from "mongodb";
import { productos } from "./storage/productos.js";

const appProductos =Router();

let db = await con();
let Productos = db.collection('bodegas');

appProductos.get("/", limitGrt(),appMiddlewareCampusVerify, async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    let result = await Productos.aggregate([
        {
            $lookup: {
                from: 'inventarios',
                localField: 'id',
                foreignField: 'id_producto',
                as: 'inventarios',
            }
        },
        {
            $unwind: { path: '$inventarios', preserveNullAndEmptyArrays: true }
        },
        {
            $group: {
                _id: '$_id',
                id: { $first: '$id' },
                nombre: { $first: '$nombre' },
                estado: { $first: '$estado' },
                created_by: { $first: '$created_by' },
                total: { $sum: '$inventarios.cantidad' }
            }
        },
        {
            $sort: { total: -1 }
        },
        {
            $project: {
                _id: 0,
                id: 1,
                nombre: 1,
                estado: 1,
                created_by: 1,
                total: 1,
            }
        }
    ]).toArray();
    res.send(result);   
});

appProductos.post("/", limitGrt(), async (req,res)=>{
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    let data = req.body;
    let idR = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
    let inventarios = db.collection("inventarios");
    try {
        let insert = await Productos.insertOne(data);
        let inserIn = await inventarios.insertOne({
            id:idR,
            id_bodega:1,        
            id_producto:data.id,
            cantidad:1,
            created_by:166
        })
        if (insert.insertedId === undefined || inserIn.insertedId === undefined) {
            res.send({status:400, message: "Error al insertar la data"});
        }else{
            res.send({status:200, message: "La data se inserto correctamente"});
        }
        console.log(insert.insertedId === inserIn.insertedId);
    } catch (error) {
        res.status(400).send({error: error});
    }
});

export default appProductos; 