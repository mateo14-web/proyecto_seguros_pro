const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// IMPORTAR RUTAS
const clienteRoutes = require("./cliente");
const polizaRoutes = require("./poliza");

// USAR RUTAS
app.use("/api", clienteRoutes);
app.use("/api", polizaRoutes);

app.listen(3000, () => {
console.log("Servidor corriendo en puerto 3000");
});