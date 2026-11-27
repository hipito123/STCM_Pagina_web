(function ($) {
    "use strict";

    // Cargador inicial: oculta el indicador cuando el documento ya está listo.
    const hideSpinner = function () {
        window.setTimeout(function () {
            $("#spinner").removeClass("show");
        }, 1);
    };
    hideSpinner();

    // Animaciones de entrada: activa los elementos configurados con WOW.js.
    if (typeof WOW !== "undefined") {
        new WOW().init();
    }

    // Navegación durante el desplazamiento: añade profundidad y controla el botón de retorno.
    const $window = $(window);
    const $navbar = $(".sticky-top");
    const $backToTop = $(".back-to-top");

    $window.on("scroll", function () {
        const hasScrolled = $window.scrollTop() > 300;
        $navbar.toggleClass("shadow-sm", hasScrolled);
        hasScrolled ? $backToTop.fadeIn("slow") : $backToTop.fadeOut("slow");
    });

    $backToTop.on("click", function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 1500, "swing");
    });

    // Mascota flotante Lottie en la esquina inferior derecha
    const initMascotWidget = function () {
        if (document.querySelector(".stcm-mascot-widget")) {
            return;
        }

        const widget = document.createElement("aside");
        widget.className = "stcm-mascot-widget";
        widget.setAttribute("aria-label", "Asistente de contacto STCM");

        const bubble = document.createElement("div");
        bubble.className = "stcm-mascot-bubble";
        bubble.id = "stcmMascotBubble";

        const closeBtn = document.createElement("button");
        closeBtn.type = "button";
        closeBtn.className = "stcm-mascot-close";
        closeBtn.setAttribute("aria-label", "Ocultar mensaje de contacto");
        closeBtn.innerHTML = "&times;";

        const text = document.createElement("p");
        text.className = "stcm-mascot-text";
        text.textContent = "¡Contáctanos!";

        const cta = document.createElement("a");
        cta.className = "stcm-mascot-cta";
        cta.href = "contact.html";
        cta.innerHTML = '<i class="fa fa-envelope" aria-hidden="true"></i><span>Contactar</span>';

        const isContactPage = /(?:^|\/)contact\.html$/i.test(window.location.pathname);
        if (isContactPage) {
            cta.href = "#contactForm";
            cta.addEventListener("click", function (event) {
                const form = document.getElementById("contactForm");
                if (form) {
                    event.preventDefault();
                    form.scrollIntoView({ behavior: "smooth", block: "start" });
                    const firstInput = document.getElementById("nombres");
                    if (firstInput) {
                        firstInput.focus({ preventScroll: true });
                    }
                }
            });
        }

        bubble.appendChild(closeBtn);
        bubble.appendChild(text);
        bubble.appendChild(cta);

        const avatarBtn = document.createElement("button");
        avatarBtn.type = "button";
        avatarBtn.className = "stcm-mascot-avatar";
        avatarBtn.setAttribute("aria-label", "Mostrar u ocultar mensaje de contacto");
        avatarBtn.setAttribute("aria-expanded", "true");
        avatarBtn.setAttribute("aria-controls", "stcmMascotBubble");

        closeBtn.addEventListener("click", function () {
            bubble.classList.add("is-collapsed");
            avatarBtn.setAttribute("aria-expanded", "false");
        });

        avatarBtn.addEventListener("click", function () {
            const isCollapsed = bubble.classList.toggle("is-collapsed");
            avatarBtn.setAttribute("aria-expanded", String(!isCollapsed));
        });

        widget.appendChild(bubble);
        widget.appendChild(avatarBtn);
        document.body.appendChild(widget);

        const loadLottieAnimation = function () {
            if (typeof window.lottie === "undefined") {
                return;
            }
            window.lottie.loadAnimation({
                container: avatarBtn,
                renderer: "svg",
                loop: true,
                autoplay: true,
                path: "assets/perrito_saludo_natural_lottie.json",
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid meet"
                }
            });
        };

        if (typeof window.lottie !== "undefined") {
            loadLottieAnimation();
        } else {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
            script.async = true;
            script.onload = loadLottieAnimation;
            document.body.appendChild(script);
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMascotWidget);
    } else {
        initMascotWidget();
    }
})(jQuery);
