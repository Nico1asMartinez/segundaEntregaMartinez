import { Router} from "express";

const router = Router();



const products = [
    {
        "title": "Pepe",
        "description": "Argento",
        "code": "nc",
        "price":123,
        "status":"ok",
        "stock":9,
        "category":"persona",
        "id":1
    },


    
];




router.get("/", (req, res) => {

    res.json(products);

})

router.get("/:pid", (req, res) => {

    const { pid } = req.params;

    res.json(products[pid]);

})

router.put("/:pid", (req, res) => {

    const id = parseInt(req.params.pid);
    const { title, description, code, price, status, stock, category } = req.body;

    const productFound = products.find(product => product.id === id);


    if (productFound) {

        const index = products.findIndex(product => product.id === id);


        products[index] = {...products[index], title, description, code, price, status, stock, category};


        res.json({
            message: "Producto actualizado",
            response: products[index]

        });

    

    }

})


router.post("/", (req, res) => {

    const title = req.body.title;
    const description = req.body.description;
    const code = req.body.code;
    const price = req.body.price;
    const status = req.body.status;
    const stock = req.body.stock;
    const category = req.body.category;
    

    if (!title || !description || !code || !price || !status || !stock || !category) {
        res.status(400).json({ error: "Faltan datos" });
        return;
    }

    let id = products[products.length - 1].id + 1;
    products.push({ id, title, description, code, price, status, stock, category });
    res.status(201).json({ id });

})


router.delete("/:pid", (req, res) => {

    const { pid } = req.params;
    const productFound = products.find(product => product.id === parseInt(pid));

    if (!productFound) {
        res.status(404).json({ error: "Producto no encontrado" });
        return;
    }

    const index = products.findIndex(product => product.id === parseInt(pid));
    products.splice(index, 1);
    res.status(200).json({ message: `usuario con id ${pid} eliminado` });
})

export default router;