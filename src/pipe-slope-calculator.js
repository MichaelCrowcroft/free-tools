import { LitElement, html, css, unsafeCSS } from 'lit';
import styles from './styles/output.css';

import './components/calculator-container.js';

class PipeSlopeCalculator extends LitElement {
  static styles = css`
    :host {
      font-family: 'Source Sans Pro', sans-serif;
    }
    ${unsafeCSS(styles)};
  `;

  static properties = {
    pipeFall: { type: Number },
    pipeLength: { type: Number },
  };

  constructor() {
    super();
    this.pipeFall = '';
    this.pipeLength = '';
  }

  /**
   * Handle input changes and store numeric values.
   */
  _handleInputChange(e) {
    const field = e.target.name;
    this[field] = Number(e.target.value);
  }

  /**
   * Compute the pipe slope (in %) based on:
   *   Slope = (Pipe Fall / Pipe Length) * 100
   */
  get pipeSlope() {
    // Guard against division by zero or empty input
    if (this.pipeFall > 0 && this.pipeLength > 0) {
      return ((this.pipeFall / this.pipeLength) * 100).toFixed(2);
    }
    return null;
  }

  render() {
    return html`
      <calculator-container heading="Pipe Slope Calculator">
        <!-- Calculator Body -->
        <div class="bg-[#f3f3f3] rounded-b-xs shadow-lg p-8 border border-[#99a9b0]">
          <div class="grid md:grid-cols-2 gap-12">
            <!-- Left Column: Inputs -->
            <div class="space-y-6">
              <!-- Pipe Fall Input -->
              <div class="space-y-2">
                <label class="flex items-center text-dark-blue font-medium">
                  Pipe Fall (ft):
                </label>
                <div class="flex items-center bg-white rounded-sm border p-2">
                  <input
                    type="number"
                    name="pipeFall"
                    .value="${this.pipeFall}"
                    @input="${this._handleInputChange}"
                    class="w-full pl-3 pr-4 py-2 focus:outline-none focus:ring-0"
                    placeholder="0"
                  />
                </div>
              </div>

              <!-- Pipe Length Input -->
              <div class="space-y-2">
                <label class="flex items-center text-dark-blue font-medium">
                  Pipe Length (ft):
                </label>
                <div class="flex items-center bg-white rounded-sm border p-2">
                  <input
                    type="number"
                    name="pipeLength"
                    .value="${this.pipeLength}"
                    @input="${this._handleInputChange}"
                    class="w-full pl-3 pr-4 py-2 focus:outline-none focus:ring-0"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <!-- Right Column: Results -->
            <div>
              <h3 class="text-dark-blue font-bold text-2xl mb-4">
                Pipe Slope:
              </h3>
              <div class="bg-dark-blue p-8 rounded-sm">
                <div class="text-5xl font-black text-white mb-4">
                  ${this.pipeSlope
                    ? html`
                      <span>${this.pipeSlope}%</span>
                    `
                    : html`
                      <span>0%</span>
                    `}
                  <!-- Decorative line / image, optional -->
                  <img
                    src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTg2IiBoZWlnaHQ9IjExIiB2aWV3Qm94PSIwIDAgMTg2IDExIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89J25vbmUnPgo8cGF0aCBkPSJNMy40NzU5OCA1LjU3MDQ5QzQxLjYwODUgNC41NjQyNCA3OS44MzE4IDIuNDY5NyAxMTguMDIyIDMuNzMyMThDMTM1Ljc2NyA0LjMxODc4IDE1My40ODggNC4zMDgzOSAxNzEuMjI3IDQuNjUxMTlDMTcyLjkyMyA0LjY4Mzk4IDE3OC4wNTUgNC44MDI0NCAxODAuMjYyIDQuOTY4MzVDMTgxLjIzOCA1LjA0MTY4IDE4My42OCA0LjY0NzU0IDE4My4xNTEgNS45NDkyMkMxODMuMDU5IDYuMTc3ODggMTc0LjQwMSA4LjA3MDg3IDE3NS41MjMgOC4wMjE4NyIgc3Ryb2tlPSIjODRFQTAwIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K"
                    alt="decorative line"
                  />
                </div>
                <div class="text-white">
                  <p class="text-xl font-medium mb-0">
                    ${this.pipeSlope ? `${this.pipeSlope}% slope` : `N/A`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Explanation Section -->
        <div class="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-xl font-black text-dark-blue mb-4">
            How This Calculation Works
          </h2>
          <div class="space-y-4 text-gray-600">
            <p>
              The formula for Pipe Slope (PS) is:
              <strong>PS = (Pipe Fall ÷ Pipe Length) × 100</strong>,
              where both fall and length are in the same units (ft, m, etc.).
            </p>
            <p>
              For example, if the pipe fall is 25 ft and the pipe length is 97 ft:
              <br />
              <strong>PS = (25 ÷ 97) × 100 ≈ 25.77%</strong>
            </p>
            <p>
              If either the pipe fall or pipe length is left blank (or zero),
              the slope will not be computed.
            </p>
          </div>
        </div>
      </calculator-container>
    `;
  }
}

customElements.define('pipe-slope-calculator', PipeSlopeCalculator);
