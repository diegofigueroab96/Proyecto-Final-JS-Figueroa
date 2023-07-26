let productosEnCarrito = JSON.parse(localStorage.getItem("ProductosEnCarrito"))





if (productosEnCarrito == null || productosEnCarrito.length == 0)
    Swal.fire('El carrito esta vacio').then(() => window.location.href = "../index.html")

let carritoConteiner = document.getElementById("contenedor-carrito")

productosEnCarrito.forEach(producto => {
    let div = document.createElement("div")
    div.textContent = `${producto.nombre} ${producto.cantidad}`
    carritoConteiner.appendChild(div)

});

console.log(productosEnCarrito)
carritoConteiner.innerHTML = ""
productosEnCarrito.forEach(producto => {

    let div = document.createElement("div")
    div.classList.add("card-carrito")
    div.innerHTML = `
            <img src=".${producto.imagen}" alt="imagen producto">
            <h2>${producto.nombre}</h2>
            <h2>${producto.cantidad}</h2>
            <h2>${producto.precio}$</h2>
            `
    carritoConteiner.appendChild(div)
})

/* <div id="contenedor-carrito" class="contenedor-carrito">
<div class="card-carrito" id="card-carrito">
<img src="../imagenes/bqto city 2.jpg" alt="imagen producto">
<h2>Producto</h2>
<h2>Cantidad</h2>
<h2>500$</h2>
</div> */