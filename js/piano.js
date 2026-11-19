/**
 * Effet « touches de piano » : cinq colonnes réagissent au survol et au clic
 * sur les zones vides de la page. Désactivé sur écran tactile et si
 * l'utilisateur préfère moins d'animations.
 */
(() => {
    "use strict";

    const KEY_COLORS = ["#ff4655", "#ffd700", "#00fa9a", "#1e90ff", "#a855f7"];
    const INTERACTIVE_SELECTOR =
        "a, button, input, dialog, .card, .site-header, .contact__panel, .hero__photo, .cv__preview, .review, .timeline";
    const MAX_PARTICLES = 18;

    const piano = document.getElementById("piano");
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!piano || !canHover || reducedMotion) return;

    const keys = [...piano.querySelectorAll(".piano__key")];

    const getKeyIndex = (clientX) =>
        Math.min(keys.length - 1, Math.floor((clientX / window.innerWidth) * keys.length));

    /** Crée une particule colorée qui s'éloigne puis disparaît. */
    function spawnParticle(x, y, color) {
        const particle = document.createElement("div");
        const size = Math.random() * 10 + 3;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 240 + 40;

        particle.className = "particle";
        Object.assign(particle.style, {
            left: `${x}px`,
            top: `${y}px`,
            width: `${size}px`,
            height: `${size}px`,
            color,
            backgroundColor: color,
        });
        document.body.appendChild(particle);

        const animation = particle.animate(
            [
                { transform: "translate(-50%, -50%) scale(0.3)", opacity: 1 },
                {
                    transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(1.4)`,
                    opacity: 0,
                },
            ],
            { duration: Math.random() * 600 + 600, easing: "cubic-bezier(0.15, 1, 0.3, 1)" }
        );
        animation.addEventListener("finish", () => particle.remove());
    }

    window.addEventListener("pointermove", (event) => {
        const overContent = event.target.closest(INTERACTIVE_SELECTOR);
        const active = overContent ? -1 : getKeyIndex(event.clientX);
        keys.forEach((key, index) => key.classList.toggle("is-hover", index === active));
    });

    window.addEventListener("pointerdown", (event) => {
        if (event.pointerType !== "mouse" || event.target.closest(INTERACTIVE_SELECTOR)) return;

        const index = getKeyIndex(event.clientX);
        const key = keys[index];
        key.classList.remove("is-flash");
        void key.offsetWidth; // relance l'animation CSS
        key.classList.add("is-flash");

        const count = Math.floor(Math.random() * 6) + MAX_PARTICLES - 6;
        for (let i = 0; i < count; i += 1) {
            spawnParticle(event.clientX, event.clientY, KEY_COLORS[index]);
        }
    });
})();
