let productos = [];

fetch("../js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categorias");
const mainTitle = document.querySelector("#main-title");
let botonesAgregar = document.querySelectorAll(".producto-add");
const numero = document.querySelector("#numero");


function cargarProductos(productosElegidos) {


    contenedorProductos.innerHTML = "";


    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-im" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-details">
            <h3 class="producto-title">${producto.titulo}</h3>
            <p class="producto-price">$${producto.precio}</p>
            <button class="producto-add" onclick="agregarAlCarrito(${producto.id})" id="${producto.id}">Llevar</button>
        </div>
    `;


      contenedorProductos.append(div);  
    });
};





botonesCategorias.forEach(boton => {
    boton.addEventListener("click" , (e) => {


        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");


        if (e.currentTarget.id != "todos") {
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            cargarProductos(productos);
        }
    })
});

function agregarBotones() {
    botonesAgregar = document.querySelectorAll(".producto-add");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
};

let productosEnElCarrito = []
let productosEnElCarritoLocal = localStorage.getItem("productos-en-el-carrito");



if (productosEnElCarritoLocal) {
    productosEnElCarrito = JSON.parse(productosEnElCarritoLocal);
    sumarNumero();
} else {
    productosEnElCarrito = [];
};

function agregarAlCarrito(e) {

    Toastify({
        text: "Has agregado un producto al carrito.",
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

    const idBoton = Number(e)
    console.log(idBoton)
    let a = productos.find(p => p.id === idBoton);
    productosEnElCarrito.push(a)
    sumarNumero();

    localStorage.setItem("productos-en-el-carrito", JSON.stringify(productosEnElCarrito));
};


function sumarNumero() {
    let nuevoNumero = productosEnElCarrito.length
    numero.innerHTML = nuevoNumero;
};

