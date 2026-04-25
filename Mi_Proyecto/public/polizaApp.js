// ====== mostrar y ocultar menú lateral ======
 document.querySelectorAll('.menu-item').forEach(button => {
    button.addEventListener('click', () => {
        const menuId = button.dataset.menu;
        const submenu = document.getElementById(menuId);

        submenu.style.display =
            submenu.style.display === "block" ? "none" : "block";
    });
    });
// ====== mostrar y ocultar formulaarios ======
    document.querySelectorAll('.submenu button').forEach(button => {
    button.addEventListener('click', () => {

        const formId = button.dataset.form;

        document.querySelectorAll('.form-section')
                    .forEach(section => section.style.display = 'none');

        document.getElementById(formId).style.display = 'block';
    });
    })

    let polizaEditando = null; 
    cargarPolizas();
    // ====== GUARDAR póliza // CRUD de Póliza (sin el DELETE)
    document.addEventListener("DOMContentLoaded", function(){           

    document.getElementById("formPoliza").addEventListener("submit", async function(e){

    e.preventDefault();
    
    const poliza = {
    id_cliente: document.getElementById("clientePoliza").value,
    tipoPoliza: document.getElementById("tipoPoliza").value,
    planPoliza: document.getElementById("planPoliza").value,
    numeroPoliza: document.getElementById("numeroPoliza").value,
    inicioVigencia: document.getElementById("inicioVigencia").value,
    finVigencia: document.getElementById("finVigencia").value,
    valor: document.getElementById("valorPoliza").value,
    aseguradora: document.getElementById("aseguradora").value,
    periodicidadPago: document.getElementById("periodicidadPago").value,
    estado: document.getElementById("estadoPoliza").value
    };

    let url = "http://localhost:3000/api/polizas";
    let method = "POST";

    if(polizaEditando){
    url = `http://localhost:3000/api/polizas/${polizaEditando}`;
    method = "PUT";
    }

    const response = await fetch(url,{
    method,
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(poliza)
    });
    

    const data = await response.json();

    alert(data.mensaje);
    
    cargarPolizas();

    // reset // "document." Es el objeto que representa todo el HTML
    document.getElementById("formPoliza").reset();
    polizaEditando = null;
    document.getElementById("btnPoliza").textContent = "Guardar";

    });
    });

    
    // ====== Seleccionar cliente en poliza (Relación)// FETCH sirve para Enviar/recibir datos entre frontend y backend
    async function cargarClientesSelect(){

    const response = await fetch("http://localhost:3000/api/clientes");
    
    const clientes = await response.json();

    const select = document.getElementById("clientePoliza");

    select.innerHTML = "<option value=''>Seleccione cliente</option>";

    clientes.forEach(cliente => {

    select.innerHTML += `
    <option value="${cliente.id}">
    ${cliente.nombre} ${cliente.apellido}
    </option>
    `;

    });

    }

    // ====== función para Cargar la poliza
    async function cargarPolizas(){

    const response = await fetch("http://localhost:3000/api/polizas");
    const polizas = await response.json();

    const tabla = document.querySelector("#tablaPolizas tbody");

    tabla.innerHTML = "";

    polizas.forEach(poliza => {

    tabla.innerHTML += `
    <tr>
    <td>${poliza.nombre} ${poliza.apellido}</td>
    <td>${poliza.tipoPoliza}</td>
    <td>${poliza.planPoliza}</td>
    <td>${poliza.numeroPoliza}</td>
    <td>${poliza.valor}</td>
    <td>${poliza.estado}</td>

    <td>
    <button type="button" onclick="editarPoliza(${poliza.id})">Editar</button>
    </td>

    </tr>
    `;

    });

    }


    // ====== función para Editar la poliza
    window.editarPoliza = function(id){

    polizaEditando = id;

    fetch("http://localhost:3000/api/polizas")
    .then(res => res.json())
    .then(polizas => {

    const poliza = polizas.find(p => p.id == id);
    console.log(poliza);
    document.getElementById("clientePoliza").value = poliza.id_cliente;
    document.getElementById("tipoPoliza").value = poliza.tipoPoliza;
    document.getElementById("planPoliza").value = poliza.planPoliza;
    document.getElementById("numeroPoliza").value = poliza.numeroPoliza;   
    document.getElementById("inicioVigencia").value = poliza.inicioVigencia.split("T")[0];    
    document.getElementById("finVigencia").value = poliza.finVigencia.split("T")[0];
    document.getElementById("valorPoliza").value = poliza.valor;
    document.getElementById("aseguradora").value = poliza.aseguradora;
    document.getElementById("periodicidadPago").value = poliza.periodicidadPago;
    document.getElementById("estadoPoliza").value = poliza.estado;  
    document.getElementById("btnPoliza").textContent = "Actualizar";

    });

    };