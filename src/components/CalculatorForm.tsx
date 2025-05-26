import { useState } from 'react';
import { calculatePods } from '../utils/podCalculator';
import { RefreshCw } from 'lucide-react';

type Props = {
  onCalculate: (result: number | null) => void;
};

export default function CalculatorForm({ onCalculate }: Props) {
  const [cpuPerPod, setCpuPerPod] = useState('');
  const [ramPerPod, setRamPerPod] = useState('');
  const [totalCpu, setTotalCpu] = useState('');
  const [totalRam, setTotalRam] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculatePods({
      cpuPerPod: parseFloat(cpuPerPod),
      ramPerPod: parseFloat(ramPerPod),
      totalCpu: parseFloat(totalCpu),
      totalRam: parseFloat(totalRam),
    });
    onCalculate(result);
  };

  const handleReset = () => {
    setCpuPerPod('');
    setRamPerPod('');
    setTotalCpu('');
    setTotalRam('');
    onCalculate(null); // Clear result
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
      <div>
        <label className="block font-semibold mb-1">CPU per Pod</label>
        <input
          type="number"
          className="input w-full"
          placeholder="e.g. 0.5"
          value={cpuPerPod}
          onChange={(e) => setCpuPerPod(e.target.value)}
          required
          step="0.1"
          min="0"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">RAM per Pod (GB)</label>
        <input
          type="number"
          className="input w-full"
          placeholder="e.g. 1"
          value={ramPerPod}
          onChange={(e) => setRamPerPod(e.target.value)}
          required
          step="0.1"
          min="0"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Total CPU Required</label>
        <input
          type="number"
          className="input w-full"
          placeholder="e.g. 4"
          value={totalCpu}
          onChange={(e) => setTotalCpu(e.target.value)}
          required
          step="0.1"
          min="0"
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Total RAM Required (GB)</label>
        <input
          type="number"
          className="input w-full"
          placeholder="e.g. 8"
          value={totalRam}
          onChange={(e) => setTotalRam(e.target.value)}
          required
          step="0.1"
          min="0"
        />
      </div>

      <div className="flex gap-4">
        <button
        type="submit"
        className="bg-slate-700 hover:bg-slate-800 text-white py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg font-medium"
      >
        Calculate
      </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Clear
        </button>
      </div>
    </form>
  );
}
