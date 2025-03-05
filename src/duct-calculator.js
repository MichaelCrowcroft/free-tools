// FILE: /src/duct-calculator.js
import { LitElement, html, css, unsafeCSS } from 'lit';
import styles from './styles/output.css';

import './components/calculator-container.js';

/**
 * A simple duct sizing calculator in the same style as hvac-load-calculator.js.
 * Automatically updates results whenever inputs change (no "Calculate" button needed).
 */
class DuctCalculator extends LitElement {
  static styles = css`
    :host {
      font-family: 'Source Sans Pro', sans-serif;
    }
    ${unsafeCSS(styles)};
  `;

  static properties = {
    // Example properties you might need for a duct sizing approach:
    availableStaticPressure: { type: Number }, // (in.wc)
    totalEffectiveLength: { type: Number },    // (ft)
    systemCFM: { type: Number },              // total airflow in CFM
    frictionRate: { type: Number },           // (in.wc per 100 ft)
  };

  constructor() {
    super();
    // Default example values
    this.availableStaticPressure = 0.5;
    this.totalEffectiveLength = 150;
    this.systemCFM = 800;
    this.frictionRate = 0.05; // typical default friction rate
  }

  /**
   * Handle input changes, converting numeric fields to numbers so we can do math right away.
   */
  _handleInputChange(e) {
    const field = e.target.name;
    this[field] = Number(e.target.value);
  }

  /**
   * Demonstration: automatically compute friction rate if we have data for ASP and TEL.
   * If you want the user to enter frictionRate directly, you can skip computing it here.
   *
   * This example simply re-derives frictionRate from the formula:
   *   frictionRate = (availableStaticPressure * 100) / totalEffectiveLength
   * ... if you want that dynamic. If you'd rather let frictionRate be user input,
   * remove or adjust this logic.
   */
  get computedFrictionRate() {
    if (this.totalEffectiveLength > 0) {
      return ((this.availableStaticPressure * 100) / this.totalEffectiveLength).toFixed(3);
    }
    return 0;
  }

  /**
   * Example placeholder formula for recommended round duct diameter given a desired CFM
   * and friction approach. Real calculations are more nuanced. Adjust as needed.
   *
   * For example, a simplified approach might be:
   *   diameter = sqrt( (4 * systemCFM) / (π * velocity) )
   *   where velocity is derived from friction or a standard velocity chart.
   */
  get recommendedDiameter() {
    // We’ll do a simple, contrived formula just to show the result changes:
    // e.g. recommended diameter might scale with sqrt(CFM).
    if (this.systemCFM > 0) {
      const diameter = Math.sqrt(this.systemCFM / 10); // purely illustrative
      return diameter.toFixed(2);
    }
    return 0;
  }

  render() {
    return html`
      <calculator-container heading="Simple Duct Sizing Calculator">
        <!-- Calculator body, in the same style as hvac-load-calculator -->
        <div class="bg-[#f3f3f3] rounded-b-xs shadow-lg p-8 border border-[#99a9b0]">
          <div class="grid md:grid-cols-2 gap-12">
            <!-- Left Side: Input fields -->
            <div class="space-y-6">

              <!-- Available Static Pressure -->
              <div class="space-y-2">
                <label class="flex items-center text-dark-blue font-medium">
                  Available Static Pressure (in.wc):
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="availableStaticPressure"
                  .value="${this.availableStaticPressure}"
                  @input="${this._handleInputChange}"
                  class="w-full px-4 py-4 bg-white border rounded-sm"
                />
              </div>

              <!-- Total Effective Length -->
              <div class="space-y-2">
                <label class="flex items-center text-dark-blue font-medium">
                  Total Effective Length (ft):
                </label>
                <input
                  type="number"
                  name="totalEffectiveLength"
                  .value="${this.totalEffectiveLength}"
                  @input="${this._handleInputChange}"
                  class="w-full px-4 py-4 bg-white border rounded-sm"
                />
              </div>

              <!-- System CFM -->
              <div class="space-y-2">
                <label class="flex items-center text-dark-blue font-medium">
                  System CFM:
                </label>
                <input
                  type="number"
                  name="systemCFM"
                  .value="${this.systemCFM}"
                  @input="${this._handleInputChange}"
                  class="w-full px-4 py-4 bg-white border rounded-sm"
                />
              </div>

              <!-- (Optional) Manual friction rate entry:
                   If you'd rather let the user type this directly,
                   un-comment and use in place of the computedFrictionRate below. -->

              <div class="space-y-2">
                <label class="flex items-center text-dark-blue font-medium">
                  Friction Rate (in.wc per 100ft):
                </label>
                <input
                  type="number"
                  step="0.001"
                  name="frictionRate"
                  .value="${this.frictionRate}"
                  @input="${this._handleInputChange}"
                  class="w-full px-4 py-4 bg-white border rounded-sm"
                />
              </div>

            </div>

            <!-- Right Side: Results Display -->
            <div>
              <h3 class="text-dark-blue font-bold text-2xl mb-4">
                Duct Calculation Results
              </h3>

              <!-- Card similar to hvac load calculator -->
              <div class="bg-dark-blue p-8 rounded-sm">
                <!-- Display friction rate -->
                <div class="text-white mb-2">
                  <span class="font-black text-xl">Friction Rate:</span>
                  <span class="ml-2 text-3xl font-black">
                    ${this.computedFrictionRate} <span class="text-base">in.wc/100ft</span>
                  </span>
                </div>
                <!-- Display recommended diameter (placeholder formula) -->
                <div class="text-white mt-4">
                  <span class="font-black text-xl">Recommended Duct Diameter:</span>
                  <div class="text-4xl font-black mt-2">
                    ${this.recommendedDiameter}"
                  </div>
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
              This tool provides a rough duct sizing approach based on total
              effective length, available static pressure, and CFM.
            </p>
            <ul class="list-disc list-inside space-y-2">
              <li>
                <strong>Friction Rate:</strong> Computed as
                <em>(Available Static Pressure × 100) ÷ TEL</em> to show how
                much static pressure drop is allowed per 100 feet of duct.
              </li>
              <li>
                <strong>Recommended Diameter:</strong> Example placeholder formula
                to give a rough idea of duct size for the system CFM.
              </li>
            </ul>
            <p>
              For real-world accuracy, always refer to
              <em>ACCA Manual D</em> or other official guidelines, factoring
              in fittings, material type, velocity, and pressure drops through
              filters, coils, etc.
            </p>
          </div>
        </div>
      </calculator-container>
    `;
  }
}

customElements.define('duct-calculator', DuctCalculator);
