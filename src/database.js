import mongoose from "mongoose";


    mongoose.connect("mongodb+srv://martineznico991:contraseña123@cluster0.c2qodg2.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")

    .then(() => {
        console.log("conectado a la base de datos");
    })
    .catch((err) => {
        console.log("no se pudo conectar a la base de datos" + err);
    })
