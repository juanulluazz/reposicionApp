//Variables

const color = document.querySelector("#color");
const fondo = document.querySelector("#tituloMarca");
const fila_producto = document.querySelector(".fila-producto");


//Cambiar el color de la Marca

color.addEventListener("click", () => {
  fondo.style.color = "#C24877";
 
});


//Filtrador de busqueda
const input = document.querySelector('#searchInput')
const productList = document.querySelector('#productos')


let productos = []

window.addEventListener('DOMContentLoaded', async () => {
  
  productList.innerHTML = "<h1>Loading</h1>"
  const data = await cargarProductos()

  productos = data
  renderProductos(productos)

})

input.addEventListener('keyup', e => {
  const newProducto = productos.filter(producto => `${producto.nombre.toLowerCase()} ${producto.detalle.toLowerCase()}`.includes(input.value.toLowerCase()))
   renderProductos(newProducto)
})


async function cargarProductos() {
const response =   await  fetch('js/deposito.json')
return await response.json()   
}


const createUserItems = productos => productos.map(producto =>
    `<li class="">${producto.nombre} ${producto.detalle}   <input class="inputCantidad" type="text"></</li>`).join(' ')


function renderProductos(productos) {
const itemsString =   createUserItems(productos)
   productList.innerHTML = itemsString
}

// const d = document;

// function searchFilters(input, selector) {
//     d.addEventListener("keyup", (e) => {
//         if (e.target.matches(input)) {

//             if(e.key === "Escape")e.target.value = " ";
//             d.querySelectorAll(selector)
//             .forEach((el) => el.textContent.toLowerCase().includes(e.target.value)
//             ? el.classList.remove("filter")
//             : el.classList.add("filter"));

//             // console.log(e.target.value)
//         }
//     });
// }

// d.addEventListener("DOMContentLoaded", (e) => {
//   searchFilters(".filtrador", ".card");
// });
