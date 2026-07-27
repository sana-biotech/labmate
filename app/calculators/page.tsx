"use client";
import { useState } from "react";

export default function Calculators() {
  const [c1, setC1] = useState("");
  const [c2, setC2] = useState("");
  const [v2, setV2] = useState("");
  const [v1Result, setV1Result] = useState<string | null>(null);

  const calculateDilution = () => {
    const C1 = parseFloat(c1);
    const C2 = parseFloat(c2);
    const V2 = parseFloat(v2);
    if (C1 > 0 && C2 > 0 && V2 > 0) {
      const V1 = (C2 * V2) / C1;
      setV1Result(V1.toFixed(3));
    } else {
      setV1Result("Please enter valid numbers");
    }
  };

  const [reactions, setReactions] = useState("");
  const [mastermix, setMastermix] = useState<any>(null);

  const calculatePCR = () => {
    const n = parseFloat(reactions);
    if (n > 0) {
      const extra = n + 1;
      setMastermix({
        water: (extra * 6.5).toFixed(1),
        buffer: (extra * 2.5).toFixed(1),
        dNTPs: (extra * 0.5).toFixed(1),
        primerF: (extra * 1).toFixed(1),
        primerR: (extra * 1).toFixed(1),
        taq: (extra * 0.5).toFixed(1),
        template: "Add separately per reaction",
      });
    } else {
      setMastermix(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <a href="/" className="text-blue-600 mb-6 inline-block">&larr; Back to Home</a>
      <h1 className="text-3xl font-bold text-blue-900 mb-8">🧮 Calculators</h1>

      <div className="bg-white shadow-md rounded-xl p-6 mb-8 max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Dilution Calculator (C1V1 = C2V2)</h2>
        <div className="space-y-3">
          <input
            type="number"
            placeholder="Stock concentration (C1)"
            value={c1}
            onChange={(e) => setC1(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="number"
            placeholder="Desired concentration (C2)"
            value={c2}
            onChange={(e) => setC2(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="number"
            placeholder="Desired final volume (V2)"
            value={v2}
            onChange={(e) => setV2(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
          <button
            onClick={calculateDilution}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Calculate
          </button>
          {v1Result && (
            <p className="mt-3 font-medium text-green-700">
              Volume of stock needed (V1): {v1Result}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-xl">
        <h2 className="text-xl font-semibold mb-4">PCR Mastermix Calculator</h2>
        <input
          type="number"
          placeholder="Number of reactions"
          value={reactions}
          onChange={(e) => setReactions(e.target.value)}
          className="border rounded-lg p-2 w-full mb-3"
        />
        <button
          onClick={calculatePCR}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Calculate Mastermix
        </button>

        {mastermix && (
          <div className="mt-4 text-gray-700 space-y-1">
            <p>Water: {mastermix.water} µL</p>
            <p>Buffer (10x): {mastermix.buffer} µL</p>
            <p>dNTPs: {mastermix.dNTPs} µL</p>
            <p>Primer Forward: {mastermix.primerF} µL</p>
            <p>Primer Reverse: {mastermix.primerR} µL</p>
            <p>Taq Polymerase: {mastermix.taq} µL</p>
            <p className="text-sm text-gray-500">{mastermix.template}</p>
          </div>
        )}
      </div>
    </div>
  );
}