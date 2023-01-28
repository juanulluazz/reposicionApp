const { Router } = require("express");
const router = Router();
const fs = require("fs");
// const { v4: uuidv4 } = require('uuid');

const json_productos = fs.readFileSync('src/bd.json', 'utf-8')
let productos = JSON.parse(json_productos);



router.get('/', (req, res) => {
    res.render('index.ejs', {
        productos
    })

})


router.get('/inicio', (req,res)=> {
    res.render('inicio')
})

// router.get('/formulario',(req,res)=>{
//     res.render('formulario.ejs')
// })










// router.post("/", (req, res) => {
//   const { marca, nombre, detalle, volumen } = req.body;
//   if (!marca || !nombre || !detalle || !volumen) {
//     res.status(400).send("Aca deberia haber dato requerido");
//     return;
//   }

//   let newProducto = {
//     marca,
//     nombre,
//     detalle,
//     volumen
//   };
//   productos.push(newProducto);

//   const json_productos = JSON.stringify(productos);
//   fs.writeFileSync("src/bd.json", json_productos, "utf-8");

//   res.redirect("/");
// });



module.exports = router;
