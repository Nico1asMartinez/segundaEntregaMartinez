import { Router } from "express";
import ProductManager from "../controllers/product.manager.js";

const router = Router();

router.get ("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts");

})


const productManager = new ProductManager("./src/data/products.json");

router.get("/", async (req, res) => {
    try {
    const products = await productManager.getProducts();
    res.render("home", { products });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
}
});

export default router