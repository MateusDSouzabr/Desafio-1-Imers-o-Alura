/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { VisualCalculator } from './components/VisualCalculator';
import { CodeViewer } from './components/CodeViewer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { StepByStepVisualizer } from './components/StepByStepVisualizer';
import { LogicAndVariablesExplainer } from './components/LogicAndVariablesExplainer';
import { PythonGuide } from './components/PythonGuide';
import { CalculationHistoryItem } from './types';
import { Download, Code2, Terminal, BookOpen, Calculator } from 'lucide-react';
import { PYTHON_SNIPPETS } from './codeSnippets';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('visual');
  const [history, setHistory] = useState<CalculationHistoryItem[]>([
    {
      id: 'default-1',
      operation: 'adicao',
      symbol: '+',
      opName: 'Adição',
      a: 12.5,
      b: 7.5,
      result: 20,
      pythonExpression: '12.5 + 7.5',
      pythonFunctionCall: 'adicao(12.5, 7.5) -> 20',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: 'default-2',
      operation: 'multiplicacao',
      symbol: '*',
      opName: 'Multiplicação',
      a: 6,
      b: 7,
      result: 42,
      pythonExpression: '6 * 7',
      pythonFunctionCall: 'multiplicacao(6, 7) -> 42',
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
    },
  ]);

  const handleAddHistory = (item: CalculationHistoryItem) => {
    setHistory((prev) => [item, ...prev].slice(0, 30));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const downloadScript = () => {
    const element = document.createElement('a');
    const file = new Blob([PYTHON_SNIPPETS.cli.code], { type: 'text/x-python' });
    element.href = URL.createObjectURL(file);
    element.download = 'calculadora.py';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadReadme = () => {
    const element = document.createElement('a');
    const file = new Blob([PYTHON_SNIPPETS.readme.code], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'visual' && (
          <VisualCalculator
            onAddHistory={handleAddHistory}
            history={history}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeTab === 'logic' && <LogicAndVariablesExplainer />}

        {activeTab === 'code' && <CodeViewer />}

        {activeTab === 'terminal' && <InteractiveTerminal />}

        {activeTab === 'step' && <StepByStepVisualizer />}

        {activeTab === 'guide' && <PythonGuide />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">
              Calculadora Python (4 Operações Básicas)
            </span>
            <span>·</span>
            <span>Adição, Subtração, Multiplicação e Divisão</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setActiveTab('code')}
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Ver Código Python</span>
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Abrir Terminal</span>
            </button>
            <button
              onClick={downloadReadme}
              className="hover:text-blue-400 transition-colors flex items-center gap-1 text-slate-400"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download README.md</span>
            </button>
            <button
              onClick={downloadScript}
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-500"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download calculadora.py</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
