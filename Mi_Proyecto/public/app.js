document.addEventListener("DOMContentLoaded", function(){

let clienteEditando = null;

cargarClientesSelect();

/* Guardar Cliente ENVIAR DATOS */
document.getElementById("formCliente").addEventListener("submit", async function(e){

e.preventDefault();

const cliente = {
nombre: document.getElementById("nombreCliente").value,
apellido: document.getElementById("apellidoCliente").value,
tipoDoc: document.getElementById("tipoDocumento").value,
documento: document.getElementById("numeroDocumento").value,
correo: document.getElementById("correoCliente").value,
fechaN: document.getElementById("fechaNacimiento").value,
direccion: document.getElementById("direccionCliente").value,
celular: document.getElementById("celularCliente").value,
estado: document.getElementById("estadoCliente").value,
};

let url = "http://localhost:3000/api/clientes";
let method = "POST";

// SI ESTÁ EDITANDO
if(clienteEditando){
url = `http://localhost:3000/api/clientes/${clienteEditando}`;
method = "PUT";
}

const response = await fetch(url,{
method: method,
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(cliente)
});

const data = await response.json();

alert(data.mensaje);

// resetear
clienteEditando = null;
document.getElementById("btnGuardar").textContent = "Guardar";
document.getElementById("formCliente").reset();

cargarClientes();

});


/* CARGAR CLIENTES */
async function cargarClientes(){

const response = await fetch("http://localhost:3000/api/clientes");
const clientes = await response.json();

renderClientes(clientes);

}


/* EDITAR CLIENTE */
window.editarCliente = function(id){

clienteEditando = id;

fetch("http://localhost:3000/api/clientes")
.then(res => res.json())
.then(clientes => {

const cliente = clientes.find(c => c.id == id);

document.getElementById("nombreCliente").value = cliente.nombre;
document.getElementById("apellidoCliente").value = cliente.apellido;
document.getElementById("tipoDocumento").value = cliente.tipoDoc;
document.getElementById("numeroDocumento").value = cliente.documento;
document.getElementById("correoCliente").value = cliente.correo;
document.getElementById("fechaNacimiento").value = cliente.fechaN.split("T")[0];
document.getElementById("direccionCliente").value = cliente.direccion;
document.getElementById("celularCliente").value = cliente.celular;
document.getElementById("estadoCliente").value = cliente.estado;
document.getElementById("btnGuardar").textContent = "Actualizar";

});

};


/* ELIMINAR CLIENTE */
window.eliminarCliente = async function(id){

if(!confirm("¿Eliminar cliente?")) return;

await fetch(`http://localhost:3000/api/clientes/${id}`,{
method:"DELETE"
});

cargarClientes();

};


cargarClientes();

});


/*EVENTO  para la Busqueda de cliente*/
document.getElementById("buscarCliente").addEventListener("input", async function(){

const texto = this.value.toLowerCase();

const response = await fetch("http://localhost:3000/api/clientes");
const clientes = await response.json();

const filtrados = clientes.filter(c =>
c.nombre.toLowerCase().includes(texto) ||
c.apellido.toLowerCase().includes(texto) ||
c.documento.includes(texto)
);

renderClientes(filtrados);

});

/*REFACTORIZAR el Render*/
function renderClientes(clientes){

const tabla = document.querySelector("#tablaClientes tbody");
tabla.innerHTML = "";

clientes.forEach(cliente => {

tabla.innerHTML += `
<tr>
<td>${cliente.nombre}</td>
<td>${cliente.apellido}</td>
<td>${cliente.documento}</td>
<td>${cliente.correo}</td>
<td>${cliente.celular}</td>

<td>
<button onclick="editarCliente(${cliente.id})">Editar</button>
<button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
</td>
</tr>
`;

});

}