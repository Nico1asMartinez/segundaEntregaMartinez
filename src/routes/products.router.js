import { Router} from "express";

const router = Router();

import ProductManager from "../controllers/product.manager.js";
const productManager = new ProductManager("./src/data/products.json");




router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();
        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    }  catch (error) {
        console.log("Error al obtener los productos", error);
        res.status(500).json({ error: "Error al obtener los productos" });
}
});

router.get("/:pid", async (req, res) => {

    const pid = req.params.pid;

    try {
        const product = await productManager.getProductById(parseInt(pid));
        if (!product) {
            return res.json({
                error: "Producto no encontrado"
            });
        }

        res.json(product);
    } catch (error) {
        console.error("Error al obtener producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});


router.post("/", async (req, res) => {
    const newProduct = req.body;

    try {
        await productManager.addProduct(newProduct);
        res.status(201).json({
            message: "Producto agregado exitosamente"
        });
    } catch (error) {
        console.error("Error al agregar producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});


router.put("/:pid", async (req, res) => {
    const pid = req.params.pid;
    const updateProduct= req.body;

    try {
        await productManager.updateProduct(parseInt(pid), updateProduct);
        res.json({
            message: "Producto actualizado exitosamente"
        });
    } catch (error) {
        console.error("Error al actualizar producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});


router.delete("/:pid", async (req, res) => {
    const pid = req.params.pid;

    try {
        await productManager.deleteProduct(parseInt(pid));
        res.json({
            message: "Producto eliminado exitosamente"
        });
    } catch (error) {
        console.error("Error al eliminar producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

export default router;