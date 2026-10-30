import React from 'react';
import { BookOpen, CheckCircle2, AlertOctagon, Terminal, HelpCircle, Code } from 'lucide-react';

export const PythonGuide: React.FC = () => {
  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-semibold text-slate-100">
            Guia Completo: Operações Matemáticas em Python
          </h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Python possui operadores aritméticos nativos muito intuitivos e expressivos. A seguir, você encontra os detalhes sobre como o Python calcula cada uma das 4 operações básicas e as regras essenciais para lidar com tipos numéricos e erros.
        </p>
      </div>

      {/* Grid of the 4 basic operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Adição */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono">
                +
              </span>
              <span>1. Adição</span>
            </h3>
            <span className="font-mono text-xs text-slate-500">Operador: +</span>
          </div>

          <div className="mt-3 text-xs text-slate-300 space-y-2">
            <p>Soma dois valores numéricos (inteiros ou decimais).</p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-emerald-300 text-xs">
              <div>&gt;&gt;&gt; 15 + 25</div>
              <div className="text-slate-400">40</div>
              <div className="mt-1">&gt;&gt;&gt; 10.5 + 4.2</div>
              <div className="text-slate-400">14.7</div>
            </div>
            <p className="text-[11px] text-slate-400">
              💡 Curiosidade: O operador <code className="text-amber-300">+</code> em Python também serve para concatenar strings (<code className="text-slate-300">"Olá " + "Mundo"</code>).
            </p>
          </div>
        </div>

        {/* 2. Subtração */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono">
                −
              </span>
              <span>2. Subtração</span>
            </h3>
            <span className="font-mono text-xs text-slate-500">Operador: -</span>
          </div>

          <div className="mt-3 text-xs text-slate-300 space-y-2">
            <p>Calcula a diferença entre dois números.</p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-emerald-300 text-xs">
              <div>&gt;&gt;&gt; 50 - 18</div>
              <div className="text-slate-400">32</div>
              <div className="mt-1">&gt;&gt;&gt; 5 - 12</div>
              <div className="text-slate-400">-7</div>
            </div>
            <p className="text-[11px] text-slate-400">
              💡 Suporta números negativos e precisão de ponto flutuante automática.
            </p>
          </div>
        </div>

        {/* 3. Multiplicação */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono">
                *
              </span>
              <span>3. Multiplicação</span>
            </h3>
            <span className="font-mono text-xs text-slate-500">Operador: *</span>
          </div>

          <div className="mt-3 text-xs text-slate-300 space-y-2">
            <p>Calcula o produto de dois números.</p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-emerald-300 text-xs">
              <div>&gt;&gt;&gt; 8 * 7</div>
              <div className="text-slate-400">56</div>
              <div className="mt-1">&gt;&gt;&gt; 2.5 * 4</div>
              <div className="text-slate-400">10.0</div>
            </div>
            <p className="text-[11px] text-slate-400">
              💡 Em Python, você também pode usar <code className="text-amber-300">**</code> para potenciação (ex: <code className="text-slate-300">2 ** 3 = 8</code>).
            </p>
          </div>
        </div>

        {/* 4. Divisão */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono">
                /
              </span>
              <span>4. Divisão</span>
            </h3>
            <span className="font-mono text-xs text-slate-500">Operador: /</span>
          </div>

          <div className="mt-3 text-xs text-slate-300 space-y-2">
            <p>Calcula a divisão real de dois números (sempre retorna <code className="text-teal-300">float</code> no Python 3).</p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 font-mono text-emerald-300 text-xs">
              <div>&gt;&gt;&gt; 10 / 2</div>
              <div className="text-slate-400">5.0  # Retorna float!</div>
              <div className="mt-1">&gt;&gt;&gt; 7 / 2</div>
              <div className="text-slate-400">3.5</div>
            </div>
            <div className="flex items-start gap-1.5 p-2 rounded-lg bg-rose-950/30 border border-rose-800/40 text-[11px] text-rose-300">
              <AlertOctagon className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Divisão por zero gera a exceção <code className="font-mono text-rose-200">ZeroDivisionError</code>! Sempre verifique <code className="font-mono">if b == 0</code> ou use <code className="font-mono">try...except</code>.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Python concepts: Type Hints & Error Handling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tratamento de Erros */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-3">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>Tratamento de Exceções com try / except</span>
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Em programas reais, o usuário pode digitar letras em vez de números ou tentar dividir por zero. No Python, lidamos com isso usando blocos <code className="text-amber-400 font-mono">try...except</code>:
          </p>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto">
            <pre>
              <span className="text-amber-400">try</span>:
              {'\n'}    num = <span className="text-cyan-400">float</span>(<span className="text-cyan-400">input</span>(<span className="text-emerald-300">"Digite um número: "</span>))
              {'\n'}    resultado = a / b
              {'\n'}<span className="text-amber-400">except</span> <span className="text-cyan-400">ValueError</span>:
              {'\n'}    <span className="text-cyan-400">print</span>(<span className="text-emerald-300">"Entrada inválida! Digite apenas números."</span>)
              {'\n'}<span className="text-amber-400">except</span> <span className="text-cyan-400">ZeroDivisionError</span>:
              {'\n'}    <span className="text-cyan-400">print</span>(<span className="text-emerald-300">"Não é possível dividir por zero!"</span>)
            </pre>
          </div>
        </div>

        {/* Tipagem Estática (Type Hints) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-3">
            <Code className="w-4 h-4 text-teal-400" />
            <span>Type Hints & PEP 8</span>
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Desde o Python 3.5+, podemos declarar os tipos esperados das variáveis e retornos com anotações de tipo (<code className="text-teal-300 font-mono">Type Hints</code>), tornando o código limpo e autodocumentado:
          </p>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto">
            <pre>
              <span className="text-amber-400">def</span> <span className="text-cyan-400">adicao</span>(a: <span className="text-teal-300">float</span>, b: <span className="text-teal-300">float</span>) -&gt; <span className="text-teal-300">float</span>:
              {'\n'}    <span className="text-slate-500">"""Retorna a soma de dois floats."""</span>
              {'\n'}    <span className="text-amber-400">return</span> a + b
            </pre>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Facilita a leitura, autocompletar em IDEs (VS Code, PyCharm) e validação com MyPy.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
