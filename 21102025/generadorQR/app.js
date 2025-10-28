function crearCodigoQR() {
    // Capturar los valores de los campos
    const nombre = document.getElementById("campo1").value.trim();
    const correo = document.getElementById("campo2").value.trim();
    const institucion = document.getElementById("campo3").value.trim();
    const dependencia = document.getElementById("campo4").value.trim();

    // Unir todos los textos no vacíos
    const datosQR = [nombre, correo, institucion, dependencia].filter(texto => texto !== "").join(" ");

    // Verificar que haya al menos un valor
    if (!datosQR) {
        alert("Por favor, llena al menos un campo para generar el código QR.");
        return;
    }

    // Limpiar contenido anterior
    const areaQR = document.getElementById("resultadoQR");
    areaQR.innerHTML = "";

    // Crear URL del código QR
    const urlQR = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(datosQR)}`;

    // Crear imagen
    const imagenQR = document.createElement("img");
    imagenQR.src = urlQR;
    imagenQR.alt = "Código QR generado";
    imagenQR.classList.add("imagenQR");
    areaQR.appendChild(imagenQR);

    // Botón para eliminar el QR
    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar QR";
    eliminarBtn.classList.add("btn-eliminar");
    eliminarBtn.onclick = () => {
        areaQR.innerHTML = "";
        alert("El código QR ha sido eliminado.");
    };
    areaQR.appendChild(eliminarBtn);
}
