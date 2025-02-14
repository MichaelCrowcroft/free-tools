import { LitElement, html, css, unsafeCSS } from 'lit';
import styles from '../styles/output.css';

class CalculatorContainer extends LitElement {
    static styles = css`
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:weight@400;800&display=swap');
        :host {
          font-family: 'Source Sans Pro', sans-serif;
        }
        ${unsafeCSS(styles)};
    `;

    static properties = {
        heading: { type: String },
    };

    render() {
        return html`
            <div class="min-h-screen bg-white border-solid">
                <main class="max-w-6xl mx-auto px-4 py-8">
                    <div class="bg-[#012939] rounded-t-xs p-6">
                        <h2 class="text-white text-4xl font-black text-center tracking-tight">
                            ${this.heading}
                        </h2>
                    </div>

                    <slot></slot>

                </main>
            </div>
        `;
    }
}

customElements.define('calculator-container', CalculatorContainer);