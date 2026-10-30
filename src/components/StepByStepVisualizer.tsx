import React, { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { OperationType } from '../types';
import { executarOperacao } from '../pythonEngine';

export const StepByStepVisualizer: React.FC = () => {
  const [op, setOp] = useState<OperationType>('divisao');
  const [valA, setValA] = useState<number>(10);
  const [valB, setValB] = useState<number>(2);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const operations: { id: OperationType; label: string; symbol: string; func: string }[] = [
    { id: 'adicao', label: 'Adição', symbol: '+', func: 'def adicao(a, b): return a + b' },
    { id: 'subtracao', label: 'Subtração', symbol: '-', func: 'def subtracao(a, b): return a - b' },
    { id: 'multiplicacao', label: 'Multiplicação', symbol: '*', func: 'def multiplicacao(a, b): return a * b' },
    { id: 'divisao', label: 'Divisão', symbol: '/', func: 'def divisao(a, b): if b == 0: raise ... return a / b' },
  ];

  const { result, error, call } = executarOperacao(op, valA, valB);

  const runAnimation = async () => {
    setIsPlaying(true);
    setActiveStep(1); // Call & args
    await new Promise((r) => setTimeout(r, 600));

    if (op === 'divisao') {
      setActiveStep(2); // Check b == 0
      await new Promise((r) => setTimeout(r, 700));
      if (valB === 0) {
        setActiveStep(3); // Raise exception
        setIsPlaying(false);
        return;
      }
    }

    setActiveStep(4); // Compute return
    await new Promise((r) => setTimeout(r, 600));
    setActiveStep(5); // Final result in caller
    setIsPlaying(false);
  };

  const reset = () => {
    setActiveStep(0);
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h2 className="text-base font-semibold text-slate-100">
          Visualizador Passo a Passo da Execução em Python
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Veja detalhadamente como o interpretador Python carrega os argumentos na memória, verifica condições e retorna o resultado.
        </p>

        {/* Configuration Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
          {/* Op selector */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Operação Básica:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {operations.map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setOp(o.id);
                    setActiveStep(0);
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                    op === o.id
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {o.symbol} {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Operand A */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Primeiro Número (a):
            </label>
            <input
              type="number"
              value={valA}
              onChange={(e) => {
                setValA(parseFloat(e.target.value) || 0);
                setActiveStep(0);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-blue-500"
            />
            <div className="flex gap-1.5 mt-1.5">
              {[10, 25, 100, -5].map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setValA(n);
                    setActiveStep(0);
                  }}
                  className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-slate-400 hover:text-slate-200"
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Operand B */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Segundo Número (b):
            </label>
            <input
              type="number"
              value={valB}
              onChange={(e) => {
                setValB(parseFloat(e.target.value) || 0);
                setActiveStep(0);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-blue-500"
            />
            <div className="flex gap-1.5 mt-1.5">
              {[2, 5, 0, -2].map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setValB(n);
                    setActiveStep(0);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                    n === 0 && op === 'divisao'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800/60'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {n === 0 && op === 'divisao' ? '0 (teste de erro)' : n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={runAnimation}
            disabled={isPlaying}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-500/20 transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isPlaying ? 'Executando...' : 'Executar Animação do Código'}</span>
          </button>

          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Redefinir</span>
          </button>

          <div className="text-xs font-mono text-blue-400 hidden sm:block ml-auto">
            Chamada: <span className="font-semibold text-slate-200">{call}</span>
          </div>
        </div>
      </div>

      {/* Execution Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Step 1: Chamada e Argumentos */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            activeStep >= 1
              ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/10'
              : 'bg-slate-950/50 border-slate-800/80 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-blue-400 font-bold">Passo 1</span>
            <span className="text-slate-500">Call Stack</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-200 mb-2">
            Passagem de Parâmetros
          </h4>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
            <div className="text-slate-300">
              <span className="text-amber-400">a</span> = <span className="text-purple-300">{valA}</span>
            </div>
            <div className="text-slate-300">
              <span className="text-amber-400">b</span> = <span className="text-purple-300">{valB}</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Escopo local da função</div>
          </div>
        </div>

        {/* Step 2: Validação Condicional */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            activeStep >= 2
              ? op === 'divisao' && valB === 0
                ? 'bg-rose-950/20 border-rose-500 shadow-lg shadow-rose-500/10'
                : 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/10'
              : 'bg-slate-950/50 border-slate-800/80 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-blue-400 font-bold">Passo 2</span>
            <span className="text-slate-500">Validação</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-200 mb-2">
            Condição do Operador
          </h4>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs space-y-1">
            {op === 'divisao' ? (
              <>
                <div className="text-slate-300">
                  <span className="text-amber-400">if</span> b == 0:
                </div>
                <div className={`text-xs font-bold ${valB === 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  Avaliado como: {valB === 0 ? 'True ⚠️' : 'False (Seguro)'}
                </div>
              </>
            ) : (
              <>
                <div className="text-slate-300">Operação direta</div>
                <div className="text-emerald-400 text-xs font-bold">Válida e sem restrições</div>
              </>
            )}
          </div>
        </div>

        {/* Step 3: Cálculo ou Exceção */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            activeStep >= 3 || (activeStep >= 4 && !error)
              ? error
                ? 'bg-rose-950/20 border-rose-500'
                : 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/10'
              : 'bg-slate-950/50 border-slate-800/80 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-blue-400 font-bold">Passo 3</span>
            <span className="text-slate-500">Computação</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-200 mb-2">
            {error ? 'Exceção Lançada' : 'Expressão Avaliada'}
          </h4>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
            {error ? (
              <div className="text-rose-400 flex items-start gap-1.5 text-[11px]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>raise ZeroDivisionError(...)</span>
              </div>
            ) : (
              <div className="text-slate-300 text-xs">
                return {valA} {op === 'adicao' ? '+' : op === 'subtracao' ? '-' : op === 'multiplicacao' ? '*' : '/'} {valB}
              </div>
            )}
          </div>
        </div>

        {/* Step 4: Retorno ao Chamador */}
        <div
          className={`p-4 rounded-2xl border transition-all ${
            activeStep >= 5 || (activeStep >= 3 && error)
              ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10'
              : 'bg-slate-950/50 border-slate-800/80 opacity-60'
          }`}
        >
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-emerald-400 font-bold">Passo 4</span>
            <span className="text-slate-500">Output</span>
          </div>
          <h4 className="text-sm font-semibold text-slate-200 mb-2">
            Valor Retornado
          </h4>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
            {error ? (
              <div className="text-rose-400 font-semibold text-xs">
                Exceção capturada
              </div>
            ) : (
              <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{result} (float)</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code snippet highlighting the active function */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
          <span>Função em Execução no Código Python:</span>
        </h3>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
          {op === 'adicao' && (
            <pre>
              <span className="text-amber-400">def</span> <span className="text-cyan-400">adicao</span>(a: <span className="text-teal-300">float</span>, b: <span className="text-teal-300">float</span>) -&gt; <span className="text-teal-300">float</span>:
              {'\n'}    <span className="text-slate-500">"""Retorna a soma de a e b."""</span>
              {'\n'}    <span className="text-amber-400">return</span> a + b
            </pre>
          )}
          {op === 'subtracao' && (
            <pre>
              <span className="text-amber-400">def</span> <span className="text-cyan-400">subtracao</span>(a: <span className="text-teal-300">float</span>, b: <span className="text-teal-300">float</span>) -&gt; <span className="text-teal-300">float</span>:
              {'\n'}    <span className="text-slate-500">"""Retorna a diferença entre a e b."""</span>
              {'\n'}    <span className="text-amber-400">return</span> a - b
            </pre>
          )}
          {op === 'multiplicacao' && (
            <pre>
              <span className="text-amber-400">def</span> <span className="text-cyan-400">multiplicacao</span>(a: <span className="text-teal-300">float</span>, b: <span className="text-teal-300">float</span>) -&gt; <span className="text-teal-300">float</span>:
              {'\n'}    <span className="text-slate-500">"""Retorna o produto de a e b."""</span>
              {'\n'}    <span className="text-amber-400">return</span> a * b
            </pre>
          )}
          {op === 'divisao' && (
            <pre>
              <span className="text-amber-400">def</span> <span className="text-cyan-400">divisao</span>(a: <span className="text-teal-300">float</span>, b: <span className="text-teal-300">float</span>) -&gt; <span className="text-teal-300">float</span>:
              {'\n'}    <span className="text-slate-500">"""Retorna o quociente de a por b. Trata divisão por zero."""</span>
              {'\n'}    <span className="text-amber-400">if</span> b == <span className="text-purple-300">0</span>:
              {'\n'}        <span className="text-amber-400">raise</span> <span className="text-cyan-400">ZeroDivisionError</span>(<span className="text-emerald-300">"Erro: Não é permitido divisão por zero!"</span>)
              {'\n'}    <span className="text-amber-400">return</span> a / b
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
