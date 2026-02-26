// Johan Martínez - 2025 - Diseño de Interfaces Web

/**
 * configuracion del tailwind para agregar animaciones personalizadas
 */
window.tailwind.config = {
    theme: {
        extend: {
            keyframes: {
                "entrada-suave": {
                    "0%": { transform: "scale(0) rotate(-180deg)", opacity: "0" },
                    "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
                },
                latido: {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.15)" },
                },
            },
            animation: {
                "logo-in": "entrada-suave 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                "logo-interactivo": "latido 0.6s ease-in-out infinite",
            },
        },
    },
};

/**
 * logiga interaccion (jquery)
 */
$(document).ready(function () {
    const $toggleButton = $("#menu-toggle");
    const $navMenuWrapper = $("#nav-menu-wrapper");

    // ======================== Mision #1 ========================
    // Aqui le cambio el color al elemento h1
    $("h1").css("color", "purple");
    // Aqui le cambio el texto al primer parrafo, para no alterar todo el contenido de la web
    $("p:first").html("SOY UNO DE LOS MEJORES DESARROLLADORES FRONTEND DEL MUNDO");
    // Aqui le cambio el fondo al contenedor principal y el color al primer h2
    $("#content").css("background-color", "lightblue");
    // Aqui le cambio el color al primer h2
    $("h2:first").css("color", "orange");

    // ======================== Mision #2 ========================

    // Aqui lo que quiero hacer es agregar una tarea pendiente con texto de prueba para verificar la funcionalidad del append.
    // Aqui tomo el boton por su id, seguidamente verifico si se ha hecho click en el boton
    $("#btn-add-task").on("click", function () {
        // Aqui esta la tarea que quiero agregar
        const nuevaTarea = `
            <tr>
                <td class="py-3 text-sm font-medium">Nueva tarea de prueba</td>
                <td class="py-3 text-right">
                    <span class="px-2 py-1 text-[10px] font-bold bg-red-100 text-red-700 rounded uppercase">
                        Pending
                    </span>
                </td>
            </tr>
        `;
        // Una vez con la tarea creada la agrego con el append, al modulo padre (pending-activities)
        $("#pending-activities").append(nuevaTarea);
        // Muestro por consola para verificar si funciono correctamente
        console.log("mensaje de prueba para verificar si la tarea se agrego con exito");
    });

    // Aqui lo que se va a realizar es eliminar la ultima tarea
    $("#btn-remove-last-task").on("click", function () {
        $("#pending-activities tr:last").remove();
    });

    // ======================== Mision #3 ========================
    //Aqui solo le decimos al usuario que no se puede eliminar su propio usuario
    $("#btn-delete-user").on("click", function () {
        alert("Only the administrator can delete users");
    });
    // Este es el contador de los caracteres
    $("#personal-notes").on("input", function () {
        const count = $(this).val().length;
        $("#char-count").text(count + " caracteres");
    });
    // Este es para hacer que el encabezado se vuelva un poco transparente al hacer scroll
    $(window).on("scroll", function () {
        if ($(window).scrollTop() > 50) {
            $("header").addClass("opacity-90 shadow-lg").removeClass("shadow-md");
        } else {
            $("header").removeClass("opacity-90 shadow-lg").addClass("shadow-md");
        }
    });

    // ======================== Mision #4 ========================

    // Al momento de reproducir el podcast desaparezva la imagen de la pagina
    $("#play-icon").on("click", function () {
        $("#logo-podcast").fadeOut("slow");
        console.log("El logo se esta desvaneciendo poco a poco");
    });

    // Al momento de darle click al boton de edit profile, la imagen del usuario se mostrara con un sliceDown

    $("#edit-profile").on("click", function () {
        $("#user-img").slideDown("slow");
        console.log("La imagen se esta modificando");
    });
    // ======================== Mision #5 ========================
    // Aqui se encuentra toda la logica visual para el calendario
    // Inicializar FullCalendar
    const calendarEl = document.getElementById("calendar-plugin");
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        locale: "es", // Idioma español
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
        },
        // Eventos de prueba cargados dinámicamente
        events: [
            {
                title: "Estudiar jQuery",
                start: "2025-01-20",
                backgroundColor: "#2563eb",
            },
            {
                title: "Entrega de Proyecto",
                start: "2025-01-25",
                end: "2025-01-27",
                backgroundColor: "#ef4444",
            },
        ],
        // Acción al hacer clic en un día
        dateClick: function (info) {
            const titulo = prompt("Nuevo evento para el " + info.dateStr + ":");
            if (titulo) {
                calendar.addEvent({
                    title: titulo,
                    start: info.dateStr,
                    allDay: true,
                });
            }
        },
    });

    calendar.render();
    //---------------------------------------------------------------------------------------------------------------------------
    // funcion para manejar el comportamiento responsive del menu
    function checkResponsive() {
        if ($(window).width() >= 768) {
            $navMenuWrapper
                .removeClass("hidden opacity-0 -translate-y-2 scale-95 absolute w-full shadow-xl")
                .addClass("flex opacity-100 translate-y-0 scale-100");
        } else {
            if ($toggleButton.attr("aria-expanded") === "false") {
                $navMenuWrapper
                    .addClass("hidden opacity-0 -translate-y-2 scale-95")
                    .removeClass("flex opacity-100 translate-y-0 scale-100");
            }
        }
    }

    // evento click para el toggle del menu en movil
    $toggleButton.on("click", function () {
        const isExpanded = $(this).attr("aria-expanded") === "true";

        if (!isExpanded) {
            // Abrir menú
            $navMenuWrapper
                .removeClass("hidden")
                .addClass("absolute top-16 left-0 w-full bg-white flex flex-col p-6 shadow-2xl z-50");

            requestAnimationFrame(() => {
                $navMenuWrapper
                    .addClass("opacity-100 translate-y-0 scale-100")
                    .removeClass("opacity-0 -translate-y-2 scale-95");
            });
            $(this).attr("aria-expanded", "true");
        } else {
            // Cerrar menu
            $navMenuWrapper
                .addClass("opacity-0 -translate-y-2 scale-95")
                .removeClass("opacity-100 translate-y-0 scale-100");

            setTimeout(() => {
                // Solo ocultamos si el boton sigue en estado cerrado
                if ($(this).attr("aria-expanded") === "false") {
                    $navMenuWrapper.addClass("hidden");
                }
            }, 300);
            $(this).attr("aria-expanded", "false");
        }
    });

    // Inicializacion y rezize
    $(window).on("resize", checkResponsive);
    checkResponsive();
});
