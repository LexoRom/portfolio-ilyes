/**
 * Fenêtres modales natives (<dialog>) : détails de projet et aperçu plein écran.
 * Pilotage par attributs : data-dialog-open, data-dialog-close, data-lightbox.
 */
(() => {
    "use strict";

    if (typeof HTMLDialogElement === "undefined") return;

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    /** Ouvre la modale d'identifiant `id` et mémorise l'élément déclencheur. */
    function openDialog(id, trigger) {
        const dialog = document.getElementById(id);
        if (!(dialog instanceof HTMLDialogElement)) return;
        dialog.returnTrigger = trigger;
        dialog.showModal();
    }

    /** Ferme la modale et rend le focus à l'élément qui l'avait ouverte. */
    function closeDialog(dialog) {
        dialog.close();
    }

    document.addEventListener("click", (event) => {
        const openButton = event.target.closest("[data-dialog-open]");
        if (openButton) {
            openDialog(openButton.dataset.dialogOpen, openButton);
            return;
        }

        const closeButton = event.target.closest("[data-dialog-close]");
        if (closeButton) {
            closeDialog(closeButton.closest("dialog"));
            return;
        }

        const lightboxTrigger = event.target.closest("[data-lightbox]");
        if (lightboxTrigger && lightbox && lightboxImg) {
            lightboxImg.src = lightboxTrigger.dataset.lightbox;
            lightboxImg.alt = lightboxTrigger.dataset.lightboxAlt || "";
            lightbox.returnTrigger = lightboxTrigger;
            lightbox.showModal();
            return;
        }

        // Clic sur le fond (backdrop) ou sur l'image de l'aperçu : fermeture.
        if (event.target instanceof HTMLDialogElement) {
            closeDialog(event.target);
        } else if (event.target === lightboxImg) {
            closeDialog(lightbox);
        }
    });

    document.querySelectorAll("dialog").forEach((dialog) => {
        dialog.addEventListener("close", () => {
            if (dialog.returnTrigger instanceof HTMLElement) dialog.returnTrigger.focus();
        });
    });
})();
