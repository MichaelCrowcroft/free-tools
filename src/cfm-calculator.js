// cfm-calculator.js
import { LitElement, html, css, unsafeCSS } from 'lit';
import styles from './styles/output.css'; // Tailwind output
import './components/calculator-container.js'; // Same container style as hvac-load-calculator

class CfmCalculator extends LitElement {
  static styles = css`
    :host {
      font-family: 'Source Sans Pro', sans-serif;
    }
    ${unsafeCSS(styles)}
  `;

  static properties = {
    floorArea: { type: Number },
    ceilingHeight: { type: Number },
    ach: { type: Number },
  };

  constructor() {
    super();
    this.floorArea = '';
    this.ceilingHeight = '';
    this.ach = '';
  }

  // Update properties on input
  _handleInputChange(e) {
    const { name, value } = e.target;
    this[name] = Number(value);
  }

  // Compute required CFM automatically on each render
  get requiredCFM() {
    const fa = parseFloat(this.floorArea) || 0;
    const ch = parseFloat(this.ceilingHeight) || 0;
    const airChanges = parseFloat(this.ach) || 0;
    const cfm = (fa * ch * airChanges) / 60;
    return Math.round(cfm * 100) / 100;
  }

  render() {
    return html`
      <calculator-container heading="CFM Calculator">
        <div class="bg-[#f3f3f3] rounded-b-xs shadow-lg p-8 border border-[#99a9b0]">
          <div class="grid md:grid-cols-2 gap-12">
            <!-- Calculator Form Fields -->
            <div class="space-y-6">
              <!-- Floor Area -->
              <div class="space-y-2">
                <label class="flex items-center text-dark-blue font-medium">
                  Room Floor Area:
                </label>
                <div class="flex items-center bg-white rounded-sm border p-2">
                  <span class="pl-2 text-gray-500">ft²</span>
                  <input
                    type="number"
                    name="floorArea"
                    .value="${this.floorArea}"
                    @input="${this._handleInputChange}"
                    class="w-full pl-3 pr-4 py-2 focus:outline-none focus:ring-0"
                    placeholder="0"
                  />
                </div>
              </div>

              <!-- Ceiling Height -->
              <div class="space-y-2">
                <label class="flex items-center text-dark-blue font-medium">
                  Ceiling Height:
                </label>
                <div class="flex items-center bg-white rounded-sm border p-2">
                  <span class="pl-2 text-gray-500">ft</span>
                  <input
                    type="number"
                    name="ceilingHeight"
                    .value="${this.ceilingHeight}"
                    @input="${this._handleInputChange}"
                    class="w-full pl-3 pr-4 py-2 focus:outline-none focus:ring-0"
                    placeholder="0"
                  />
                </div>
              </div>

              <!-- Air Changes per Hour -->
              <div class="space-y-2">
                <label class="flex items-center text-dark-blue font-medium">
                  Air Changes per Hour (ACH):
                </label>
                <input
                  type="number"
                  name="ach"
                  .value="${this.ach}"
                  @input="${this._handleInputChange}"
                  class="w-full px-4 py-4 bg-white border rounded-sm"
                  placeholder="0"
                />
              </div>
            </div>

            <!-- Results Display -->
            <div>
              <h3 class="text-dark-blue font-bold text-2xl mb-4">
                Required CFM:
              </h3>
              <div class="bg-dark-blue p-8 rounded-sm">
                <div class="text-5xl font-black text-white mb-4">
                  ${
                    this.requiredCFM > 0
                      ? html`
                          <span class="text-[#a0f92d]">
                            ${this.requiredCFM.toLocaleString()}
                          </span>
                          <span class="text-2xl"> CFM</span>
                        `
                      : html`<span class="text-[#a0f92d]">0.00</span>`
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Explanation Section -->
        <div class="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-xl font-black text-dark-blue mb-4">
            About CFM Calculation
          </h2>
          <div class="space-y-4 text-gray-600">
            <p>
              <strong>CFM (cubic feet per minute)</strong> is a measure of
              volumetric airflow. This calculator helps determine the required
              CFM for a room, given its floor area, ceiling height, and the
              desired air changes per hour (ACH).
            </p>
            <div class="bg-[#F7F7F7] p-4 rounded-lg font-mono">
              airflow (CFM) = (floor area × ceiling height × ACH) / 60
            </div>
            <p>
              To achieve a certain ACH, you must replace the entire volume of
              the room multiple times per hour.
            </p>
            <p>
              In practice, choosing the right ventilation system is crucial for
              maintaining indoor air quality, comfortable humidity levels, and
              temperature.
            </p>
          </div>
        </div>
      </calculator-container>
    `;
  }
}

customElements.define('cfm-calculator', CfmCalculator);
