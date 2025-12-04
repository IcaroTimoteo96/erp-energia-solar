import { useState } from 'react';
import { Sun, Battery, DollarSign, Zap } from 'lucide-react';
import { quoteService } from '../services/api';

const SolarCalculator = () => {
  const [inputs, setInputs] = useState({
    monthlyUsage: 350,
    peakSunHours: 5,
    panelWattage: 550,
    energyRate: 0.95
  });
  const [result, setResult] = useState<any>(null);

  const calculate = async () => {
    try {
      const response = await quoteService.calculate(inputs);
      setResult(response.data);
    } catch (error) {
      console.error('Error calculating:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Sun className="text-orange-500" />
        Solar Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Usage (kWh)</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            value={inputs.monthlyUsage}
            onChange={e => setInputs({...inputs, monthlyUsage: Number(e.target.value)})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Peak Sun Hours</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            value={inputs.peakSunHours}
            onChange={e => setInputs({...inputs, peakSunHours: Number(e.target.value)})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Panel Wattage (W)</label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            value={inputs.panelWattage}
            onChange={e => setInputs({...inputs, panelWattage: Number(e.target.value)})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Energy Rate ($/kWh)</label>
          <input
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            value={inputs.energyRate}
            onChange={e => setInputs({...inputs, energyRate: Number(e.target.value)})}
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-lg transition-colors mb-6"
      >
        Calculate System
      </button>

      {result && (
        <div className="grid grid-cols-3 gap-4 bg-orange-50 p-4 rounded-lg border border-orange-100">
          <div className="text-center">
            <div className="flex justify-center mb-1 text-orange-500"><Zap size={20} /></div>
            <p className="text-xs text-gray-500">System Size</p>
            <p className="text-lg font-bold text-gray-900">{result.systemSizeKw.toFixed(2)} kWp</p>
          </div>
          <div className="text-center border-l border-orange-200">
            <div className="flex justify-center mb-1 text-orange-500"><Battery size={20} /></div>
            <p className="text-xs text-gray-500">Panels Needed</p>
            <p className="text-lg font-bold text-gray-900">{result.panelCount}</p>
          </div>
          <div className="text-center border-l border-orange-200">
            <div className="flex justify-center mb-1 text-orange-500"><DollarSign size={20} /></div>
            <p className="text-xs text-gray-500">Est. Savings/Mo</p>
            <p className="text-lg font-bold text-gray-900">${result.estimatedMonthlySavings.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolarCalculator;
