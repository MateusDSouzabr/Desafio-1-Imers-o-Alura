import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, Trash2, HelpCircle, CornerDownLeft, Sparkles } from 'lucide-react';
import { PythonReplEnvironment } from '../pythonEngine';
import { TerminalLine } from '../types';

export const InteractiveTerminal: React.FC = () => {
  const [repl] = useState(() => new PythonReplEnvironment());
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'Python 3.12.0 (main) [Clang / GCC compatible] on browser',
    },
    {
      id: 'init-2',
      type: 'system',
      text: 'Digite "help()" para ver as funções disponíveis ou use os botões rápidos abaixo.',
    },
    {
      id: 'init-3',
      type: 'output',
      text: '>>> # Funções carregadas: adicao(a, b), subtracao(a, b), multiplicacao(a, b), divisao(a, b)',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isRunningScript, setIsRunningScript] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (commandToRun?: string) => {
    const cmd = commandToRun !== undefined ? commandToRun : inputValue;
    if (!cmd.trim()) return;

    // Add to command history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add user input line
    const userLine: TerminalLine = {
      id: `${Date.now()}-in`,
      type: 'input',
      text: `>>> ${cmd}`,
    };

    // Execute in REPL
    const { output, isError } = repl.execute(cmd);

    if (output === '__CLEAR__') {
      setHistory([
        {
          id: `clear-${Date.now()}`,
          type: 'system',
          text: 'Terminal limpo. Funções carregadas: adicao, subtracao, multiplicacao, divisao.',
        },
      ]);
      setInputValue('');
      return;
    }

    const newLines: TerminalLine[] = [userLine];

    if (output) {
      newLines.push({
        id: `${Date.now()}-out`,
        type: isError ? 'error' : 'output',
        text: output,
      });
    }

    setHistory((prev) => [...prev, ...newLines]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommandSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputValue(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInputValue(commandHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputValue('');
        }
      }
    }
  };

  const clearTerminal = () => {
    repl.reset();
    setHistory([
      {
        id: `clear-${Date.now()}`,
        type: 'system',
        text: 'Terminal reiniciado. Ambiente Python limpo.',
      },
    ]);
  };

  const simulateFullInteractiveScript = async () => {
    if (isRunningScript) return;
    setIsRunningScript(true);

    const steps: { type: 'system' | 'input' | 'output' | 'error'; text: string; delay: number }[] = [
      { type: 'input', text: '$ python calculadora.py', delay: 300 },
      {
        type: 'output',
        text: `===================================
      CALCULADORA EM PYTHON
===================================
1. Adição (+)
2. Subtração (-)
3. Multiplicação (*)
4. Divisão (/)
5. Sair
===================================`,
        delay: 500,
      },
      { type: 'input', text: 'Escolha uma opção (1-5): 1', delay: 700 },
      { type: 'output', text: 'Digite o primeiro número: 42', delay: 600 },
      { type: 'output', text: 'Digite o segundo número: 18', delay: 600 },
      { type: 'system', text: '✅ Resultado: 42.0 + 18.0 = 60.0', delay: 700 },
      { type: 'input', text: 'Deseja fazer outro cálculo? (s/n): s', delay: 600 },
      {
        type: 'output',
        text: `===================================
      CALCULADORA EM PYTHON
===================================
1. Adição (+)
2. Subtração (-)
3. Multiplicação (*)
4. Divisão (/)
5. Sair
===================================`,
        delay: 500,
      },
      { type: 'input', text: 'Escolha uma opção (1-5): 4', delay: 700 },
      { type: 'output', text: 'Digite o primeiro número: 100', delay: 600 },
      { type: 'output', text: 'Digite o segundo número: 0', delay: 600 },
      { type: 'error', text: '❌ Erro: Não é permitido divisão por zero!', delay: 800 },
      { type: 'input', text: 'Deseja fazer outro cálculo? (s/n): n', delay: 600 },
      { type: 'system', text: 'Programa finalizado. Até logo!', delay: 400 },
    ];

    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, step.delay));
      setHistory((prev) => [
        ...prev,
        {
          id: `sim-${Date.now()}-${Math.random()}`,
          type: step.type,
          text: step.text,
        },
      ]);
    }

    setIsRunningScript(false);
  };

  const quickSnippets = [
    { label: 'adicao(15, 30)', cmd: 'adicao(15, 30)' },
    { label: 'subtracao(100, 42)', cmd: 'subtracao(100, 42)' },
    { label: 'multiplicacao(7, 8)', cmd: 'multiplicacao(7, 8)' },
    { label: 'divisao(50, 4)', cmd: 'divisao(50, 4)' },
    { label: 'divisao(10, 0) [Erro]', cmd: 'divisao(10, 0)' },
    { label: 'Expressão: 2.5 * 4 + 10', cmd: '2.5 * 4 + 10' },
  ];

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-4">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-semibold text-slate-100">
              Terminal Interativo Python (REPL)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Execute chamadas às funções de adição, subtração, multiplicação e divisão diretamente no navegador.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={simulateFullInteractiveScript}
            disabled={isRunningScript}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRunningScript ? 'Executando CLI...' : 'Simular CLI Completa'}</span>
          </button>

          <button
            onClick={clearTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar</span>
          </button>
        </div>
      </div>

      {/* Quick Command Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 text-xs font-mono shrink-0">Testes rápidos:</span>
        {quickSnippets.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleCommandSubmit(q.cmd)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-blue-300 hover:text-blue-200 font-mono text-xs whitespace-nowrap transition-colors"
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Terminal Window */}
      <div
        className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col font-mono text-xs cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 select-none">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-slate-400 text-xs">python-repl --interactive</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
            <span>[Enter] Executar</span>
            <span>·</span>
            <span>[↑ / ↓] Histórico</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 min-h-[380px] max-h-[520px] overflow-y-auto space-y-2">
          {history.map((line) => {
            if (line.type === 'system') {
              return (
                <div key={line.id} className="text-slate-500 leading-relaxed whitespace-pre-wrap">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'input') {
              return (
                <div key={line.id} className="text-amber-400 font-semibold leading-relaxed">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'error') {
              return (
                <div key={line.id} className="text-rose-400 leading-relaxed whitespace-pre-wrap pl-2 border-l-2 border-rose-500/50">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={line.id} className="text-emerald-300 leading-relaxed whitespace-pre-wrap">
                {line.text}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Line */}
        <div className="flex items-center px-4 py-3 bg-slate-900/60 border-t border-slate-800">
          <span className="text-amber-400 font-bold mr-2 select-none">&gt;&gt;&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite um comando, ex: adicao(25, 75) ou divisao(10, 2)"
            className="w-full bg-transparent text-slate-100 placeholder:text-slate-600 focus:outline-none font-mono text-xs"
            autoFocus
          />
          <button
            onClick={() => handleCommandSubmit()}
            className="p-1 rounded text-slate-500 hover:text-slate-200 transition-colors ml-2"
            title="Executar comando"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
