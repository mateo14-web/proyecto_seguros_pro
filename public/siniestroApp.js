// ====== CRUD DE SINIESTRO ======
 
let siniestroEditando = null;
 
// ====== Cargar clientes en el SELECT del formulario de siniestro ======
async function cargarClientesSiniestro() {
    const response = await fetch("http://localhost:3000/api/clientes");
    const clientes = await response.json();
 
    const select = document.getElementById("clienteSini");
    select.innerHTML = "<option value=''>Seleccione Cliente</option>";
 
    clientes.forEach(cliente => {
        select.innerHTML += `
        <option value="${cliente.id}">
            ${cliente.nombre} ${cliente.apellido}
        </option>
        `;
    });
}
 
// ====== GUARDAR o ACTUALIZAR siniestro ======
document.addEventListener("DOMContentLoaded", function () {
 
    cargarClientesSiniestro();
    cargarSiniestros();
 
    // ====== Cuando se elige un cliente, cargar SOLO sus pólizas ======
    document.getElementById("clienteSini").addEventListener("change", async function () {
        const clienteId = this.value;
        const selectPoliza = document.getElementById("polizaSini");
 
        selectPoliza.innerHTML = "<option value=''>Seleccione Póliza</option>";
 
        if (!clienteId) return;
 
        const response = await fetch(`http://localhost:3000/api/polizas/cliente/${clienteId}`);
        const polizas = await response.json();
 
        if (polizas.length === 0) {
            selectPoliza.innerHTML = "<option value=''>Este cliente no tiene pólizas</option>";
            return;
        }
 
        polizas.forEach(poliza => {
            selectPoliza.innerHTML += `
            <option value="${poliza.id}">
                N° ${poliza.numeroPoliza} — ${poliza.tipoPoliza} — ${poliza.planPoliza} — ${poliza.aseguradora}
            </option>
            `;
        });
    });
 
    document.getElementById("formSiniestro").addEventListener("submit", async function (e) {
        e.preventDefault();
 
        const clienteId = document.getElementById("clienteSini").value;
        const polizaId = document.getElementById("polizaSini").value;
 
        if (!clienteId || !polizaId) {
            alert("Por favor seleccione un cliente y una póliza.");
            return;
        }
 
        const siniestro = {
            cliente_id: clienteId,
            poliza_id: polizaId,
            riesgoSiniestro: document.getElementById("riesgoSiniestro").value,            
            fechaSiniestro: document.getElementById("fechaSiniestro").value,
            descripcion: document.getElementById("descripcion").value,
            estado: document.getElementById("estadoSiniestro").value
        };
 
        let url = "http://localhost:3000/api/siniestros";
        let method = "POST";
 
        if (siniestroEditando) {
            url = `http://localhost:3000/api/siniestros/${siniestroEditando}`;
            method = "PUT";
        }
 
        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(siniestro)
        });
 
        const data = await response.json();
 
        if (!response.ok) {
            alert("Error al guardar: " + (data.error || data.mensaje || JSON.stringify(data)));
            return;
        }
 
        alert(data.mensaje);
        cargarSiniestros();
 
        // reset del formulario
        document.getElementById("formSiniestro").reset();
        document.getElementById("polizaSini").innerHTML = "<option value=''>Seleccione Póliza</option>";
        siniestroEditando = null;
        document.getElementById("btnSiniestro").textContent = "Guardar";
    });
});
 
// ====== Cargar tabla de siniestros ======
async function cargarSiniestros() {
    const response = await fetch("http://localhost:3000/api/siniestros");
    const siniestros = await response.json();
 
    const tabla = document.querySelector("#tablaSiniestro tbody");
    tabla.innerHTML = "";
 
    siniestros.forEach(s => {
        tabla.innerHTML += `
        <tr>
            <td>${s.nombre} ${s.apellido}</td>
            <td>N° ${s.numeroPoliza} — ${s.tipoPoliza}</td>            
            <td>${s.fechaSiniestro ? s.fechaSiniestro.split("T")[0] : ""}</td>
            <td>${s.estado}</td>
            <td>
                <button type="button" onclick="editarSiniestro(${s.id})">Editar</button>
                <button type="button" onclick="eliminarSiniestro(${s.id})">Eliminar</button>
            </td>
        </tr>
        `;
    });
}
 
// ====== Editar siniestro ======
window.editarSiniestro = async function (id) {
    siniestroEditando = id;    
 
    const response = await fetch("http://localhost:3000/api/siniestros");
    const siniestros = await response.json();
    const s = siniestros.find(x => x.id == id);
 
   
    document.getElementById("clienteSini").value = s.cliente_id;
 
    // Cargar las pólizas de ese cliente y luego seleccionar la correcta
    const resPolizas = await fetch(`http://localhost:3000/api/polizas/cliente/${s.cliente_id}`);
    const polizas = await resPolizas.json();
 
    const selectPoliza = document.getElementById("polizaSini");
    selectPoliza.innerHTML = "<option value=''>Seleccione Póliza</option>";
    polizas.forEach(poliza => {
        selectPoliza.innerHTML += `
        <option value="${poliza.id}">
            N° ${poliza.numeroPoliza} — ${poliza.tipoPoliza} — ${poliza.planPoliza} — ${poliza.aseguradora}
        </option>
        `;
    });
    selectPoliza.value = s.poliza_id;
 
    document.getElementById("riesgoSiniestro").value = s.riesgoSiniestro;    
    document.getElementById("fechaSiniestro").value = s.fechaSiniestro ? s.fechaSiniestro.split("T")[0] : "";
    document.getElementById("descripcion").value = s.descripcion;
    document.getElementById("estadoSiniestro").value = s.estado;
 
    document.getElementById("btnSiniestro").textContent = "Actualizar";
};
 
// ====== Eliminar siniestro ======
window.eliminarSiniestro = async function (id) {
    if (!confirm("¿Está seguro de eliminar este siniestro?")) return;
 
    const response = await fetch(`http://localhost:3000/api/siniestros/${id}`, {
        method: "DELETE"
    });
 
    const data = await response.json();
    alert(data.mensaje);
    cargarSiniestros();
};