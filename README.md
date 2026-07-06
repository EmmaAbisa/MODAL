# ModalUI 🪟
![alt text](image-9.png)

## ¿Que es?
Componente visual reutilizable hecho en **HTML + CSS + JavaScript** . Es una ventana modal (esa ventanita que aparece encima de la página con fondo oscuro) que puedes llamar las veces que quieras, con contenido totalmente distinto cada vez.

## ¿Qué problema resuelve?

Cuando quieres mostrarle algo importante al usuario (un resultado, una confirmación, un aviso) sin mandarlo a otra página ni desordenar el layout, normalmente terminas escribiendo un modal distinto para cada caso, copiando y pegando HTML y CSS una y otra vez.

Con `ModalUI` eso ya no pasa: es **un solo componente** al que le mandas los datos que quieras (título, texto, número grande, botones con su propia lógica) y él arma la ventana, la muestra, y la destruye solo cuando se cierra. Un modal, mil usos.

---

## 📦 Instalación

Solo necesitas copiar dos archivos a tu proyecto: el CSS y el JS del componente.

```
tu-proyecto/
├── index.html
├── css/
│   └── componente.css    este archivo
└── js/
    └── componente.js     copia este archivo
```

Luego, en tu HTML, enlaza el CSS en el `<head>` y el JS antes de cerrar `</body>`:

```html
<head>
  <link rel="stylesheet" href="css/componente.css">
</head>

<body>
  <!-- tu contenido -->

  <script src="js/componente.js"></script>
</body>
```

Eso es todo, ya tienes disponible el objeto global `ModalUI` en tu página.

---

## 🚀 Uso

El componente expone una sola función principal: `ModalUI.mostrar(opciones)`. Le mandas un objeto con lo que quieras que aparezca dentro del modal.

### Ejemplo 1 — Mostrar un resultado (número grande)

Útil para calculadoras, resultados, totales, etc.

```js
ModalUI.mostrar({
  tag: "Resultado",
  valor: "24 años",
  detalle: "Calculado a partir de tu fecha de nacimiento",
  botones: [{ texto: "Aceptar", tipo: "primario" }]
});
```

### Ejemplo 2 — Confirmación con dos botones y lógica propia

Cada botón puede tener su propia función `onClick`.

```js
ModalUI.mostrar({
  titulo: "¿Eliminar tu cuenta?",
  cuerpo: "Esta acción no se puede deshacer. Perderás todo tu historial.",
  botones: [
    { texto: "Cancelar", tipo: "secundario" },
    {
      texto: "Sí, eliminar",
      tipo: "peligro",
      onClick: () => {
        // aquí va tu lógica real (llamada a API, borrar datos, etc.)
        console.log("Cuenta eliminada");
      }
    }
  ]
});
```

### Ejemplo 3 — Contenido libre en HTML (listas, párrafos, lo que sea)

```js
ModalUI.mostrar({
  tag: "Novedades",
  titulo: "Nueva versión disponible",
  cuerpo: `
    <ul style="text-align:left; padding-left:18px;">
      <li>Soporte para modo oscuro</li>
      <li>Modal más rápido en móviles</li>
      <li>Corrección de errores menores</li>
    </ul>
  `,
  botones: [{ texto: "Entendido", tipo: "primario" }]
});
```

### Todas las opciones disponibles

```js
ModalUI.mostrar({
  tag: "texto pequeño arriba",           // opcional
  valor: "texto o número grande",        // opcional
  titulo: "título del modal",            // opcional
  detalle: "texto chico bajo el valor",  // opcional
  cuerpo: "texto o HTML libre",          // opcional
  botones: [                             // opcional
    { texto: "...", tipo: "primario|secundario|peligro", onClick: () => {} }
  ],
  cerrarConOverlay: true,   // cerrar al hacer click afuera (default: true)
  cerrarConEsc: true,       // cerrar con tecla ESC (default: true)
  alCerrar: () => {}        // callback cuando se cierra el modal
});
```

Y si necesitas cerrar todos los modales abiertos desde código:

```js
ModalUI.cerrarTodos();
```

---

##  Capturas de pantalla

![alt text](image-10.png)

![alt text](image-11.png)

![alt text](image-12.png)

![alt text](image-13.png)

![alt text](image-14.png)

![alt text](image-15.png)

---

##  Links

- GitHub Pages: https://emmaabisa.github.io/MODAL/

---

##  Tecnologías

- HTML5
- CSS3 
- JavaScript 
