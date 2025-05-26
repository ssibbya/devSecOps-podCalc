import React, { useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import CalculatorForm from './components/CalculatorForm';
import ResultCard from './components/ResultCard';
import { calculatePods } from './utils/podCalculator';

function App() {
  const [formValues, setFormValues] = useState({
    //replicas: 1,
    cpuPerPod: 0.5,
    ramPerPod: 1,
    totalCpu: 2,
    totalRam: 8,
  });

  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const pods = calculatePods({
      totalCpu: formValues.totalCpu,
      totalRam: formValues.totalRam,
      cpuPerPod: formValues.cpuPerPod,
      ramPerPod: formValues.ramPerPod
    });
    setResult(pods);
  };

  const handleReset = () => {
    setFormValues({
      //replicas: 1,
      cpuPerPod: 0.5,
      ramPerPod: 4,
      totalCpu: 2,
      totalRam: 8,
    });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-slate-700 text-white text-center">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 font-semibold">
          <Calculator className="h-8 w-8" />
          Pod Calculator
          </h1>
          <p className="text-slate-300 mt-1 font-light">Estimate Kubernetes pods based on your workload</p>
        </div>
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-4">
      <CalculatorForm onCalculate={setResult} />
      </div>
      <ResultCard result={result} />
      </div>
    </div>
  </div>
  );
}

export default App;