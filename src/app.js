import express from "express";

import displayroutes from "express-routemap";

const app = express(); 

const PUERTO = 8080; 

import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";



app.use(express.json());

app.use(express.urlencoded({extended:true}));






app.use("/api/products", productsRouter);

app.use("/api/carts", cartRouter);




app.listen(PUERTO, () => {
    displayroutes(app);
    console.log(`Escuchando en el puerto: ${PUERTO}`);

})

