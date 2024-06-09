import express from "express";

import displayroutes from "express-routemap";

const app = express(); 

const PUERTO = 8080; 

import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

//Recuerden que como necesito recibir datos en JSON puedo usar esta linea de codigo: 

app.use(express.json());

app.use(express.urlencoded({extended:true}));

//Se encarga de analizar los datos en la URL y los convierte en un objeto de JS accesible a traves de req.body. 





app.use("/api/products", productsRouter);

app.use("/api/carts", cartRouter);



//Dejamos escuchando el servidor: 

app.listen(PUERTO, () => {
    displayroutes(app);
    console.log(`Escuchando en el puerto: ${PUERTO}`);

})

//Carpeta publica:

//app.use(express.static("./src/public"));