import cartModel from '../models/cart.model.js';



class CartManager {
    

    

    async crearCarrito() {
        try {
            const nuevoCarrito = new cartModel({products: []});
            await nuevoCarrito.save();
            return nuevoCarrito;


        } catch (error) {
            console.log("Error al crear el carrito", error);
            throw error;
        }
    }

    async getCarritoById(cartId) {
        try {
            const carrito = await cartModel.findById(cartId);

            if (!carrito) {
                throw new Error(`No existe un carrito con el id ${cartId}`);
            }
            return carrito;

        } catch (error) {
            console.error("Error al obtener el carrito por ID", error);
            throw error;
        }
    }

    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(cartId);
            const existeProducto = carrito.products.find(p => p.product.toString() === productId);

            if (existeProducto) {
                existeProducto.quantity += quantity;
            } else {
                carrito.products.push({ product: productId, quantity: quantity });
            }

            carrito.markModified("products");
            await carrito.save();
            return carrito;

        } catch (error) {
            console.log("Error al agregar el producto al carrito", error);
            throw error;
        }
    }
}

export default CartManager;