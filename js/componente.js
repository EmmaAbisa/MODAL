(function (global) {
  "use strict";

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

    box.querySelector(".modal-cerrar").focus();

    return { cerrar, elemento: overlay };
  }

  function cerrarTodos() {
    document.querySelectorAll(".modal-overlay.activo").forEach((overlay) => {
      overlay.classList.remove("activo");
      setTimeout(() => overlay.remove(), 200);
    });
  }

  global.ModalUI = { mostrar, cerrarTodos };
})(window);

document.getElementById("btn-calcular-edad").addEventListener("click", () => {
  const input = document.getElementById("fecha-nacimiento");
  const errorMsg = document.getElementById("error-fecha");
  const valor = input.value;

  if (!valor) {
    errorMsg.style.display = "block";
    return;
  }
  errorMsg.style.display = "none";

  const nacimiento = new Date(valor);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const noHaCumplidoAun =
    hoy.getMonth() < nacimiento.getMonth() ||
    (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());
  if (noHaCumplidoAun) edad--;

  ModalUI.mostrar({
    tag: "Resultado",
    valor: edad + " años",
    detalle: "Calculado a partir de tu fecha de nacimiento",
    botones: [{ texto: "Aceptar", tipo: "primario" }]
  });
});

document.getElementById("btn-eliminar").addEventListener("click", () => {
  ModalUI.mostrar({
    titulo: "¿Eliminar tu cuenta?",
    cuerpo: "Esta acción no se puede deshacer. Perderás todo tu historial.",
    botones: [
      { texto: "Cancelar", tipo: "secundario" },
      {
        texto: "Sí, eliminar",
        tipo: "peligro",
        onClick: () => {
          ModalUI.mostrar({
            titulo: "Cuenta eliminada",
            cuerpo: "Tu cuenta se eliminó correctamente (simulado)."
          });
        }
      }
    ]
  });
});

document.getElementById("btn-info").addEventListener("click", () => {
  ModalUI.mostrar({
    tag: "Novedades",
    titulo: "Nueva versión disponible",
    cuerpo:
      "<ul style='text-align:left; padding-left:18px; margin:0;'>" +
      "<li>Soporte para modo oscuro</li>" +
      "<li>Modal más rápido en móviles</li>" +
      "<li>Corrección de errores menores</li>" +
      "</ul>",
    botones: [{ texto: "Entendido", tipo: "primario" }]
  });
});
