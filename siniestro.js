const express = require("express");
const router = express.Router();
const db = require("./db"); // ajusta esta ruta según donde tengas tu conexión a la BD
 
// ====== GET — Obtener todos los siniestros (con datos de cliente y póliza) ======
router.get("/siniestros", (req, res) => {
    const sql = `
        SELECT 
            s.id,
            s.riesgoSiniestro,            
            s.fechaSiniestro,
            s.descripcion,
            s.estado,
            s.poliza_id,
            s.cliente_id,
            c.nombre,
            c.apellido,
            p.numeroPoliza,
            p.tipoPoliza,
            p.planPoliza
        FROM siniestro s
        JOIN cliente c ON s.cliente_id = c.id
        JOIN poliza p ON s.poliza_id = p.id
        ORDER BY s.id DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
 
// ====== GET — Obtener un siniestro por ID ======
router.get("/siniestros/:id", (req, res) => {
    const sql = `
        SELECT 
            s.id,
            s.riesgoSiniestro,            
            s.fechaSiniestro,
            s.descripcion,
            s.estado,
            s.poliza_id,
            s.cliente_id,
            c.nombre,
            c.apellido,
            p.numeroPoliza,
            p.tipoPoliza
        FROM siniestro s
        JOIN cliente c ON s.cliente_id = c.id
        JOIN poliza p ON s.poliza_id = p.id
        WHERE s.id = ?
    `;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ mensaje: "Siniestro no encontrado" });
        res.json(results[0]);
    });
});
 
// ====== POST — Crear nuevo siniestro ======
router.post("/siniestros", (req, res) => {
    const { cliente_id, poliza_id, riesgoSiniestro, fechaSiniestro, descripcion, estado } = req.body;
    
 
    const sql = "INSERT INTO siniestro (cliente_id, poliza_id, riesgoSiniestro, fechaSiniestro, descripcion, estado) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [cliente_id, poliza_id, riesgoSiniestro, fechaSiniestro, descripcion, estado], (err, result) => {
        if (err) {
            console.error("ERROR AL CREAR SINIESTRO:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ mensaje: "Siniestro creado correctamente", id: result.insertId });
    });
});
 
// ====== PUT — Actualizar siniestro ======
router.put("/siniestros/:id", (req, res) => {
    const { cliente_id, poliza_id, riesgoSiniestro, fechaSiniestro, descripcion, estado } = req.body;
 
    const sql = "UPDATE siniestro SET cliente_id = ?, poliza_id = ?, riesgoSiniestro = ?, fechaSiniestro = ?, descripcion = ?, estado = ? WHERE id = ?";
    db.query(sql, [cliente_id, poliza_id, riesgoSiniestro, fechaSiniestro, descripcion, estado, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Siniestro actualizado correctamente" });
    });
});
 
// ====== DELETE — Eliminar siniestro ======
router.delete("/siniestros/:id", (req, res) => {
    const sql = "DELETE FROM siniestro WHERE id = ?";
    db.query(sql, [req.params.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Siniestro eliminado correctamente" });
    });
});
 
module.exports = router;