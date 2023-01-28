const color = document.querySelector("#color");
const fondo = document.querySelector("#tituloMarca");
const fila_producto = document.querySelector(".fila-producto");

color.addEventListener("click", () => {
  fondo.style.color = "#C24877";
  // cambiar();
});
fila_producto.addEventListener("click", () => {
  // fila_producto.style.color = "#C24877";
  // cambiar();
});

console.log(fila_producto);




// fetch('/deposito.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   } )

// function cambiar() {
//  if(fondo.style.color == (fondo.style.color = "#C24877")) {
//     fondo.style.color = "#2CBFB9";
//  } else {
//     fondo.style.color = "#C24877";
//  }
// }

// for() {

// }

//Filtrador de busqueda
const input = document.querySelector('#searchInput')
const productList = document.querySelector('#productos')


let productos = []

window.addEventListener('DOMContentLoaded', async () => {
  productList.innerHTML = "<h1>Loading</h1>"
  const data = await loadProductos()
  productos = data.nombre
  renderProductos(productos)
})

input.addEventListener('keyup', e => {
  const newProducto = productos.filter(producto => `${producto.nombre.toLowerCase()} ${producto.detalle.toLowerCase()}`.includes(input.value.toLowerCase()))
   renderProductos(newProducto)
})


async function loadProductos() {
const response =   await  fetch('./deposito.json')
return await response.json()   
}


const createUserItems = productos => productos.map(producto =>
    `<li class="bg-zinc-800 hover:bg-zinc-700 hover:cursor-pointer ">${producto.nombre} ${producto.detalle}</li>`).join(' ')


function renderProductos(productos) {
const itemsString =   createUserItems(productos)
   productList.innerHTML = itemsString
}

const d = document;

function searchFilters(input, selector) {
    d.addEventListener("keyup", (e) => {
        if (e.target.matches(input)) {

            if(e.key === "Escape")e.target.value = " ";
            d.querySelectorAll(selector)
            .forEach((el) => el.textContent.toLowerCase().includes(e.target.value)
            ? el.classList.remove("filter")
            : el.classList.add("filter"));

            // console.log(e.target.value)
        }
    });
}

d.addEventListener("DOMContentLoaded", (e) => {
  searchFilters(".filtrador", ".card");
});
