import { LitElement, html, css, unsafeCSS } from 'lit';
import styles from '../styles/output.css';

class CTASection extends LitElement {
    static styles = css`
        :host {
          font-family: 'Source Sans Pro', sans-serif;
        }
        ${unsafeCSS(styles)};
    `;

    render() {
        return html`
            todo
        `;
    }
}

customElements.define('cta-section', CTASection);