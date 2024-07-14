import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true

            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});

const cartModel = mongoose.model("carts", cartSchema);

export default cartModel