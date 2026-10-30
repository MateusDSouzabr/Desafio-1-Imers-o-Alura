import React, { useState, useEffect, useCallback } from 'react';
import { Delete, RotateCcw, Clock, Copy, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { CalculationHistoryItem, OperationType } from '../types';
import { executarOperacao } from '../pythonEngine';

interface Props {
  onAddHistory?: (item: CalculationHistoryItem) => void;
  history: CalculationHistoryItem[];
  onClearHistory: () => void;
}

export const VisualCalculator: React.FC<Props> = ({
  onAddHistory,
  history,
  onClearHistory,
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [activeOp, setActiveOp] = useState<OperationType | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [lastExecutedPython, setLastExecutedPython] = useState<string>('def adicao(a, b): return a + b');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);

  const clearAll = useCallback(() => {
    setDisplayValue('0');
    setPreviousValue(null);
    setActiveOp(null);
    setWaitingForOperand(false);
    setLastError(null);
  }, []);

  const inputDigit = useCallback((digit: string) => {
    setLastError(null);
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  }, [displayValue, waitingForOperand]);

  const inputDot = useCallback(() => {
    setLastError(null);
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  }, [displayValue, waitingForOperand]);

  const backspace = useCallback(() => {
    setLastError(null);
    if (waitingForOperand) return;
    if (displayValue.length > 1) {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue('0');
    }
  }, [displayValue, waitingForOperand]);

  const toggleSign = useCallback(() => {
    setLastError(null);
    const num = parseFloat(displayValue);
    if (!isNaN(num) && num !== 0) {
      setDisplayValue(String(-num));
    }
  }, [displayValue]);

  const performOperation = useCallback((nextOp: OperationType) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (activeOp) {
      const { result, error, expr, call } = executarOperacao(activeOp, previousValue, inputValue);

      if (error) {
        setLastError(error);
        setLastExecutedPython(`try:\n    ${call}\nexcept ZeroDivisionError as e:\n    print(f"Erro: {e}")`);
        setPreviousValue(null);
        setActiveOp(null);
        setWaitingForOperand(true);
        return;
      }

      if (result !== null) {
        setDisplayValue(String(result));
        setPreviousValue(result);

        const historyItem: CalculationHistoryItem = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          operation: activeOp,
          symbol: activeOp === 'adicao' ? '+' : activeOp === 'subtracao' ? '-' : activeOp === 'multiplicacao' ? '*' : '/',
          opName: activeOp === 'adicao' ? 'Adição' : activeOp === 'subtracao' ? 'Subtração' : activeOp === 'multiplicacao' ? 'Multiplicação' : 'Divisão',
          a: previousValue,
          b: inputValue,
          result: result,
          pythonExpression: expr,
          pythonFunctionCall: `${call} -> ${result}`,
          timestamp: new Date(),
        };

        onAddHistory?.(historyItem);
        setLastExecutedPython(`resultado = ${call}  # ${expr} = ${result}`);
      }
    }

    setWaitingForOperand(true);
    setActiveOp(nextOp);
  }, [displayValue, previousValue, activeOp, onAddHistory]);

  const calculateResult = useCallback(() => {
    if (!activeOp || previousValue === null) return;

    const inputValue = parseFloat(displayValue);
    const { result, error, expr, call } = executarOperacao(activeOp, previousValue, inputValue);

    if (error) {
      setLastError(error);
      setLastExecutedPython(`try:\n    ${call}\nexcept ZeroDivisionError as e:\n    print(f"Erro: {e}")`);
      setPreviousValue(null);
      setActiveOp(null);
      setWaitingForOperand(true);
      return;
    }

    if (result !== null) {
      setDisplayValue(String(result));
      setPreviousValue(null);
      setActiveOp(null);
      setWaitingForOperand(true);
      setLastError(null);

      const historyItem: CalculationHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        operation: activeOp,
        symbol: activeOp === 'adicao' ? '+' : activeOp === 'subtracao' ? '-' : activeOp === 'multiplicacao' ? '*' : '/',
        opName: activeOp === 'adicao' ? 'Adição' : activeOp === 'subtracao' ? 'Subtração' : activeOp === 'multiplicacao' ? 'Multiplicação' : 'Divisão',
        a: previousValue,
        b: inputValue,
        result: result,
        pythonExpression: expr,
        pythonFunctionCall: `${call} -> ${result}`,
        timestamp: new Date(),
      };

      onAddHistory?.(historyItem);
      setLastExecutedPython(`resultado = ${call}  # ${expr} = ${result}`);
    }
  }, [activeOp, previousValue, displayValue, onAddHistory]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement).tagName.toLowerCase())) {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        inputDigit(e.key);
      } else if (e.key === '.') {
        e.preventDefault();
        inputDot();
      } else if (e.key === '+') {
        e.preventDefault();
        performOperation('adicao');
      } else if (e.key === '-') {
        e.preventDefault();
        performOperation('subtracao');
      } else if (e.key === '*') {
        e.preventDefault();
        performOperation('multiplicacao');
      } else if (e.key === '/') {
        e.preventDefault();
        performOperation('divisao');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculateResult();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        backspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        clearAll();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputDigit, inputDot, performOperation, calculateResult, backspace, clearAll]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getOpSymbol = (op: OperationType | null) => {
    switch (op) {
      case 'adicao': return '+';
      case 'subtracao': return '-';
      case 'multiplicacao': return '×';
      case 'divisao': return '÷';
      default: return '';
    }
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Calculator */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl shadow-blue-950/20">
            {/* Header / Mode Indicator */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-slate-300">Python 3 Interpreter Mode</span>
              </div>
              <span className="text-slate-500">Atalhos de teclado ativos</span>
            </div>

            {/* Display */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mb-6 flex flex-col justify-between min-h-[110px] text-right font-mono transition-all">
              {/* Formula and Python function preview */}
              <div className="text-xs text-blue-400 font-mono flex items-center justify-end gap-1 overflow-x-auto">
                {previousValue !== null && activeOp && (
                  <span>
                    {previousValue} {getOpSymbol(activeOp)}{' '}
                    {waitingForOperand ? '' : displayValue}
                  </span>
                )}
                {lastError && (
                  <span className="text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    ZeroDivisionError
                  </span>
                )}
              </div>

              {/* Main value */}
              <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-100 overflow-x-auto py-1">
                {lastError ? (
                  <span className="text-xl sm:text-2xl text-rose-400 font-normal">
                    {lastError}
                  </span>
                ) : (
                  displayValue
                )}
              </div>

              {/* Subtitle with Python type annotation */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-900 pt-1 mt-1">
                <span>
                  {activeOp ? (
                    <span className="text-amber-400 font-mono">
                      {activeOp}({previousValue}, ...)
                    </span>
                  ) : (
                    'Pronto'
                  )}
                </span>
                <span className="text-slate-400">
                  {lastError ? 'Exception' : 'type: float'}
                </span>
              </div>
            </div>

            {/* Keypad Grid */}
            <div className="grid grid-cols-4 gap-2.5">
              {/* Row 1 */}
              <button
                onClick={clearAll}
                className="py-3 px-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-rose-400 font-semibold text-sm transition-colors active:scale-95 flex items-center justify-center gap-1"
                title="Limpar tudo (Esc)"
              >
                <RotateCcw className="w-4 h-4" />
                <span>AC</span>
              </button>
              <button
                onClick={toggleSign}
                className="py-3 px-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 font-medium text-sm transition-colors active:scale-95"
                title="Alternar sinal (+/-)"
              >
                ±
              </button>
              <button
                onClick={backspace}
                className="py-3 px-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 font-medium text-sm transition-colors active:scale-95 flex items-center justify-center"
                title="Apagar último dígito (Backspace)"
              >
                <Delete className="w-4 h-4" />
              </button>
              <button
                onClick={() => performOperation('divisao')}
                className={`py-3 px-2 rounded-xl font-bold text-lg transition-colors active:scale-95 ${
                  activeOp === 'divisao'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
                title="Divisão (/)"
              >
                ÷
              </button>

              {/* Row 2 */}
              <button
                onClick={() => inputDigit('7')}
                className="py-3.5 px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-lg transition-colors active:scale-95"
              >
                7
              </button>
              <button
                onClick={() => inputDigit('8')}
                className="py-3.5 px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-lg transition-colors active:scale-95"
              >
                8
              </button>
              <button
                onClick={() => inputDigit('9')}
                className="py-3.5 px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-lg transition-colors active:scale-95"
              >
                9
              </button>
              <button
                onClick={() => performOperation('multiplicacao')}
                className={`py-3 px-2 rounded-xl font-bold text-lg transition-colors active:scale-95 ${
                  activeOp === 'multiplicacao'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
                title="Multiplicação (*)"
              >
                ×
              </button>

              {/* Row 3 */}
              <button
                onClick={() => inputDigit('4')}
                className="py-3.5 px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-lg transition-colors active:scale-95"
              >
                4
              </button>
              <button
                onClick={() => inputDigit('5')}
                className="py-3.5 px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-lg transition-colors active:scale-95"
              >
                5
              </button>
              <button
                onClick={() => inputDigit('6')}
                className="py-3.5 px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-lg transition-colors active:scale-95"
              >
                6
              </button>
              <button
                onClick={() => performOperation('subtracao')}
                className={`py-3 px-2 rounded-xl font-bold text-lg transition-colors active:scale-95 ${
                  activeOp === 'subtracao'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
                title="Subtração (-)"
              >
                −
              </button>

              {/* Row 4 */}
              <button
                onClick={() => inputDigit('1')}
                className="py-3.5 px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-lg transition-colors active:scale-95"
              >
                1
              </button>
              <button
                onClick={() => inputDigit('2')}
                className="py-3.5 px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-lg transition-colors active:scale-95"
              >
                2
              </button>
              <button
                onClick={() => inputDigit('3')}
                className="py-3.5 px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-lg transition-colors active:scale-95"
              >
                3
              </button>
              <button
                onClick={() => performOperation('adicao')}
                className={`py-3 px-2 rounded-xl font-bold text-lg transition-colors active:scale-95 ${
                  activeOp === 'adicao'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
                title="Adição (+)"
              >
                +
              </button>

              {/* Row 5 */}
              <button
                onClick={() => inputDigit('0')}
                className="col-span-2 py-3.5 px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-lg transition-colors active:scale-95"
              >
                0
              </button>
              <button
                onClick={inputDot}
                className="py-3.5 px-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-bold text-lg transition-colors active:scale-95"
              >
                .
              </button>
              <button
                onClick={calculateResult}
                className="py-3.5 px-2 rounded-xl bg-[#FFD438] hover:bg-[#ffe169] text-slate-950 font-bold text-xl transition-all shadow-lg shadow-amber-400/20 active:scale-95"
                title="Calcular resultado (Enter ou =)"
              >
                =
              </button>
            </div>

            {/* Python Live Execution Code Box */}
            <div className="mt-5 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-500 text-[11px] mb-1">
                <span>Execução Python em tempo real:</span>
                <span className="text-emerald-400">stdout</span>
              </div>
              <div className="text-emerald-300 font-mono text-xs overflow-x-auto whitespace-pre">
                {lastExecutedPython}
              </div>
            </div>
          </div>
        </div>

        {/* Right: History & Python Equivalent Operations */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* History Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-slate-200 font-medium text-sm">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Histórico de Cálculos</span>
                <span className="text-xs text-slate-500">({history.length})</span>
              </div>
              {history.length > 0 && (
                <button
                  onClick={onClearHistory}
                  className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
                >
                  Limpar
                </button>
              )}
            </div>

            <div className="mt-4 max-h-[300px] overflow-y-auto space-y-2 pr-1">
              {history.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  <p>Nenhum cálculo realizado ainda.</p>
                  <p className="mt-1 text-slate-600">Use os botões ou o teclado para calcular.</p>
                </div>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all text-xs font-mono group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">{item.opName}</span>
                      <span className="text-slate-500 text-[10px]">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-1">
                      <span className="text-slate-200 text-sm font-semibold">
                        {item.pythonExpression} ={' '}
                        <span className="text-emerald-400">{item.result}</span>
                      </span>

                      <button
                        onClick={() => copyToClipboard(item.pythonFunctionCall, item.id)}
                        title="Copiar chamada Python"
                        className="p-1 rounded text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="mt-1 text-[11px] text-blue-400/80">
                      &gt;&gt;&gt; {item.pythonFunctionCall}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Python 4 Operations Quick Reference Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <span>As 4 Operações em Python</span>
            </h3>

            <div className="grid grid-cols-2 gap-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-blue-400 font-bold flex items-center justify-between">
                  <span>+ Adição</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                </div>
                <div className="text-slate-300 mt-1">a + b</div>
                <div className="text-[11px] text-slate-500 mt-0.5">adicao(a, b)</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-blue-400 font-bold flex items-center justify-between">
                  <span>− Subtração</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                </div>
                <div className="text-slate-300 mt-1">a - b</div>
                <div className="text-[11px] text-slate-500 mt-0.5">subtracao(a, b)</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-blue-400 font-bold flex items-center justify-between">
                  <span>× Multiplicação</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                </div>
                <div className="text-slate-300 mt-1">a * b</div>
                <div className="text-[11px] text-slate-500 mt-0.5">multiplicacao(a, b)</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-blue-400 font-bold flex items-center justify-between">
                  <span>÷ Divisão</span>
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                </div>
                <div className="text-slate-300 mt-1">a / b</div>
                <div className="text-[11px] text-slate-500 mt-0.5">ZeroDivisionError se b=0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
