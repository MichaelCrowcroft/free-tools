import { LitElement, html, css, unsafeCSS } from 'lit';
import styles from './styles/output.css';
import './components/calculator-container.js';

class HvacLoadCalculator extends LitElement {
    static styles = css`
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:weight@400;800&display=swap');
        :host {
          font-family: 'Source Sans Pro', sans-serif;
        }
        ${unsafeCSS(styles)};
    `;

    static properties = {
        squareFootage: { type: Number },
        ceilingHeight: { type: Number },
        occupants: { type: Number },
        windows: { type: Number },
        doors: { type: Number },
        insulation: { type: String },
        totalBTU: { type: Number },
    };

    constructor() {
        super();
        this.squareFootage = '';
        this.ceilingHeight = '';
        this.occupants = '';
        this.windows = '';
        this.doors = '';
        this.insulation = 'average';
        this.totalBTU = 0;
        // Insulation factors mapping
        this.insulationFactors = {
            poor: 1.2,
            average: 1.0,
            good: 0.85,
            excellent: 0.75,
        };
    }

    // Generic handler for all input/select changes.
    _handleInputChange(e) {
        const field = e.target.name;
        this[field] = e.target.value;
    }

    // Calculation logic triggered when the form is submitted.
    _handleCalculate(e) {
        e.preventDefault();

        // Base load: (square footage × ceiling height) + occupants*100 + windows*1000 + doors*1000
        let rawBTU = this.squareFootage * this.ceilingHeight + (this.occupants * 100) + (this.windows * 1000) + (this.doors * 1000);

        // Apply insulation factor
        const factor = this.insulationFactors[this.insulation] || 1;
        rawBTU = rawBTU * factor;

        this.totalBTU = Math.round(rawBTU);
    }

    // Compute tonnage based on total BTU (if any)
    get hvacTonnage() {
        return this.totalBTU > 0 ? (this.totalBTU / 12000).toFixed(2) : 'N/A';
    }

    render() {
        return html`
            <calculator-container heading="Simple HVAC Load Calculator">
                <div class="bg-[#f3f3f3] rounded-b-xs shadow-lg p-8 border border-[#99a9b0]">
                    <div class="grid md:grid-cols-2 gap-12">
                        <!-- Calculator Form -->
                        <div class="space-y-6">
                            <form @submit="${this._handleCalculate}" class="space-y-6">
                                <!-- Square Footage -->
                                <div class="space-y-2">
                                    <label class="flex items-center text-[#012939] font-medium">
                                        Total Square Footage:
                                    </label>
                                    <div class="flex items-center bg-white rounded-sm border p-2">
                                        <span class="pl-2">ft²</span>
                                        <input
                                            type="number"
                                            name="squareFootage"
                                            .value="${this.squareFootage.toString()}"
                                            @input="${this._handleInputChange}"
                                            class="w-full pl-3 pr-4 py-2 focus:outline-none focus:ring-0"
                                            placeholder="0"
                                            required
                                        />
                                    </div>
                                </div>

                                <!-- Ceiling Height -->
                                <div class="space-y-2">
                                    <label class="flex items-center text-[#012939] font-medium">
                                        Ceiling Height:
                                    </label>
                                    <div class="flex items-center bg-white rounded-sm border p-2">
                                        <span class="pl-2">ft</span>
                                        <input
                                            type="number"
                                            name="ceilingHeight"
                                            .value="${this.ceilingHeight.toString()}"
                                            @input="${this._handleInputChange}"
                                            class="w-full pl-3 pr-4 py-2 focus:outline-none focus:ring-0"
                                            placeholder="0"
                                            required
                                        />
                                    </div>
                                </div>

                                <!-- Occupants -->
                                <div class="space-y-2">
                                    <label class="flex items-center text-[#012939] font-medium">
                                        Number of Occupants:
                                    </label>
                                    <input
                                        type="number"
                                        name="occupants"
                                        .value="${this.occupants.toString()}"
                                        @input="${this._handleInputChange}"
                                        class="w-full px-4 py-4 bg-white border rounded-sm"
                                        placeholder="0"
                                    />
                                </div>

                                <!-- Windows -->
                                <div class="space-y-2">
                                    <label class="flex items-center text-[#012939] font-medium">
                                        Number of Windows:
                                    </label>
                                    <input
                                        type="number"
                                        name="windows"
                                        .value="${this.windows.toString()}"
                                        @input="${this._handleInputChange}"
                                        class="w-full px-4 py-4 bg-white border rounded-sm"
                                        placeholder="0"
                                    >
                                </div>

                                <!-- Doors -->
                                <div class="space-y-2">
                                    <label class="flex items-center text-[#012939] font-medium">
                                        Number of Exterior Doors:
                                    </label>
                                    <input
                                        type="number"
                                        name="doors"
                                        .value="${this.doors.toString()}"
                                        @input="${this._handleInputChange}"
                                        class="w-full px-4 py-4 bg-white border rounded-sm"
                                        placeholder="0"
                                    />
                                </div>

                                <!-- Insulation Level -->
                                <div class="space-y-2">
                                    <label class="flex items-center text-[#012939] font-medium">
                                        Insulation Level:
                                    </label>
                                    <select
                                        name="insulation"
                                        .value="${this.insulation.toString()}"
                                        @change="${this._handleInputChange}"
                                        class="w-full px-4 py-4 bg-white border rounded-sm"
                                    >
                                        <option value="poor">Poor</option>
                                        <option value="average">Average</option>
                                        <option value="good">Good</option>
                                        <option value="excellent">Excellent</option>
                                    </select>
                                </div>

                                <!-- Calculate Button -->
                                <button
                                    type="submit"
                                    class="bg-[#a0f92d] text-[#012939] font-black py-3 px-6 rounded-sm transition-colors w-full"
                                >
                                    Calculate Load
                                </button>
                            </form>
                        </div>

                        <!-- Results Display -->
                        <div class="bg-[#012939] p-8 rounded-sm">
                            <h3 class="text-white text-xl mb-4">Total HVAC Load:</h3>
                            <div class="text-5xl font-black text-white mb-4">
                                ${this.totalBTU > 0
                                    ? html`
                                            <span>
                                                ${this.totalBTU.toLocaleString()}
                                            </span>
                                            <span class="text-2xl"> BTU</span>
                                        `
                                    : html`<span>0</span>`}
                                <img src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTg2IiBoZWlnaHQ9IjExIiB2aWV3Qm94PSIwIDAgMTg2IDExIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89J25vbmUnPgo8cGF0aCBkPSJNMy40NzU5OCA1LjU3MDQ5QzQxLjYwODUgNC41NjQyNCA3OS44MzE4IDIuNDY5NyAxMTguMDIyIDMuNzMyMThDMTM1Ljc2NyA0LjMxODc4IDE1My40ODggNC4zMDgzOSAxNzEuMjI3IDQuNjUxMTlDMTcyLjkyMyA0LjY4Mzk4IDE3OC4wNTUgNC44MDI0NCAxODAuMjYyIDQuOTY4MzVDMTgxLjIzOCA1LjA0MTY4IDE4My42OCA0LjY0NzU0IDE4My4xNTEgNS45NDkyMkMxODMuMDU5IDYuMTc3ODggMTc0LjQwMSA4LjA3MDg3IDE3NS41MjMgOC4wMjE4NyIgc3Ryb2tlPSIjODRFQTAwIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K" />

                            </div>

                            <h3 class="text-white text-xl mb-2">Recommended HVAC Size:</h3>
                            <div class="text-3xl font-black text-white">
                                ${this.totalBTU > 0 && this.hvacTonnage !== 'N/A'
                                    ? `${this.hvacTonnage} tons`
                                    : "N/A"}
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Explanation Section -->
                <div class="mt-8 bg-white rounded-lg shadow-lg p-8">
                    <h2 class="text-xl font-black text-[#012939] mb-4">
                        How This Calculation Works
                    </h2>
                    <div class="space-y-4 text-gray-600">
                        <p>
                            This tool uses a simplified version of a Manual J load calculation.
                            We consider the following factors:
                        </p>
                        <ul class="list-disc list-inside space-y-2">
                            <li>
                                <strong>Square Footage × Ceiling Height:</strong> The total volume of the conditioned space.
                            </li>
                            <li>
                                <strong>Occupants:</strong> Each occupant adds roughly 100 BTU per hour.
                            </li>
                            <li>
                                <strong>Windows & Doors:</strong> Each adds roughly 1,000 BTU based on typical heat gains.
                            </li>
                            <li>
                                <strong>Insulation Factor:</strong> Applied to the sum, from poor (1.2×) to excellent (0.75×).
                            </li>
                        </ul>
                        <p>
                            We then divide the total BTU requirement by 12,000 to estimate the needed HVAC tonnage.
                            Real-world calculations would account for climate data, infiltration, solar gains, duct leaks, etc.
                        </p>
                    </div>
                </div>
            </calculator-container>
        `;
    }
}

customElements.define('hvac-load-calculator', HvacLoadCalculator);