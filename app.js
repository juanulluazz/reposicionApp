const color = document.querySelector("#color");
const fondo = document.querySelector(".lista-productos");
console.log(color.textContent)
color.addEventListener('click',()=>{
    fondo.style.background = "red";
})