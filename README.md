# Mongo Bodegas

Este archivo funciona para generar peticiones(post,get...) controladas usando middleware de tipos de datos, cantidad de datos, limite de peticiones por token.

¿Cómo usarlo?:

1-clonar el repositorio

2- instalar node, instalar las dependencias con el comando (npm install)

3- verificar la transcripción de archivos TypeScript con el comando (npm run tsc)

4-verificar las variables de entorno en el archivo . env (conexion del servidor y de la base de datos en Atlas)

5- conectar la base de datos con la extension de visual estudio ( **MongoDB for VS Code** ) la de la hojita verde.

-ingresamos a la extensión oprimimos conectar nos pedirá el link de conexion de la base de datos la cuál encontraremos en la pagina Atlas(ingresamos con el correo, en la parte izquierda la opcion Database, luego en la opción connect, MongoDB for VS code, opción 3)

-Obtenemos un link de esta manera:

| mongodb+srv://nombreusuario:`<password>`@cluster0.vzylork.mongodb.net/ |
| ------------------------------------------------------------------------ |

en el cuál cambiaremos el usuario,la  `<password>`  y  damos enter

en la parte derecha de la extensión nos saldrá una hoja de color verde que nos indica conexión exitosa.

-seguido de ello corremos el archivo db/basedatosBodegas.mongodb en la parte superior derecha encontramos un comando de un trinagulo que nos indica la opción Mongo Run.

6-corremos el archivo app.js con el comando en la terminal (npm run dev) nos saldrrá el puerto de conexión del servidor.

7- ahora realizamos pruebas con la extensión thunderClient de visual studio:

-primero pedimos el token con la solicitud Get y la url= [http://127.10.10.10:5011/token/&#34;nombreDeLaColeccion](http://127.10.10.10:5011/token/%22nombreDeLaColeccion)",

recuerde que la dirección y el puerto varia según su configuración 127.10.10.10:5011

Este Token tiene una duración de 30 minutos el cuál se puede modificar en el archivo  limit/token.js  .setExpirationTime("30m")

nos saldrá el token de esta manera: {
"status": 201,
"message":
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZWR1bGFfdXN1YXJpbyI6MCwibm9tYnJlX3VzdWFyaW8iOiJGYWtlciIsImVkYWRfdXN1YXJpbyI6MCwiaWF0IjoxNjkxNjgzMTA5LCJleHAiOjE2OTE2ODQ5MDl9.2jaovzoWoILUrarWbwQ-Edijn7c5edTDuC29pjBLVOU"
}

-copiamos y pegamos el toquen

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZWR1bGFfdXN1YXJpbyI6MCwibm9tYnJlX3VzdWFyaW8iOiJGYWtlciIsImVkYWRfdXN1YXJpbyI6MCwiaWF0IjoxNjkxNjgzMTA5LCJleHAiOjE2OTE2ODQ5MDl9.2jaovzoWoILUrarWbwQ-Edijn7c5edTDuC29pjBLVOU

en la parte de "Headers" de la extension de visual, en el header escribimos "Authorization" y en value pegamos el token y cambiamos la url por:

[http://127.10.10.10:5011/](http://127.10.10.10:5011/Alquiler/todos)bodegas

nos saldrá la collección de bodegas ordenadas alfabeticamente de la base de datos en la parte derecha, y en la terminal nos saldrá:

{
limit: 5,                    //cantidad limite de solicitudes en 30 segundos
current: 1,              //cantidad de solicitudes hechas
remaining: 4,         //cantidad de solicitudes restantes
resetTime: 2023-08-10T16:02:18.573Z
}

esta candidad la podemos variar en el archivo limit/config.js en el parametro "windowMs:"

Ejemplos de endpoint:

(recuerde que para cada tabla debemos generar token)

Listar bodegas ordenadas alfabéticamente = http://127.10.10.10:5011/bodegas  (metodo get)

Crear una nueva bodega=http://127.10.10.10:5011/bodegas (metodo post)

ejemplo poner en el body:
    "id": 12,
    "nombre": "Almacén Central",
    "id_responsable": 18,
    "estado": 1,
    "created_by": 18,
    "created_at": "2022-06-02T00:00:00.000Z"

Listar productos en orden descendente por el campo "Total" = http://127.10.10.10:5011/productos (metodo get)

Insertar un nuevo producto con una cantidad inicial en la tabla inventarios=http://127.10.10.10:5011/productos (metodo post)

Insertar registros en la tabla de inventarios=http://127.10.10.10:5011/inventarios(metodo post)
