document.addEventListener('DOMContentLoaded', function() {
    // Obtener todas las imágenes con la clase 'img-control' y el elemento del mensaje
    const images = document.querySelectorAll('.img-control');
    const mensaje = document.getElementById('mensaje');
    let usedKeys = 0;

    // Definir los textos que se mostrarán al hacer clic en cada imagen
    const textos = {
        img1: "💖 Como Cloud Strife, eres fuerte y valiente, enfrentando cada desafío con determinación. Al igual que Cloud, siempre encuentras la manera de superar los obstáculos, y admiro profundamente tu resiliencia y perseverancia. 🌹",
        img2: "💕 Eres tan compasivo y amable como Aerith Gainsborough, siempre cuidando de los demás y brindando consuelo cuando más se necesita. Tu bondad y empatía son cualidades que valoro profundamente. 🌸",
        img3: "💘 En tus momentos de liderazgo, me recuerdas a Lightning Farron, quien guía a sus amigos con firmeza y coraje. Tu capacidad para tomar decisiones difíciles y mantener la calma en situaciones complicadas es verdaderamente inspiradora. 🌟",
        img4: "💓 Como Zidane Tribal, tienes un espíritu libre y aventurero, siempre buscando nuevas experiencias y disfrutando de la vida al máximo. Tu alegría y entusiasmo son contagiosos y me llenan de energía. 🌈",
        img5: "💗 Finalmente, en tus momentos de sabiduría y reflexión, me haces pensar en Yuna, quien siempre busca el equilibrio y la armonía. Tu capacidad para ver lo mejor en cada situación y mantener la paz es algo que aprecio enormemente. 🍃",
    };    

    // Agregar un evento de clic a cada imagen
    images.forEach(img => {
        img.addEventListener('click', function() {
            // Mostrar el mensaje correspondiente
            mensaje.textContent = textos[this.id];
            mensaje.style.display = 'block';

            // Incrementar el contador de llaves usadas
            usedKeys++;

            // Detener la animación del GIF
            this.style.animationPlayState = 'paused';

            // Crear la animación con JavaScript
            this.style.transition = 'transform 0.5s, opacity 1s';
            this.style.transform = 'scale(2)';

            setTimeout(() => {
                this.style.opacity = '0';
            }, 500); // Esperar a que termine la transformación para iniciar la opacidad

            // Remover la imagen después de la animación
            setTimeout(() => {
                this.remove();
                verificarLlavesUsadas();
            }, 1500); // Tiempo total de la animación
        });
    });

    // Verificar si se han usado todas las llaves
    function verificarLlavesUsadas() {
        if (usedKeys === images.length) {
            // Borrar todo el contenido de la pantalla
            document.body.innerHTML = ''; 
            document.body.style.display = 'flex';
            document.body.style.flexDirection = 'column';
            document.body.style.justifyContent = 'center';
            document.body.style.alignItems = 'center';
            document.body.style.height = '100vh';

            // Crear una nueva imagen y un mensaje final
            const flyingImg = document.createElement('img');
            flyingImg.id = 'flyingImg';
            flyingImg.src = 'assets/Flying.gif';
            flyingImg.style.width = '200px';
            flyingImg.style.marginTop = '20px';

            const mensajeFinal = document.createElement('div');
            mensajeFinal.textContent = 'Eso es todo, kupo!';
            mensajeFinal.className = 'texto-final';

            document.body.appendChild(flyingImg);
            document.body.appendChild(mensajeFinal);

            // Crear múltiples corazones girando y moviéndose
            for (let i = 0; i < 20; i++) {
                const corazon = document.createElement('div');
                corazon.className = 'corazon';
                corazon.style.top = `${Math.random() * 90}vh`;
                corazon.style.left = `${Math.random() * 90}vw`;
                document.body.appendChild(corazon);
                moverCorazon(corazon);
            }
        }
    }

    // Función para mover los corazones en la pantalla
    function moverCorazon(corazon) {
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;

        function animar() {
            x += dx;
            y += dy;

            if (x <= 0 || x >= window.innerWidth - corazon.clientWidth) dx = -dx;
            if (y <= 0 || y >= window.innerHeight - corazon.clientHeight) dy = -dy;

            const flyingImg = document.getElementById('flyingImg');
            const flyingRect = flyingImg.getBoundingClientRect();
            const corazonRect = corazon.getBoundingClientRect();

            if (!(corazonRect.right < flyingRect.left || 
                corazonRect.left > flyingRect.right || 
                corazonRect.bottom < flyingRect.top || 
                corazonRect.top > flyingRect.bottom)) {
                    dx = -dx;
                    dy = -dy;
            }

            corazon.style.left = `${x}px`;
            corazon.style.top = `${y}px`;

            requestAnimationFrame(animar);
        }

        animar();
    }
});
