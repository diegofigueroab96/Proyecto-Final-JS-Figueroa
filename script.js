const apiURL = "https://diego-api-mauve.vercel.app/api"

let filter = "todos"
let productos = []

let contenedorProductos = document.querySelector("#contenedor-productos")
let categoriaProductos = document.querySelectorAll(".botonesCategoria")

function cargando(estaCargando) {
    const cargando = document.getElementById("cargando")
    cargando.style.display = estaCargando ? "block" : "none"
}


function errorCargando() {
    Swal.fire('Ups', 'No pudimos cargar la información', 'error')
}


function obtenerProductosDelServidor() {
    cargando(true)


    return fetch(apiURL).then(data => data.json()).then(r => { productos = r.products })
        .catch(() => errorCargando())
        .finally(() => cargando(false))
}
function displayProducts() {

    contenedorProductos.innerHTML = "";
    productos
        .filter(producto => filter == "todos" || producto.categoria == filter)
        .forEach(producto => {
            let botonCompra = document.createElement("button")
            botonCompra.textContent = "AGREGAR AL CARRO"
            botonCompra.classList.add("boton")
            botonCompra.addEventListener("click", () => {


                let productosEnCarrito = JSON.parse(localStorage.getItem("ProductosEnCarrito"))


                if (productosEnCarrito == null) {
                    productosEnCarrito = []
                }
                let mismoProducto = productosEnCarrito.find(p => p.id == producto.id)


                if (mismoProducto == null) {
                    producto.cantidad = 1
                    productosEnCarrito.push(producto)
                    localStorage.setItem("ProductosEnCarrito", JSON.stringify(productosEnCarrito))
                }

                else {

                    const carritoActualizado = productosEnCarrito.map(pc => {
                        if (pc.id == producto.id) {
                            pc.cantidad++;
                        }
                        return pc
                    })


                    localStorage.setItem("ProductosEnCarrito", JSON.stringify(carritoActualizado))

                }






            })

            let div = document.createElement("div")
            div.classList.add("producto")
            div.innerHTML = `
            <img src="${producto.imagen}" class="imagen" alt="imagen producto">
            <h2>${producto.nombre}</h2>
            <h3>${producto.precio}$</h3>
            `
            div.appendChild(botonCompra)
            contenedorProductos.appendChild(div);
        })

}



obtenerProductosDelServidor().then(() => displayProducts())


categoriaProductos.forEach(boton => {
    boton.addEventListener("click", (e) => {

        filter = e.currentTarget.id
        displayProducts()
    })

})

let carrito = []

let botonAgregar = document.getElementsByClassName("boton")
botonAgregar












