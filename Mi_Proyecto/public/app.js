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

try{

const response = await fetch("http://localhost:3000/api/clientes",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify(cliente)

});

const data = await response.json();

alert(data.mensaje);

}catch(error){

console.error("Error:",error);

}

});