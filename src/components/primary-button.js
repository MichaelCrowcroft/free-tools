import { LitElement, html, css, unsafeCSS } from 'lit';
import styles from '../styles/output.css';

class PrimaryButton extends LitElement {
    static styles = css`
        :host {
          font-family: 'Source Sans Pro', sans-serif;
        }
        ${unsafeCSS(styles)};
    `;

    render() {
        return html`
            <button
                type="submit"
                class="bg-[#a0f92d] text-[#012939] font-black py-3 px-6 rounded-sm w-full hover:cursor-pointer hover:bg-[#84ea00] transition ease-in-out"
            >
                <slot></slot>
            </button>
        `;
    }
}

customElements.define('primary-button', PrimaryButton);