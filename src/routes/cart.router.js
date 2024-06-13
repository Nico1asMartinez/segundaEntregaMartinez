import express from "express";
import CartManager from "../controllers/cart.manager.js";

const router = express.Router();
const cartManager = new CartManager("../data/carts.json");


router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.crearCarrito();
        res.json(newCart);
    } catch (error) {
        console.error("Error al crear un nuevo carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


router.get("/:cid", async (req, res) => {
    const cid = parseInt(req.params.cid);

    try {
        const cart = await cartManager.getCarritoById(cid);
        res.json(cart.products);
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


router.post("/:cid/product/:pid", async (req, res) => {
    const cid = parseInt(req.params.cid);
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const updateCart = await cartManager.agregarProductoAlCarrito(cid, productId, quantity);
        res.json(updateCart.products);
    } catch (error) {
        console.error("Error al agregar producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;