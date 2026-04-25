// ====== GUARDAR SINIESTRO ======
    document.getElementById('formSiniestro')
    .addEventListener('submit', function (e) {

        e.preventDefault();

        const siniestro = {
            numeroDocumentoS: document.getElementById('numeroDocumentoS').value,
            tipoPolizaS: document.getElementById('tipoPolizaS').value,
            Riesgo: document.getElementById('Riesgo').value,
            aseguradoraS: document.getElementById('aseguradoraS').value,
            Descripción: document.getElementById('Descripción').value,
            
        };

        console.log("Siniestro guardado:", siniestro);

        alert("Siniestro guardado correctamente");
        

        this.reset();
    });