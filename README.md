# Modal de Confirmación Personalizado — LitElement + ESPE

**Nombre:** DARWIN ANDRES TOAPANTA PAEZ  
**Docente:** PAULO CESAR GALARZA SANCHEZ 
---

**Componente:** `<espe-confirm-modal>`  
**Rama:** `tarea2-personalizar-comportamientos`  

---

## 🎯 Objetivo

Personalizar el comportamiento de un Web Component utilizando **LitElement**, integrando:

- Estados dinámicos (@property)
- Temas y estilos alineados al manual de identidad de ESPE
- Eventos personalizados para la comunicación entre componentes
- Buenas prácticas de desarrollo evitando patrones generados por IA

---

## 🧩 Descripción del Componente

`<espe-confirm-modal>` es un componente web reutilizable que muestra un **modal de confirmación**, como pide en la tarea, 
ideal para acciones críticas como eliminar elementos.

El diseño respeta los lineamientos visuales solicitados por le ingeniero dentro de la tarea:  
✅ Azul primario `#003C71`  
✅ Tipografía Roboto/Arial  
✅ Espaciados institucionales  

El componente es **accesible** y **reacciona dinámicamente** a los atributos pasados.

---

## 🛠️ Uso

### HTML
```html
<espe-confirm-modal
  id="myConfirmModal"
  title="Eliminar Elemento"
  message="¿Realmente deseas eliminar este elemento?"
  confirmText="Sí, eliminar"
  cancelText="No, cancelar">
</espe-confirm-modal>

<button id="openModalButton">Abrir Modal</button>
```
---

## Eventos Personalizados
El componente emite eventos personalizados para notificar acciones y permitir la comunicación con otros elementos o la lógica de la aplicación:
modal-confirmado:

- Se dispara cuando el usuario hace clic en el botón de "Confirmar".
- Contiene detail: { action: 'confirmed' }.
- Aplicación de Comunicación Intercomponente: Permite que el componente padre (o cualquier elemento que escuche este evento) ejecute una acción específica tras la confirmación del usuario, desacoplando la lógica del modal de la acción a realizar.

modal-cancelado:

- Se dispara cuando el usuario hace clic en el botón de "Cancelar" o en el botón de cierre (&times;), o presiona la tecla Escape.
- Contiene detail: { action: 'canceled' }.
- Aplicación de Comunicación Intercomponente: Similar a modal-confirmado, permite que la aplicación reaccione a la cancelación por parte del usuario.
