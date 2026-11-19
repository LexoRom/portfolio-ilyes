/**
 * Comportements généraux : menu mobile, lien actif, apparition au scroll,
 * copie de l'email et année du pied de page.
 */
(() => {
    "use strict";

    const MOBILE_MENU_CLASS = "is-open";
    const REVEAL_CLASS = "is-visible";

    /** Menu de navigation mobile (bouton + liste). */
    function initMobileMenu() {
        const toggle = document.querySelector(".nav__toggle");
        const list = document.getElementById("nav-list");
        if (!toggle || !list) return;

        const setOpen = (isOpen) => {
            list.classList.toggle(MOBILE_MENU_CLASS, isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
        };

        toggle.addEventListener("click", () => {
            setOpen(toggle.getAttribute("aria-expanded") !== "true");
        });

        list.addEventListener("click", (event) => {
            if (event.target.closest("a")) setOpen(false);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
                setOpen(false);
                toggle.focus();
            }
        });
    }

    /** Marque le lien de navigation correspondant à la section visible. */
    function initActiveLink() {
        const links = [...document.querySelectorAll(".nav__link")];
        const sections = links
            .map((link) => document.querySelector(link.getAttribute("href")))
            .filter(Boolean);
        if (!sections.length || !("IntersectionObserver" in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    links.forEach((link) => {
                        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
                        if (isCurrent) {
                            link.setAttribute("aria-current", "true");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );

        sections.forEach((section) => observer.observe(section));
    }

    /** Révèle les blocs `.reveal` une seule fois, à leur entrée à l'écran. */
    function initReveal() {
        const items = document.querySelectorAll(".reveal");
        if (!("IntersectionObserver" in window)) {
            items.forEach((item) => item.classList.add(REVEAL_CLASS));
            return;
        }

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add(REVEAL_CLASS);
                    obs.unobserve(entry.target);
                });
            },
            { threshold: 0.1 }
        );

        items.forEach((item) => observer.observe(item));
    }

    /** Copie l'adresse email dans le presse-papiers et l'annonce aux lecteurs d'écran. */
    function initCopyEmail() {
        const button = document.getElementById("copy-email");
        const email = document.getElementById("contact-email");
        const status = document.getElementById("copy-status");
        if (!button || !email || !status) return;

        button.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(email.textContent.trim());
                status.textContent = "Adresse copiée dans le presse-papiers.";
            } catch {
                status.textContent = "Copie impossible : sélectionnez l'adresse manuellement.";
            }
            window.setTimeout(() => {
                status.textContent = "";
            }, 3000);
        });
    }

    /** Met à jour l'année du pied de page. */
    function initYear() {
        const year = document.getElementById("year");
        if (year) year.textContent = String(new Date().getFullYear());
    }

    initMobileMenu();
    initActiveLink();
    initReveal();
    initCopyEmail();
    initYear();
})();
