
    // ===== Exportamos la libreria EXPRESS =====
    const express = require("express");
    const router = express.Router();
    const db = require("./db");


    // ===== CREAR PÓLIZA =====
    router.post("/polizas", (req,res)=>{

    const {id_cliente,tipoPoliza,planPoliza,numeroPoliza,inicioVigencia,finVigencia,valor,aseguradora,periodicidadPago,estado} = req.body;

    const sql = `
    INSERT INTO poliza
    (id_cliente,tipoPoliza,planPoliza,numeroPoliza,inicioVigencia,finVigencia,valor,aseguradora,periodicidadPago,estado)
    VALUES (?,?,?,?,?,?,?,?,?,?)
    `;

    db.query(sql,[id_cliente,tipoPoliza,planPoliza,numeroPoliza,inicioVigencia,finVigencia,valor,aseguradora,periodicidadPago,estado],(err,result)=>{

    if(err){
    console.log(err);
    return res.status(500).json({mensaje:"Error al guardar póliza"});
    }

    res.json({mensaje:"Póliza creada"});

    });

    });


    // ===== OBTENER PÓLIZAS =====
    router.get("/polizas",(req,res)=>{

    const sql = `
    SELECT poliza.*, cliente.nombre, cliente.apellido
    FROM poliza
    JOIN cliente ON poliza.id_cliente = cliente.id
    `;

    db.query(sql,(err,result)=>{

    if(err){
    console.log(err);
    return res.status(500).json({mensaje:"Error al obtener pólizas"});
    }

    res.json(result);

    });

    });


    // ===== ACTUALIZAR PÓLIZA =====
    router.put("/polizas/:id",(req,res)=>{

    const {id} = req.params;

    const {id_cliente,tipoPoliza,planPoliza,numeroPoliza,inicioVigencia,finVigencia,valor,aseguradora,periodicidadPago,estado} = req.body;

    const sql = `
    UPDATE poliza SET
    id_cliente=?,tipoPoliza=?,planPoliza=?,numeroPoliza=?,inicioVigencia=?,finVigencia=?,valor=?,aseguradora=?,periodicidadPago=?,estado=?
    WHERE id=?
    `;
    console.log("BODY:", req.body);
    console.log("ID CLIENTE:", id_cliente);
    db.query(sql,[id_cliente,tipoPoliza,planPoliza,numeroPoliza,inicioVigencia,finVigencia,valor,aseguradora,periodicidadPago,estado,id],(err,result)=>{

    if(err){
    console.log(err);
    return res.status(500).json({mensaje:"Error al actualizar póliza"});
    }

    res.json({mensaje:"Póliza actualizada"});

    });

    });

    module.exports = router;







    
    
    