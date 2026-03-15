const express = require("express");
const router = express.Router();
const db = require("./db");

router.post("/clientes",(req,res)=>{

const {nombre,apellido,tipoDoc,documento,correo,fechaN,direccion,celular,estado} = req.body;

const sql = `
INSERT INTO cliente
(nombre,apellido,tipoDoc,documento,correo,fechaN,direccion,celular,estado)
VALUES (?,?,?,?,?,?,?,?,?)
`;

db.query(sql,[nombre,apellido,tipoDoc,documento,correo,fechaN,direccion,celular,estado],(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({mensaje:"Error al guardar"});
}

res.json({mensaje:"Cliente guardado"});

});

});

module.exports = router;