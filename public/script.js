//Funcion para salud al hacer clic en un boton
function saludar() {
    const mensaje = '¡Hola desde el script!';

    // Mostrar el mensaje en un elemento HTML con el id 'saludo'
    const saludoElement = document.getElementById('saludo');
    saludoElement.textContent = mensaje;
}

// Asignar la funcion 'saludar al evento 'click' del boton
const botonSaludo = document.getElementById('boton-saludo');
botonSaludo.addEventListener('click', saludar);
