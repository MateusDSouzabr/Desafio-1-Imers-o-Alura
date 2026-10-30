import React, { useState } from 'react';
import { Cpu, Variable, GitBranch, ArrowRight, CheckCircle2, AlertTriangle, Layers, HelpCircle, Terminal } from 'lucide-react';

interface VariableInfo {
  name: string;
  type: string;
  scope: string;
  lifecycle: string;
  description: string;
  exampleValue: string;
}

export const LogicAndVariablesExplainer: React.FC = () => {
  const [selectedOpcao, setSelectedOpcao] = useState<string>('1');
  const [inputNum1, setInputNum1] = useState<number>(20);
  const [inputNum2, setInputNum2] = useState<number>(5);
  const [filterScope, setFilterScope] = useState<'all' | 'main' | 'functions' | 'exception'>('all');

  const variablesList: VariableInfo[] = [
    {
      name: 'opcao',
      type: 'str (String / Texto)',
      scope: 'Local da função main()',
      lifecycle: 'Criada no input("Escolha uma opção: ") a cada iteração do laço.',
      description: 'Armazena a escolha de operação do menu que o usuário digitou no teclado ("1", "2", "3", "4" ou "5"). Permanece como texto (string) para facilitar a validação.',
      exampleValue: `"${selectedOpcao}"`,
    },
    {
      name: 'num1',
      type: 'float (Ponto Flutuante)',
      scope: 'Local da função main()',
      lifecycle: 'Lida pela função obter_numero() e convertida com float().',
      description: 'Guarda o primeiro número digitado pelo usuário. É passado como primeiro argumento para a função matemática escolhida.',
      exampleValue: `${inputNum1}.0`,
    },
    {
      name: 'num2',
      type: 'float (Ponto Flutuante)',
      scope: 'Local da função main()',
      lifecycle: 'Lida pela função obter_numero() e convertida com float().',
      description: 'Guarda o segundo número digitado pelo usuário. É passado como divisor ou subtraendo/multiplicador.',
      exampleValue: `${inputNum2}.0`,
    },
    {
      name: 'a',
      type: 'float (Parâmetro)',
      scope: 'Local de cada função (adicao, subtracao, etc.)',
      lifecycle: 'Existe apenas durante a execução da função chamada.',
      description: 'Parâmetro formal da função. Recebe uma cópia da referência do valor contido na variável num1.',
      exampleValue: `${inputNum1}.0`,
    },
    {
      name: 'b',
      type: 'float (Parâmetro)',
      scope: 'Local de cada função (adicao, subtracao, etc.)',
      lifecycle: 'Existe apenas durante a execução da função chamada.',
      description: 'Parâmetro formal da função. Recebe o valor de num2. Na divisão, é testado se b == 0.',
      exampleValue: `${inputNum2}.0`,
    },
    {
      name: 'resultado',
      type: 'float (Ponto Flutuante)',
      scope: 'Local da função main()',
      lifecycle: 'Recebe o valor retornado (return) pela função executada.',
      description: 'Armazena o resultado numérico final do cálculo para ser impresso na tela.',
      exampleValue:
        selectedOpcao === '1'
          ? `${inputNum1 + inputNum2}.0`
          : selectedOpcao === '2'
          ? `${inputNum1 - inputNum2}.0`
          : selectedOpcao === '3'
          ? `${inputNum1 * inputNum2}.0`
          : selectedOpcao === '4'
          ? inputNum2 === 0
            ? 'Não definido (Erro)'
            : `${inputNum1 / inputNum2}`
          : 'None',
    },
    {
      name: 'operador',
      type: 'str (String / Texto)',
      scope: 'Local da função main()',
      lifecycle: 'Atribuído dentro do bloco if/elif correspondente.',
      description: 'Guarda o caractere do símbolo matemático ("+", "-", "*" ou "/") usado apenas para embelezar a mensagem impressa no terminal.',
      exampleValue:
        selectedOpcao === '1'
          ? '"+"'
          : selectedOpcao === '2'
          ? '"-"'
          : selectedOpcao === '3'
          ? '"*"'
          : selectedOpcao === '4'
          ? '"/"'
          : '""',
    },
    {
      name: 'erro',
      type: 'ZeroDivisionError (Objeto de Exceção)',
      scope: 'Bloco except ZeroDivisionError as erro',
      lifecycle: 'Existe somente quando ocorre divisão por zero.',
      description: 'Instância da classe de exceção ZeroDivisionError capturada caso num2 seja zero.',
      exampleValue: inputNum2 === 0 && selectedOpcao === '4' ? 'ZeroDivisionError("Divisão por zero!")' : 'Inativo',
    },
    {
      name: 'continuar',
      type: 'str (String / Texto)',
      scope: 'Local da função main()',
      lifecycle: 'Lida ao final de cada rodada com input().',
      description: 'Controla se o laço while True deve continuar rodando ou se deve ser interrompido com o comando break.',
      exampleValue: '"s" ou "n"',
    },
  ];

  const filteredVars = variablesList.filter((v) => {
    if (filterScope === 'main') return v.scope.includes('main()');
    if (filterScope === 'functions') return v.scope.includes('Local de cada função');
    if (filterScope === 'exception') return v.name === 'erro';
    return true;
  });

  const getDecisionBranch = (op: string) => {
    switch (op) {
      case '1':
        return {
          condition: 'opcao == "1"',
          funcCalled: 'adicao(num1, num2)',
          codeLine: 'resultado = adicao(num1, num2)\noperador = "+"',
          explanation: 'O Python compara a string opcao com "1". Sendo True, executa a função adicao() somando os valores.',
          color: 'text-blue-400',
        };
      case '2':
        return {
          condition: 'opcao == "2"',
          funcCalled: 'subtracao(num1, num2)',
          codeLine: 'resultado = subtracao(num1, num2)\noperador = "-"',
          explanation: 'A condição opcao == "2" é verdadeira. O interpretador chama a função subtracao() diminuindo num2 de num1.',
          color: 'text-amber-400',
        };
      case '3':
        return {
          condition: 'opcao == "3"',
          funcCalled: 'multiplicacao(num1, num2)',
          codeLine: 'resultado = multiplicacao(num1, num2)\noperador = "*"',
          explanation: 'A condição opcao == "3" é satisfeita. Chama multiplicacao(), retornando o produto num1 * num2.',
          color: 'text-purple-400',
        };
      case '4':
        return {
          condition: 'opcao == "4"',
          funcCalled: 'divisao(num1, num2)',
          codeLine: 'resultado = divisao(num1, num2)\noperador = "/"',
          explanation: 'A condição opcao == "4" é verdadeira. Executa divisao(). Se num2 for 0, lança ZeroDivisionError.',
          color: 'text-rose-400',
        };
      case '5':
        return {
          condition: 'opcao == "5"',
          funcCalled: 'Nenhuma função matemática',
          codeLine: 'print("Encerrando...")\nbreak',
          explanation: 'O comando break interrompe imediatamente o laço while True e encerra o programa.',
          color: 'text-slate-400',
        };
      default:
        return {
          condition: 'opcao not in ("1", "2", "3", "4", "5")',
          funcCalled: 'Nenhuma função',
          codeLine: 'print("Opção inválida!")\ncontinue',
          explanation: 'A opção não existe. O comando continue volta imediatamente para o topo do while True para solicitar nova opção.',
          color: 'text-rose-400',
        };
    }
  };

  const branch = getDecisionBranch(selectedOpcao);

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-8">
      {/* Hero */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-slate-100">
            Como a Aplicação Decide Qual Função Usar & Guia de Variáveis
          </h2>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
          Entenda a fundo os dois pilares da execução: a <strong>estrutura de decisão condicional</strong> (como o Python seleciona a operação) e o <strong>mapa de memória das variáveis</strong> (o que cada nome armazena e seu tempo de vida no código).
        </p>
      </div>

      {/* SECTION 1: COMO DECIDE QUAL FUNÇÃO USAR */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-semibold text-slate-100">
              1. Como a Aplicação Decide Qual Função Usar?
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500">Fluxo Condicional if / elif / else</span>
        </div>

        {/* 3 Steps of Decision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-blue-400 font-bold mb-1 font-mono">Etapa A: Leitura (Input)</div>
            <p className="text-slate-300 leading-relaxed">
              O Python lê a digitação do usuário via <code className="text-amber-300">input("Escolha...")</code> e guarda na variável <code className="text-teal-300">opcao</code> como texto (<code className="text-emerald-300">str</code>).
            </p>
            <div className="mt-2 font-mono text-[11px] text-slate-500 bg-slate-900/60 p-2 rounded">
              opcao = input().strip()
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-amber-400 font-bold mb-1 font-mono">Etapa B: Validação Prévia</div>
            <p className="text-slate-300 leading-relaxed">
              Antes de pedir os números, o Python verifica se o texto está na tupla de opções válidas com <code className="text-amber-300">not in</code>. Se for inválido, usa <code className="text-purple-300">continue</code> para reiniciar o loop.
            </p>
            <div className="mt-2 font-mono text-[11px] text-slate-500 bg-slate-900/60 p-2 rounded">
              if opcao not in ("1","2","3","4"): continue
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-emerald-400 font-bold mb-1 font-mono">Etapa C: Despacho Condicional</div>
            <p className="text-slate-300 leading-relaxed">
              O bloco <code className="text-amber-300">if / elif</code> compara a variável <code className="text-teal-300">opcao</code> sequencialmente de cima para baixo. O primeiro teste que der <code className="text-emerald-300">True</code> tem seu bloco executado.
            </p>
            <div className="mt-2 font-mono text-[11px] text-slate-500 bg-slate-900/60 p-2 rounded">
              if opcao == "1": adicao(...)
            </div>
          </div>
        </div>

        {/* Interactive Decision Simulator */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90">
          <div className="text-xs font-semibold text-slate-300 mb-3 flex items-center justify-between">
            <span>Simulador Interativo da Decisão: Alterne a opção para ver o ramo acionado</span>
            <span className="text-blue-400 font-mono text-[11px]">opcao = "{selectedOpcao}"</span>
          </div>

          {/* Options button bar */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { val: '1', label: 'Opção 1 (Adição)' },
              { val: '2', label: 'Opção 2 (Subtração)' },
              { val: '3', label: 'Opção 3 (Multiplicação)' },
              { val: '4', label: 'Opção 4 (Divisão)' },
              { val: '5', label: 'Opção 5 (Sair)' },
              { val: '99', label: 'Opção 99 (Inválida)' },
            ].map((item) => (
              <button
                key={item.val}
                onClick={() => setSelectedOpcao(item.val)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  selectedOpcao === item.val
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Result of the decision branch */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* Visual evaluation code */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-slate-500 text-[11px]">Linha de decisão avaliada pelo Python:</div>
              <div className="text-amber-300 font-semibold text-sm">
                {branch.condition}
              </div>
              <div className="text-emerald-400 whitespace-pre text-xs pt-1 border-t border-slate-800">
                {branch.codeLine}
              </div>
            </div>

            {/* Explanation of the branch */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="text-slate-500 text-[11px]">Função acionada:</div>
                <div className={`text-sm font-bold mt-0.5 ${branch.color}`}>
                  {branch.funcCalled}
                </div>
                <p className="text-slate-300 text-xs font-sans mt-2 leading-relaxed">
                  {branch.explanation}
                </p>
              </div>

              {selectedOpcao === '4' && (
                <div className="mt-3 p-2 rounded bg-rose-950/40 border border-rose-800/50 text-[11px] font-sans text-rose-300">
                  ⚠️ <strong>Atenção:</strong> Na divisão, a função interna <code className="font-mono">divisao()</code> ainda realiza uma segunda decisão: se <code className="font-mono">b == 0</code>, ela lança a exceção <code className="font-mono">ZeroDivisionError</code>.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: QUAIS AS VARIÁVEIS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Variable className="w-5 h-5 text-teal-400" />
            <h3 className="text-base font-semibold text-slate-100">
              2. Quais São as Variáveis do Programa?
            </h3>
          </div>

          {/* Scope Filters */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterScope('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterScope === 'all' ? 'bg-slate-800 text-slate-100 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Todas ({variablesList.length})
            </button>
            <button
              onClick={() => setFilterScope('main')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterScope === 'main' ? 'bg-slate-800 text-slate-100 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Escopo main()
            </button>
            <button
              onClick={() => setFilterScope('functions')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterScope === 'functions' ? 'bg-slate-800 text-slate-100 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Parâmetros (a, b)
            </button>
            <button
              onClick={() => setFilterScope('exception')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                filterScope === 'exception' ? 'bg-slate-800 text-slate-100 font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Exceção (erro)
            </button>
          </div>
        </div>

        {/* Variables Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVars.map((v) => (
            <div
              key={v.name}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-base font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    {v.name}
                  </span>
                  <span className="text-[11px] font-mono text-teal-300">
                    {v.type}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-blue-400/90 mb-2">
                  📍 {v.scope}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {v.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-900/80 font-mono text-[11px] flex items-center justify-between">
                <span className="text-slate-500">Valor exemplo:</span>
                <span className="text-emerald-400 font-semibold">{v.exampleValue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: MAPA DE MEMÓRIA DINÂMICA (EXPERIMENTO AO VIVO) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Layers className="w-5 h-5 text-purple-400" />
          <h3 className="text-base font-semibold text-slate-100">
            3. Inspetor de Memória em Tempo Real
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          Altere os valores de <code className="text-amber-300">num1</code> e <code className="text-amber-300">num2</code> abaixo e veja a memória alocada pelo interpretador Python se ajustando instantaneamente:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              num1: float =
            </label>
            <input
              type="number"
              value={inputNum1}
              onChange={(e) => setInputNum1(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              num2: float =
            </label>
            <input
              type="number"
              value={inputNum2}
              onChange={(e) => setInputNum2(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-100 font-mono focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Live memory table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 mt-4">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-4">Identificador</th>
                <th className="py-2.5 px-4">Tipo em Python</th>
                <th className="py-2.5 px-4">Valor Atual em Memória</th>
                <th className="py-2.5 px-4">Destino no Código</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950/40">
              <tr>
                <td className="py-2.5 px-4 font-bold text-amber-400">opcao</td>
                <td className="py-2.5 px-4 text-teal-300">str</td>
                <td className="py-2.5 px-4 text-emerald-400">"{selectedOpcao}"</td>
                <td className="py-2.5 px-4 text-slate-400">Compara nos if/elif para decidir</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-amber-400">num1</td>
                <td className="py-2.5 px-4 text-teal-300">float</td>
                <td className="py-2.5 px-4 text-emerald-400">{inputNum1}</td>
                <td className="py-2.5 px-4 text-slate-400">Passado como argumento 'a'</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-amber-400">num2</td>
                <td className="py-2.5 px-4 text-teal-300">float</td>
                <td className="py-2.5 px-4 text-emerald-400">{inputNum2}</td>
                <td className="py-2.5 px-4 text-slate-400">Passado como argumento 'b'</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-amber-400">operador</td>
                <td className="py-2.5 px-4 text-teal-300">str</td>
                <td className="py-2.5 px-4 text-emerald-400">
                  {selectedOpcao === '1' ? '"+"' : selectedOpcao === '2' ? '"-"' : selectedOpcao === '3' ? '"*"' : selectedOpcao === '4' ? '"/"' : '""'}
                </td>
                <td className="py-2.5 px-4 text-slate-400">Usado na formatação f"{'{num1}'} {'{operador}'}..."</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-bold text-amber-400">resultado</td>
                <td className="py-2.5 px-4 text-teal-300">float</td>
                <td className="py-2.5 px-4 text-emerald-400">
                  {selectedOpcao === '1'
                    ? inputNum1 + inputNum2
                    : selectedOpcao === '2'
                    ? inputNum1 - inputNum2
                    : selectedOpcao === '3'
                    ? inputNum1 * inputNum2
                    : selectedOpcao === '4'
                    ? inputNum2 === 0
                      ? 'Exceção ZeroDivisionError'
                      : inputNum1 / inputNum2
                    : 'Nenhum'}
                </td>
                <td className="py-2.5 px-4 text-slate-400">Impresso no terminal com print()</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
