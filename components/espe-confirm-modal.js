import { LitElement, html, css } from 'lit';

export class EspeConfirmModal extends LitElement {

    static get properties() {
        return {
            isOpen: { type: Boolean },
            title: { type: String },
            message: { type: String },
            confirmText: { type: String },
            cancelText: { type: String }
        };
    }

    constructor() {
        super();
        this.isOpen = false;
        this.title = 'Confirmación';
        this.message = '¿Estás seguro de realizar esta acción?';
        this.confirmText = 'Confirmar';
        this.cancelText = 'Cancelar';
    }


    static styles = css`
    :host {
        display: block;
        font-family: 'Arial', 'Roboto', sans-serif;
        --espe-primary-blue: #003C71;
        --espe-spacing-8: 8px;
        --espe-spacing-16: 16px;
        --espe-spacing-24: 24px;
        --espe-spacing-32: 32px;
    }

    .modal-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: var(--espe-spacing-16);
        box-sizing: border-box;
        opacity: 0;
        transition: opacity 0.3s ease-out;
    }

    .modal-overlay.is-open {
        display: flex;
        opacity: 1;
    }

    .modal-content {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        width: 90%;
        max-width: 500px;
        overflow: hidden;
        transform: translateY(-50px);
        opacity: 0;
        transition: transform 0.3s ease-out, opacity 0.3s ease-out;
    }

    .modal-overlay.is-open .modal-content {
        transform: translateY(0);
        opacity: 1;
    }

    .modal-header {
        background-color: var(--espe-primary-blue);
        color: #ffffff;
        padding: var(--espe-spacing-16) var(--espe-spacing-24);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .modal-header img {
        height: 30px;
        margin-right: var(--espe-spacing-16);
    }

    .modal-header h3 {
        margin: 0;
        font-size: 1.2em;
        flex-grow: 1;
    }

    .modal-body {
        padding: var(--espe-spacing-24);
        color: #333333;
        line-height: 1.6;
        text-align: center;
    }

    .modal-actions {
        padding: var(--espe-spacing-16) var(--espe-spacing-24);
        display: flex;
        justify-content: flex-end;
        gap: var(--espe-spacing-16);
        border-top: 1px solid #eeeeee;
    }

    button {
        padding: var(--espe-spacing-8) var(--espe-spacing-16);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
        transition: background-color 0.2s ease;
        font-family: inherit;
    }

    .confirm-button {
        background-color: var(--espe-primary-blue);
        color: #ffffff;
    }

    .confirm-button:hover {
        background-color: #002e5a;
    }

    .cancel-button {
        background-color: #cccccc;
        color: #333333;
    }

    .cancel-button:hover {
        background-color: #bbbbbb;
    }

    .close-button {
        background: transparent;
        color: #fff;
        font-size: 1.5em;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    .close-button:hover {
        opacity: 0.8;
    }
  `;

    render() {
        if (!this.isOpen) {
            return html``;
        }

        return html`
      <div class="modal-overlay is-open" role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalMessage">
          <div class="modal-content">
              <div class="modal-header">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Logo_ESPEOk.png" alt="Logo ESPE" aria-hidden="true">
                  <h3 id="modalTitle">${this.title}</h3>
                  <button
                      class="close-button"
                      @click="${this._handleCancel}"
                      aria-label="Cerrar modal"
                      tabindex="0"
                  >
                      &times;
                  </button>
              </div>
              <div class="modal-body" id="modalMessage">
                  <p>${this.message}</p>
              </div>
              <div class="modal-actions">
                  <button
                      class="cancel-button"
                      @click="${this._handleCancel}"
                      aria-label="${this.cancelText}"
                      tabindex="0"
                  >
                      ${this.cancelText}
                  </button>
                  <button
                      class="confirm-button"
                      @click="${this._handleConfirm}"
                      aria-label="${this.confirmText}"
                      tabindex="0"
                  >
                      ${this.confirmText}
                  </button>
              </div>
          </div>
      </div>
    `;
    }

    _handleConfirm() {
        const event = new CustomEvent('modal-confirmado', {
            bubbles: true,
            composed: true,
            detail: { action: 'confirmed' }
        });
        this.dispatchEvent(event);
        this.isOpen = false;
    }

    _handleCancel() {
        const event = new CustomEvent('modal-cancelado', {
            bubbles: true,
            composed: true,
            detail: { action: 'canceled' }
        });
        this.dispatchEvent(event);
        this.isOpen = false;
    }

    connectedCallback() {
        super.connectedCallback();
        document.addEventListener('keydown', this._handleKeyDown);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('keydown', this._handleKeyDown);
    }

    _handleKeyDown = (event) => {
        if (this.isOpen && event.key === 'Escape') {
            this._handleCancel();
        }
    };
}

customElements.define('espe-confirm-modal', EspeConfirmModal);