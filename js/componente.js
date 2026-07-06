
(function (global) {
  "use strict";

  /**
   * Crea y muestra un modal en pantalla.
   * @param {Object} opciones
   * @param {string} [opciones.tag]  Etiqueta pequeña arriba (de RESULTADO).
   * @param {string|number} [opciones.valor]  Valor grande destacado (de 24 años).
   * @param {string} [opciones.titulo]  Título tipo confirmación/infomarcioon.
   * @param {string} [opciones.detalle]  Texto pequeño bajo el valor.
   * @param {string} [opciones.cuerpo] Texto/HTML de cuerpo genérico(uno de ejemplo mio).
   * @param {Array}  [opciones.botones]  [{texto, tipo, onClick, cerrarAlHacerClick}]
   * @param {boolean} [opciones.cerrarConOverlay=true]  Cerrar al hacer clic fuera.
   * @param {boolean} [opciones.cerrarConEsc=true] ///////////´++' Cerrar con tecla ESC(Integracion esta ).
   * @param {Function} [opciones.alCerrar]  Callback ejecutado al cerrar.
   * @returns {{cerrar: Function, elemento: HTMLElement}}
   */
  function mostrar(opciones) {
    opciones = opciones || {};

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay modal-ui";

    const box = document.createElement("div");
    box.className = "modal-box";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    if (opciones.titulo) box.setAttribute("aria-label", opciones.titulo);

    let html = '<button type="button" class="modal-cerrar" aria-label="Cerrar">&times;</button>';

    if (opciones.tag) {
      html += `<p class="tag">${opciones.tag}</p>`;
    }
    if (opciones.valor !== undefined && opciones.valor !== null) {
      html += `<p class="modal-valor">${opciones.valor}</p>`;
    }
    if (opciones.titulo) {
      html += `<h3 class="modal-titulo">${opciones.titulo}</h3>`;
    }
    if (opciones.detalle) {
      html += `<p class="detalle">${opciones.detalle}</p>`;
    }
    if (opciones.cuerpo) {
      html += `<div class="modal-cuerpo">${opciones.cuerpo}</div>`;
    }
    if (Array.isArray(opciones.botones) && opciones.botones.length) {
      html += '<div class="modal-acciones">';
      opciones.botones.forEach((btn, i) => {
        const tipo = btn.tipo || "primario";
        html += `<button type="button" class="modal-btn ${tipo}" data-mui-btn-index="${i}">${btn.texto}</button>`;
      });
      html += "</div>";
    }

    box.innerHTML = html;
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // Forzar reflow antes de animar la entrada (transición vía clase "activo", ese codiog reutilice(REVISAA))
    requestAnimationFrame(() => overlay.classList.add("activo"));

    function onKeyDown(e) {
      if (e.key === "Escape") cerrar();
    }

    function cerrar() {
      overlay.classList.remove("activo");
      document.removeEventListener("keydown", onKeyDown);
      setTimeout(() => overlay.remove(), 200);
      if (typeof opciones.alCerrar === "function") opciones.alCerrar();
    }

    box.querySelector(".modal-cerrar").addEventListener("click", cerrar);

    if (opciones.cerrarConOverlay !== false) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) cerrar();
      });
    }

    if (opciones.cerrarConEsc !== false) {
      document.addEventListener("keydown", onKeyDown);
    }

    if (Array.isArray(opciones.botones)) {
      opciones.botones.forEach((btn, i) => {
        const el = box.querySelector(`[data-mui-btn-index="${i}"]`);
        el.addEventListener("click", () => {
          if (typeof btn.onClick === "function") btn.onClick();
          if (btn.cerrarAlHacerClick !== false) cerrar();
        });
      });
    }

    // Accesibilidad: en este es foco inicial dentro del modal
    box.querySelector(".modal-cerrar").focus();

    return { cerrar, elemento: overlay };
  }

  /** Cierra todos los modales activos en pantalla. */
  function cerrarTodos() {
    document.querySelectorAll(".modal-overlay.activo").forEach((overlay) => {
      overlay.classList.remove("activo");
      setTimeout(() => overlay.remove(), 200);
    });
  }

  global.ModalUI = { mostrar, cerrarTodos };
})(window);