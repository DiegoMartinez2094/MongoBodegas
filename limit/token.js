import 'reflect-metadata';
import {plainToClass, classToPlain } from 'class-transformer';
import dotenv from 'dotenv';
import {Router} from 'express';
import { SignJWT, jwtVerify } from 'jose';
import {bodega} from "../routers/storage/Bodegas.js";
import {productos} from "../routers/storage/productos.js";
import {inventarios} from "../routers/storage/Inventarios.js";

dotenv.config("../");
const appToken = Router();
const appVerify = Router();

const createInstance = (className) => {
    const classMap = {
      'bodegas': bodega, //entre comillas es el nombre de la coleccion que vamos a implementar el token
      'productos': productos,
      'inventarios': inventarios
    };
    const Class = classMap[className];
    return (Class) ? plainToClass(Class, {}, { ignoreDecorators: true }) : undefined;
  };

appToken.use("/:collection", async(req,res)=>{ //define ruta que acepta un parametro dinamico collecion (cambia)
    try {
        // let inst =  plainToClass(eval(req.params.collecion), {}, { ignoreDecorators: true }) //Crea una instancia de la clase asociada a la colección especificada en el parámetro 
        const collectionName = req.params.collection;
        const inst = createInstance(collectionName);
        if (!inst)
        return res.status(404).send({ status: 404, message: "colección no encontrada" })

        const encoder = new TextEncoder();                                                   //crea una nueva instancia del objeto TextEncoder
        const jwtconstructor = new SignJWT(Object.assign({}, classToPlain(inst)));
        const jwt = await jwtconstructor
        .setProtectedHeader({alg:"HS256", typ: "JWT"})
        .setIssuedAt()
        .setExpirationTime("30m")
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.data = jwt;
        res.status(201).send({status: 201, message: jwt});
    } catch (error) {
        res.status(404).send({status: 404, message: "Token solicitado no valido"});
    }
})

appVerify.use("/", async(req,res,next)=>{
    const {authorization} = req.headers;
    if (!authorization) return res.status(400).send({status: 400, token: "Token no enviado"});
    try {
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        req.data = jwtData;
        next();
    } catch (error) {
        res.status(498).send({status: 498, token: "Token caducado"});
    }
})

export {
    appToken,
    appVerify
};