import { Router } from "express";

const router = Router();

const users = [];

router.post("/", (req, res) => {

    const newCart = {
        products: [],
        id: users.length + 1
    }
    users.push(newCart);

    res.status(201).json(newCart);
})


router.get("/:cid", (req, res) => {

    const { cid } = req.params;
    const userFound = users.find(user => user.id === parseInt(cid));

    if (!userFound) {
        res.status(404).json({ error: "Carrito no encontrado" });
        return;
    }
    res.json(userFound);
})

router.post("/:cid/product/:pid", (req, res) => {

    const { cid, pid } = req.params;

    const userFound = users.find(user => user.id === parseInt(cid));
    const productFound = userFound.products.find(product => product.id === parseInt(pid));

    if (!userFound) {
        res.status(404).json({ error: "Carrito no encontrado" });
        return;
    }
    if (!productFound) {
        res.status(404).json({ error: "Producto no encontrado" });
        return;
    }
    userFound.products.push(productFound);
    res.status(201).json({ message: "Producto agregado al carrito" });
})




export default router