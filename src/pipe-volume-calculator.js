// src/pipe-volume-calculator.js

import { LitElement, html, css, unsafeCSS } from 'lit';
import styles from './styles/output.css';

// Import the existing calculator container (same one used by hvac-load-calculator)
import './components/calculator-container.js';

/**
 * PipeVolumeCalculator
 * A Lit-based Web Component that computes the volume of fluid within a pipe
 * and the resulting mass of that fluid, similar in style to hvac-load-calculator.
 */
export class PipeVolumeCalculator extends LitElement {
  static styles = css`
    :host {
      font-family: 'Source Sans Pro', sans-serif;
    }
    ${unsafeCSS(styles)};
  `;

  static properties = {
    // Form inputs
    diameter: { type: Number },
    diameterUnit: { type: String },
    length: { type: Number },
    lengthUnit: { type: String },
    density: { type: Number },
    densityUnit: { type: String },
  };

  constructor() {
    super();
    // Default state
    this.diameter = 0;
    this.diameterUnit = 'in';
    this.length = 0;
    this.lengthUnit = 'ft';
    this.density = 997; // default water density in kg/m³
    this.densityUnit = 'kg/m³';
  }

  // Conversion multipliers to convert user inputs to base SI units (meters, kg/m³).
  get lengthConversion() {
    return {
      m: 1,
      cm: 0.01,
      mm: 0.001,
      ft: 0.3048,
      in: 0.0254,
    };
  }

  get densityConversion() {
    return {
      'kg/m³': 1,         // base
      'lb/ft³': 16.018463 // 1 lb/ft³ = 16.018463 kg/m³
    };
  }

  /**
   * Compute the pipe's internal volume (in cubic meters).
   */
  get volume() {
    // Ensure values are numbers
    const d = this.diameter || 0;
    const L = this.length || 0;
    const rho = this.density || 0;

    // Convert all to SI (meters, kg/m³)
    const diameterInMeters = d * (this.lengthConversion[this.diameterUnit] || 1);
    const lengthInMeters = L * (this.lengthConversion[this.lengthUnit] || 1);
    const densityInSI = rho * (this.densityConversion[this.densityUnit] || 1);

    // radius = diameter / 2
    const radius = diameterInMeters / 2;

    // volume (m³) = π * r² * length
    const calcVolume = Math.PI * (radius ** 2) * lengthInMeters;

    return calcVolume || 0;
  }

  /**
   * Compute the mass of fluid in the pipe (in kg).
   */
  get liquidMass() {
    // mass (kg) = volume (m³) * density (kg/m³)
    const densityInSI = (this.density || 0) * (this.densityConversion[this.densityUnit] || 1);
    return this.volume * densityInSI;
  }

  /**
   * Handle updates to numeric or string fields as the user types/selects.
   */
  _handleInputChange(event) {
    const target = event.target;
    const { name, value } = target;

    // If the field is numeric, parse to float or store as 0
    if (['diameter', 'length', 'density'].includes(name)) {
      this[name] = parseFloat(value) || 0;
    } else {
      // For unit selects or anything else, store as string
      this[name] = value;
    }
  }

  render() {
    return html`
      <!-- Wrap everything in the same container used by hvac-load-calculator -->
      <calculator-container heading="Pipe Volume Calculator">
        <div class="bg-[#f3f3f3] rounded-b-xs shadow-lg p-8 border border-[#99a9b0]">
          <div class="grid md:grid-cols-2 gap-12">
            <!-- Left: Form Inputs -->
            <div class="space-y-6">

              <!-- Inner Diameter -->
              <div class="space-y-2">
                <label class="flex items-center text-dark-blue font-medium">
                  Inner Diameter:
                </label>
                <div class="flex items-center gap-2">
                  <div class="relative w-full">
                    <input
                      type="number"
                      name="diameter"
                      .value="${this.diameter}"
                      @input="${this._handleInputChange}"
                      class="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none"
                      placeholder="e.g. 15"
                    />
                  </div>
                  <select
                    name="diameterUnit"
                    .value="${this.diameterUnit}"
                    @change="${this._handleInputChange}"
                    class="py-2 px-4 border border-gray-300 rounded-sm focus:outline-none"
                  >
                    <option value="in">in</option>
                    <option value="ft">ft</option>
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                  </select>
                </div>
              </div>

              <!-- Length -->
              <div class="space-y-2">
                <label class="flex items-center text-dark-blue font-medium">
                  Length:
                </label>
                <div class="flex items-center gap-2">
                  <div class="relative w-full">
                    <input
                      type="number"
                      name="length"
                      .value="${this.length}"
                      @input="${this._handleInputChange}"
                      class="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none"
                      placeholder="e.g. 6"
                    />
                  </div>
                  <select
                    name="lengthUnit"
                    .value="${this.lengthUnit}"
                    @change="${this._handleInputChange}"
                    class="py-2 px-4 border border-gray-300 rounded-sm focus:outline-none"
                  >
                    <option value="in">in</option>
                    <option value="ft">ft</option>
                    <option value="mm">mm</option>
                    <option value="cm">cm</option>
                    <option value="m">m</option>
                  </select>
                </div>
              </div>

              <!-- Liquid Density -->
              <div class="space-y-2">
                <label class="flex items-center text-dark-blue font-medium">
                  Liquid Density:
                </label>
                <div class="flex items-center gap-2">
                  <div class="relative w-full">
                    <input
                      type="number"
                      name="density"
                      .value="${this.density}"
                      @input="${this._handleInputChange}"
                      class="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none"
                      placeholder="e.g. 997"
                    />
                  </div>
                  <select
                    name="densityUnit"
                    .value="${this.densityUnit}"
                    @change="${this._handleInputChange}"
                    class="py-2 px-4 border border-gray-300 rounded-sm focus:outline-none"
                  >
                    <option value="kg/m³">kg/m³</option>
                    <option value="lb/ft³">lb/ft³</option>
                  </select>
                </div>
              </div>

            </div>

            <!-- Right: Results Display -->
            <div>
              <h3 class="text-dark-blue font-bold text-2xl mb-4">Pipe Volume:</h3>
              <div class="bg-dark-blue p-8 rounded-sm mb-8">
                <div class="text-5xl font-black text-white mb-4">
                  <span>
                    ${this.volume > 0 ? this.volume.toFixed(4) : '0.0000'}
                  </span>
                  <span class="text-2xl"> m³</span>
                </div>
              </div>

              <h3 class="text-dark-blue font-bold text-2xl mb-4">Liquid Mass:</h3>
              <div class="bg-dark-blue p-8 rounded-sm">
                <div class="text-5xl font-black text-white">
                  <span>
                    ${this.liquidMass > 0 ? this.liquidMass.toFixed(2) : '0.00'}
                  </span>
                  <span class="text-2xl"> kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Explanation Section -->
        <div class="mt-8 bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-xl font-black text-dark-blue mb-4">
            About the Pipe Volume Calculation
          </h2>
          <div class="space-y-4 text-gray-600">
            <p>
              This tool calculates the volume of a pipe (assumed to be a right circular cylinder)
              using the formula:
            </p>
            <div class="bg-[#F7F7F7] p-4 rounded-lg">
              <p class="font-mono">
                volume = π × (diameter/2)² × length
              </p>
            </div>
            <p>
              The <strong>liquid mass</strong> is then derived from:
            </p>
            <div class="bg-[#F7F7F7] p-4 rounded-lg">
              <p class="font-mono">
                liquid mass = volume × density
              </p>
            </div>
            <p>
              By default, the density is set to water (997 kg/m³), but you can change it for any
              other fluid by specifying its density. Use the unit dropdowns to seamlessly switch
              between metric and imperial measurements.
            </p>
          </div>
        </div>
      </calculator-container>
    `;
  }
}

// Register the custom element
customElements.define('pipe-volume-calculator', PipeVolumeCalculator);
