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



// ====== OBTENER CLIENTES ======
router.get("/clientes",(req,res)=>{

const sql = "SELECT * FROM cliente";

db.query(sql,(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({mensaje:"Error al obtener clientes"});
}

res.json(result);

});

});


// ====== ELIMINAR CLIENTE ======
router.delete("/clientes/:id",(req,res)=>{

const {id} = req.params;

const sql = "DELETE FROM cliente WHERE id=?";

db.query(sql,[id],(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({mensaje:"Error al eliminar"});
}

res.json({mensaje:"Cliente eliminado"});

});

});


// ====== ACTUALIZAR CLIENTE ======
router.put("/clientes/:id",(req,res)=>{

const {id} = req.params;

const {nombre,apellido,tipoDoc,documento,correo,fechaN,direccion,celular,estado} = req.body;

const sql = `
UPDATE cliente
SET nombre=?,apellido=?,tipoDoc=?,documento=?,correo=?,fechaN=?,direccion=?,celular=?,estado=?
WHERE id=?
`;

db.query(sql,[nombre,apellido,tipoDoc,documento,correo,fechaN,direccion,celular,estado,id],(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({mensaje:"Error al actualizar"});
}

res.json({mensaje:"Cliente actualizado"});

});

});


module.exports = router;