document.addEventListener("DOMContentLoaded", () => {
    // Obtén el elemento de imagen del Chocobo y el botón de San Valentín por sus ID
    const chocoboImg = document.getElementById("chocoboImg");
    const botonValentin = document.getElementById("botonValentin");

    let position = 0; // Posición inicial del chocobo
    const maxPosition = 40; // Distancia máxima de movimiento a la derecha
    let speed = 6; // Velocidad normal
    let fastSpeed = -10; // Velocidad rápida hacia la izquierda
    let animationFrame;
    let hasAnimatedOnce = false; // Para evitar múltiples clics

    // Función para mover el Chocobo por encima del botón
    function moveAboveButton() {
        if (position < maxPosition) {
            position += speed; // Mueve a la derecha primero
        } else {
            speed = fastSpeed; // Luego acelera a la izquierda
        }

        position += speed; // Actualiza la posición
        chocoboImg.style.transform = `translateX(${position}px)`; // Aplica la transformación de movimiento

        // Si la posición es menor o igual al ancho de la ventana (fuera de la pantalla)
        if (position <= -window.innerWidth) {
            cancelAnimationFrame(animationFrame); // Cancela la animación actual
            moveBelowButton(); // Inicia la animación desde abajo
            return;
        }

        animationFrame = requestAnimationFrame(moveAboveButton); // Continúa la animación
    }

    // Función para mover el Chocobo por debajo del botón
    function moveBelowButton() {
        const rect = botonValentin.getBoundingClientRect(); // Obtiene la posición del botón de San Valentín
        chocoboImg.style.position = "absolute";
        chocoboImg.style.top = `${rect.bottom + 10}px`; // Posiciona el Chocobo debajo del botón
        chocoboImg.style.left = "0px"; // Inicia desde el extremo izquierdo
        chocoboImg.style.transform = "scaleX(-1)"; // Voltea la imagen para moverse a la derecha

        position = -window.innerWidth; // Reinicia la posición
        speed = 6; // Velocidad normal
        let fastSpeedRight = 20; // Aumenta la velocidad a la derecha

        // Función para mover el Chocobo a la derecha rápidamente
        function moveRight() {
            position += fastSpeedRight; // Ajusta la velocidad aquí
            chocoboImg.style.left = `${position}px`; // Actualiza la posición

            // Si la posición es mayor o igual al ancho de la ventana (final de la pantalla)
            if (position >= window.innerWidth) {
                cancelAnimationFrame(animationFrame); // Cancela la animación actual
                fadeOut(document.body, 1000, () => { // Inicia el efecto de desvanecimiento
                    window.location.href = "bodi.html"; // Redirige a la nueva página
                });
                return;
            }

            animationFrame = requestAnimationFrame(moveRight); // Continúa la animación
        }

        moveRight(); // Inicia el movimiento a la derecha
    }

    // Función para desvanecer un elemento
    function fadeOut(element, duration, callback) {
        element.style.transition = `opacity ${duration}ms`; // Configura la transición de opacidad
        element.style.opacity = 0; // Cambia la opacidad a 0 (desvanecimiento)
        setTimeout(callback, duration); // Ejecuta la devolución de llamada después de la duración
    }

    // Evento click para iniciar la animación cuando se hace clic en el botón de San Valentín
    botonValentin.addEventListener("click", () => {
        if (!hasAnimatedOnce) { // Verifica si la animación ya ha ocurrido
            moveAboveButton(); // Inicia el movimiento por encima del botón
            hasAnimatedOnce = true; // Marca que la animación ya ha ocurrido
        }
    });
});
