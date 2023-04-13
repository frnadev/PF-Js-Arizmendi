let productosEnElCarrito = (localStorage.getItem("productos-en-el-carrito"));
productosEnElCarrito = JSON.parse(productosEnElCarrito);

const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const carritoTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosDelCarrito() {
    if (productosEnElCarrito && productosEnElCarrito.length > 0) {

        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        carritoComprado.classList.add("disabled");
    
        carritoProductos.innerHTML = "";
    
        productosEnElCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-producto-img" src="${producto.imagen}" alt="${producto.titulo}">
                            <div class="carrito-producto-title">
                                <small>Nombre</small>
                                <h3>${producto.titulo}</h3>
                            </div>
                            <div class="carrito-producto-cantidad">
                                <small>Cantidad</small>
                                <p>${producto.cantidad}</p>
                            </div>
                            <div class="carrito-producto-precio">
                                <small>Precio</small>
                                <p>${producto.precio}</p>
                            </div>
                            <div class="carrito-producto-subtotal">
                                <small>Subtotal</small>
                                <p>${producto.precio * producto.cantidad}</p>
                            </div>
                            <button class="carrito-producto-eliminar" id= "${producto.id}">Borrar</button>
            `;
    
            carritoProductos.append(div);
        });
        
    
    } else {
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    }

    botonesEliminar();
    sumarTotal();
};

cargarProductosDelCarrito();



function botonesEliminar() {
    botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", borrarDelCarrito);
    });
};

function borrarDelCarrito(e) {

    Toastify({
        text: "Has eliminado un producto de tu carrito.",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #54b3d6, #a5e3fa)",
          borderRadius: "2rem",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;

    const index = productosEnElCarrito.findIndex(producto => producto.id === idBoton);
    productosEnElCarrito.splice(index, 1);
    cargarProductosDelCarrito();

    localStorage.setItem("productos-en-el-carrito", JSON.stringify(productosEnElCarrito));
};

botonVaciar.addEventListener("click", borrarCarrito);

function borrarCarrito() {

    Swal.fire({
        icon: 'error',
        title: 'Hecho.',
        text: 'Se borraron todos tus productos.'
      })

    productosEnElCarrito.length = 0;
    localStorage.setItem("productos-en-el-carrito", JSON.stringify(productosEnElCarrito));
    cargarProductosDelCarrito();
};

function sumarTotal() {
    const sumadoTotal = productosEnElCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${sumadoTotal}`;
};

botonComprar.addEventListener("click", comprarCarrito);


function comprarCarrito() {

    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Se han comprado tus productos!',
        showConfirmButton: false,
        timer: 2000
      })

    productosEnElCarrito.length = 0;
    localStorage.setItem("productos-en-el-carrito", JSON.stringify(productosEnElCarrito));
    
    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    carritoComprado.classList.remove("disabled");
};