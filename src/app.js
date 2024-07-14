import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import displayroutes from "express-routemap";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./dao/fs/product.manager.js";
import "./database.js";

const app = express(); 

const PUERTO = 8080; 




//middlewares
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.static("./src/public"));

//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");








app.use("/api/products", productsRouter);

app.use("/api/carts", cartRouter);

app.use("/", viewsRouter);




const httpServer =  app.listen(PUERTO, () => {
    displayroutes(app);
    console.log(`Escuchando en el puerto: ${PUERTO}`);

})

const productManager = new ProductManager("./src/dao/db/product-manager-db.js");

const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("Se conecto un cliente");

    socket.emit("productos", await productManager.getProducts());

    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id);
        io.sockets.emit("productos", await productManager.getProducts());
    })

    socket.on("agregarProducto", async (producto) => {
        await productManager.addProduct(producto); 
        
        io.sockets.emit("productos", await productManager.getProducts());
    })
})

