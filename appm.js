document.addEventListener("DOMContentLoaded", () => {
    const musicaChocobo = document.getElementById("musicaChocobo");
    const botonValentin = document.getElementById("botonValentin");

    const reproducirMusica = () => {
        musicaChocobo.play().catch(() => {
            console.log("El navegador bloqueó la reproducción automática.");
        });

        // Guardar la posición de la música cada segundo
        setInterval(() => {
            localStorage.setItem("tiempoMusicaChocobo", musicaChocobo.currentTime);
        }, 1000);
    };

    botonValentin.addEventListener("click", reproducirMusica);

    // Reproducir música desde la posición guardada si existe
    const tiempoGuardado = localStorage.getItem("tiempoMusicaChocobo");
    if (tiempoGuardado !== null) {
        musicaChocobo.currentTime = parseFloat(tiempoGuardado);
    }
});

// Código para la segunda música
document.addEventListener("DOMContentLoaded", () => {
    const musica = document.getElementById("musica");

    // Reproducir música desde la posición guardada si existe
    const tiempoGuardado = localStorage.getItem("tiempoMusica");
    if (tiempoGuardado !== null) {
        musica.currentTime = parseFloat(tiempoGuardado);
    }
    musica.play();

    // Guardar la posición de la música cada segundo
    setInterval(() => {
        localStorage.setItem("tiempoMusica", musica.currentTime);
    }, 1000);
});
