import { LitElement, html, css, unsafeCSS } from 'lit';
import styles from './styles/output.css'

class HelloWorld extends LitElement {
    static styles = css`${unsafeCSS(styles)}`;

    render() {
        return html`<div class="font-bold bg-amber-100">Hello, world!</div>`;
    }
}

customElements.define('hello-world', HelloWorld);