const socket = io();


socket.on("productos", (data) => {
    renderProductos(data);
});

const renderProductos = (data) => {
    const contenedorProductos = document.querySelector(".contenedorProductos");

    contenedorProductos.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div");
        
        card.innerHTML = `
                    <h5>${item.id}</h5>
                    <h5>${item.title}</h5>
                    <p>${item.price}</p>
                    <p>${item.description}</p>
                    <p>${item.stock}</p>
                    <button >Eliminar</button>
        `;
        contenedorProductos.appendChild(card);


        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item.id);
        });

    });
}

const eliminarProducto = (id) => {
    socket.emit("deleteProduct", id);
}

document.getElementById("submit").addEventListener("click", () => {
    agregarProducto();
});

const agregarProducto = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value,
    };
    

    socket.emit("agregarProducto", producto);
}













