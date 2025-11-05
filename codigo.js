document.addEventListener('DOMContentLoaded', (event) => {
    // 1. Obtiene el contenedor que se pausa (el slider completo)
    const slider = document.getElementById('logoSlider');
    // 2. Obtiene el elemento que se está animando (el track)
    const track = slider.querySelector('.logo-track');
    
    // Pausar y reanudar el scroll
    slider.addEventListener('mouseenter', () => {
        track.classList.add('paused');
    });
    
    slider.addEventListener('mouseleave', () => {
        track.classList.remove('paused');
    });

    // Opcional: Efecto visual al pasar el ratón sobre el icono
    track.querySelectorAll('.logo-item').forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            // Cambia el color y agranda el icono al pasar el ratón
            logo.style.color = '#007bff'; 
            logo.style.transform = 'scale(1.2)'; 
        });
        logo.addEventListener('mouseleave', () => {
            // Regresa a los estilos originales
            logo.style.color = '#444';
            logo.style.transform = 'scale(1)';
        });
    });
});



/* ======================================= */
/* Proyectos.html */

// Array de Proyectos
// Esta es la fuente única de información. Aquí es donde agregas, eliminas o modificas proyectos.
const listaDeProyectos = [
    {
        id: 1,
        titulo: "Web Casa Surf",
        descripcionCorta: "Diseño y desarrollo de un sitio web moderno.",
        descripcionLarga: "Proyecto de diseño y desarrollo web completo para una escuela de surf. Se enfocó en una experiencia de usuario inmersiva, utilizando HTML, CSS (Grid/Flexbox) y un poco de JavaScript para la interactividad.",
        imagenURL: "imagenes/surf.webp",
        linkSitio: "https://velvety-starburst-31d093.netlify.app/#tienda",
        tecnologias: ["HTML", "CSS", "JavaScript"], // Reemplazar con el enlace real
        claseCSS: "span-2x2" // Para que ocupe más espacio en el grid
    },
    {
        id: 2,
        titulo: "Revista Digital",
        descripcionCorta: "Diseño de maquetación y arte final para revista temática.",
        descripcionLarga: "Proyecto editorial, incluyendo el diseño de la portada, contraportada y maquetación de interiores, respetando una grilla modular y tipografía legible.",
        imagenURL: "imagenes/revista.webp",
        linkSitio: "#",
        linkBehance: "https://www.behance.net/gallery/237824697/Portada-de-revista",
        tecnologias: ["Adobe InDesign", "Adobe Photoshop", "Maquetación"],
        claseCSS: ""
    },
    {
        id: 3,
        titulo: "Estudio de Abogados",
        descripcionCorta: "Rediseño de la identidad visual y sitio web corporativo.",
        descripcionLarga: "Rediseño completo del sitio web de un estudio jurídico. El objetivo fue proyectar seriedad y confianza, mejorando la navegación y la llamada a la acción para solicitar consultas.",
        imagenURL: "imagenes/abogados.webp",
        linkSitio: "https://fluffy-douhua-f397ea.netlify.app/",
        linkBehance: "", 
        tecnologias: ["Figma", "html", "UI/UX Design"],
        claseCSS: ""
    },
    {
        id: 4,
        titulo: "Afiche Publicitario",
        descripcionCorta: "Creación de pieza gráfica promocional.",
        descripcionLarga: "Diseño de un afiche promocional para un festival de música uruguaya. Se buscó un estilo visual que capturara la esencia del evento, utilizando técnicas de composición y tipografía.",
        imagenURL: "imagenes/afiche.webp",
        linkSitio: "#",
        linkBehance: "https://www.behance.net/gallery/237825007/Afiche",
        tecnologias: ["Adobe Illustrator", "Tipografía", "Composición"],
        claseCSS: ""
    },
    {
        id: 5,
        titulo: "Web Club Padel",
        descripcionCorta: "Landing page para reserva de canchas de pádel.",
        descripcionLarga: "Diseño de una landing page en figma enfocada en la conversión para un club de pádel. Se implementó un sistema de reservas simplificado y una galería de fotos.",
        imagenURL: "imagenes/padel.webp",
        linkSitio: "https://www.figma.com/proto/4uWYDATWQhJJe8E3dhGOMn/Untitled?node-id=1-47&t=XhCEYA8fI2eeKHd6-1",
        linkBehance: "",
        tecnologias: ["Adobe Illustrator", "Adobe Photoshop", "Figma", "Diseño Minimalista"],
        claseCSS: ""
    },
    {
        id: 6,
        titulo: "Tapa de Libro",
        descripcionCorta: "Diseño para la portada de una novela gráfica (cómic).",
        descripcionLarga: "Ilustración y diseño de la tapa de un libro de cómics y videojuegos.",
        imagenURL: "imagenes/comic.webp",
        linkSitio: "#",
        linkBehance: "https://www.behance.net/gallery/237824363/Libro-de-comics",
        tecnologias: ["Adobe Photoshop", "Ilustración Digital", "Diseño Editorial"],
        claseCSS: ""
    },

];

// ----------------------------------------------------
// Lógica de Renderizado y Modal
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('proyectos-grid');
    const modal = document.getElementById('modal-proyecto');
    const cerrarModalBtn = document.querySelector('.cerrar-modal');
    
    // Función para renderizar una tarjeta de proyecto
    const crearTarjetaProyecto = (proyecto) => {
        const card = document.createElement('div');
        card.className = `proyecto-card ${proyecto.claseCSS}`;
        card.setAttribute('data-id', proyecto.id); // Identificador para JS

        card.innerHTML = `
            <img src="${proyecto.imagenURL}" alt="${proyecto.titulo}">
            <div class="proyecto-info">
                <h3>${proyecto.titulo}</h3>
                <p>${proyecto.descripcionCorta}</p>
                <a href="#" class="btn ver-proyecto">Ver Proyecto</a>
            </div>
        `;
        
        // Añadir el evento para abrir el modal
        card.querySelector('.ver-proyecto').addEventListener('click', (e) => {
            e.preventDefault();
            mostrarDetalleProyecto(proyecto.id);
        });

        return card;
    };

    // Función para llenar la cuadrícula con los proyectos
    const inicializarProyectos = () => {
        gridContainer.innerHTML = ''; // Limpiar el contenedor antes de renderizar
        listaDeProyectos.forEach(proyecto => {
            const tarjeta = crearTarjetaProyecto(proyecto);
            gridContainer.appendChild(tarjeta);
        });
    };

    // Función para mostrar el detalle en el modal
    const mostrarDetalleProyecto = (id) => {
        const proyecto = listaDeProyectos.find(p => p.id === id);
        
        if (!proyecto) return;

        // Llenar el contenido del modal
        document.getElementById('modal-titulo').textContent = proyecto.titulo;
        document.getElementById('modal-imagen').src = proyecto.imagenURL;
        document.getElementById('modal-imagen').alt = proyecto.titulo;
        document.getElementById('modal-descripcion').textContent = proyecto.descripcionLarga;

        // Llenar Tecnologías
        const tecnologiasContainer = document.getElementById('modal-tecnologias');
        tecnologiasContainer.innerHTML = '';
        proyecto.tecnologias.forEach(tec => {
            const span = document.createElement('span');
            span.className = 'badge-tecnologia';
            span.textContent = tec;
            tecnologiasContainer.appendChild(span);
        });

        // Configurar botones de enlace
        const linkSitio = document.getElementById('modal-link');
        linkSitio.href = proyecto.linkSitio;
        linkSitio.style.display = proyecto.linkSitio && proyecto.linkSitio !== "#" ? 'block' : 'none';

        const linkBehance = document.getElementById('modal-behance');
        linkBehance.href = proyecto.linkBehance;
        linkBehance.style.display = proyecto.linkBehance ? 'block' : 'none';
        
        // Mostrar el modal
        modal.style.display = 'flex';
        document.body.classList.add('modal-abierto'); // Bloquear el scroll del body
    };

    // Eventos para cerrar el modal
    cerrarModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-abierto');
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-abierto');
        }
    });

    // Iniciar la carga de proyectos
    inicializarProyectos();
});







/* ======================================= */
/* Formulario de Contacto (CÓDIGO MODIFICADO) */
/* ======================================= */

// Obtenemos la referencia al formulario de contacto
const formularioUsuario = document.querySelector("#form-usuario");

// --- FUNCIONES DE VALIDACIÓN ---

// Función utilitaria para mostrar errores.
const mostrarError = (mensajeError, idCampo) => {
    // Busca el elemento con el ID de error (ej: 'error-nombre', 'error-email')
    const campoError = document.getElementById(`error-${idCampo}`);
    if(campoError) {
        campoError.textContent = mensajeError;
    }
};

function validarNombre() {
    const input = document.getElementById('firstname');
    const ok = input.value.trim().length >= 2;
    mostrarError(ok ? '' : 'El nombre es obligatorio (mín. 2).', 'firstname');
    return ok;
}

function validarEmail() {
    const input = document.getElementById('email');
    // Expresión regular para email
    const ok = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.value.trim()); 
    mostrarError(ok ? '' : 'Ingresá un email válido.', 'email');
    return ok;
}

/* function validarFormulario(e) {
    e.preventDefault(); // 1) Frena el submit nativo

    // Ejecuta *todas* las validaciones
    const nombreEsValido = validarNombre();
    const emailEsValido = validarEmail();

    const formularioValido = nombreEsValido && emailEsValido;
    
    if (formularioValido) {
        // 2) Si es válido, envía el formulario
        formularioUsuario.submit();
    } 
} */
function validarFormulario(e) {
    e.preventDefault(); // Frenar submit normal

    const nombreEsValido = validarNombre();
    const emailEsValido = validarEmail();

    if (!nombreEsValido || !emailEsValido) return;

    // --- ENVÍO A NETLIFY MANUAL ---
    const formData = new FormData(formularioUsuario);

    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
    })
    .then(() => {
        const mensajeExito = document.getElementById('mensaje-exito');
        mensajeExito.textContent = "¡Formulario enviado correctamente! Gracias 😊";
        mensajeExito.style.display = "block";
        formularioUsuario.reset();
    })
    .catch((error) => {
        alert("Hubo un error al enviar el formulario: " + error);
    });
}

// --- CONEXIÓN DE EVENTOS ---

// Solo se ejecuta si el formulario existe en el HTML
if (formularioUsuario) {
    // Conectamos la función de validación al evento 'submit'
    formularioUsuario.addEventListener('submit', validarFormulario);
    
    // Opcional: Validar al perder el foco (blur) para feedback instantáneo
    document.getElementById('firstname')?.addEventListener('blur', validarNombre);
    document.getElementById('email')?.addEventListener('blur', validarEmail);
}









/* --- Mensaje de éxito personalizado --- */
document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#form-usuario");
  const mensajeExito = document.getElementById("mensaje-exito");

  if (formulario && mensajeExito) {
    formulario.addEventListener("submit", async function (e) {
      e.preventDefault();

      const data = new FormData(formulario);

      try {
        const response = await fetch("/", {
          method: "POST",
          body: data
        });

        if (response.ok) {
          formulario.reset();
          mensajeExito.style.display = "block";

          // Ocultar mensaje después de 5 segundos
          setTimeout(() => {
            mensajeExito.style.display = "none";
          }, 5000);
        } else {
          alert("Hubo un error al enviar el formulario. Intenta nuevamente.");
        }
      } catch (error) {
        alert("Error de conexión. Intenta nuevamente más tarde.");
      }
    });
  }
});




document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal-imagen");
  const modalImg = document.getElementById("imagen-ampliada");
  const cerrar = document.querySelector(".cerrar-modal");
  const imagenes = document.querySelectorAll(".img-porque, .img-encuesta");

  // Función para abrir el modal con la imagen seleccionada
  function abrirModal(img) {
    modal.style.display = "block";
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  }


/*  
        } */


  // Abrir el modal al hacer click en cualquier imagen
  imagenes.forEach(img => {
    img.addEventListener("click", () => abrirModal(img));
  });

  // Abrir automáticamente el primer elemento al cargar
  if (imagenes.length > 0) {
    abrirModal(imagenes[1]);
  }

  // Cerrar modal
  cerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
});


