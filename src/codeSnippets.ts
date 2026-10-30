export interface CodeSnippet {
  id: string;
  title: string;
  filename: string;
  description: string;
  code: string;
  keyFeatures: string[];
}

export const PYTHON_SNIPPETS: Record<string, CodeSnippet> = {
  cli: {
    id: 'cli',
    title: 'Script Interativo (CLI Padrão)',
    filename: 'calculadora.py',
    description: 'Código Python padrão com as 4 operações básicas em funções separadas, menu interativo no terminal e tratamento robusto de erros.',
    keyFeatures: [
      'Funções modulares com anotações de tipo (Type Hints: float)',
      'Tratamento de divisão por zero (ZeroDivisionError)',
      'Validação de entrada com try/except para evitar falhas se o usuário digitar letras',
      'Laço contínuo while True com opção de sair',
    ],
    code: `"""
Calculadora Básica em Python
Autor: Criado para atender às 4 operações fundamentais
Operações: Adição (+), Subtração (-), Multiplicação (*) e Divisão (/)
"""

def adicao(a: float, b: float) -> float:
    """Retorna a soma de a e b."""
    return a + b

def subtracao(a: float, b: float) -> float:
    """Retorna a diferença entre a e b."""
    return a - b

def multiplicacao(a: float, b: float) -> float:
    """Retorna o produto de a e b."""
    return a * b

def divisao(a: float, b: float) -> float:
    """Retorna o quociente de a por b. Trata divisão por zero."""
    if b == 0:
        raise ZeroDivisionError("Erro: Não é permitido divisão por zero!")
    return a / b

def exibir_menu() -> None:
    """Exibe o menu de opções para o usuário."""
    print("\\n" + "=" * 35)
    print("      CALCULADORA EM PYTHON")
    print("=" * 35)
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Sair")
    print("=" * 35)

def obter_numero(mensagem: str) -> float:
    """Solicita um número ao usuário com validação de entrada."""
    while True:
        try:
            return float(input(mensagem))
        except ValueError:
            print("❌ Entrada inválida! Por favor, digite um número válido.")

def main():
    """Função principal que orquestra a execução da calculadora."""
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (1-5): ").strip()

        if opcao == "5":
            print("\\nObrigado por usar a calculadora! Encerrando...")
            break

        if opcao not in ("1", "2", "3", "4"):
            print("❌ Opção inválida! Escolha um número entre 1 e 5.")
            continue

        num1 = obter_numero("\\nDigite o primeiro número: ")
        num2 = obter_numero("Digite o segundo número: ")

        try:
            if opcao == "1":
                resultado = adicao(num1, num2)
                operador = "+"
            elif opcao == "2":
                resultado = subtracao(num1, num2)
                operador = "-"
            elif opcao == "3":
                resultado = multiplicacao(num1, num2)
                operador = "*"
            elif opcao == "4":
                resultado = divisao(num1, num2)
                operador = "/"

            print(f"\\n✅ Resultado: {num1} {operador} {num2} = {resultado}")

        except ZeroDivisionError as erro:
            print(f"\\n❌ {erro}")

        # Pergunta se deseja realizar outro cálculo
        continuar = input("\\nDeseja fazer outro cálculo? (s/n): ").strip().lower()
        if continuar != "s":
            print("\\nPrograma finalizado. Até logo!")
            break

if __name__ == "__main__":
    main()
`,
  },
  oop: {
    id: 'oop',
    title: 'Orientada a Objetos (Classe)',
    filename: 'calculadora_oo.py',
    description: 'Abordagem profissional em Programação Orientada a Objetos (POO) com classe Calculadora, histórico em memória e métodos encadeáveis.',
    keyFeatures: [
      'Encapsulamento com class Calculadora',
      'Histórico persistido em lista de tuplas/dicionários',
      'Métodos limpos e reutilizáveis em outros scripts',
    ],
    code: `"""
Calculadora Orientada a Objetos em Python
"""
from typing import List, Dict, Any

class Calculadora:
    """Classe que representa uma calculadora com 4 operações básicas e histórico."""

    def __init__(self):
        self.historico: List[Dict[str, Any]] = []

    def adicionar(self, a: float, b: float) -> float:
        resultado = a + b
        self._salvar_historico(a, "+", b, resultado)
        return resultado

    def subtrair(self, a: float, b: float) -> float:
        resultado = a - b
        self._salvar_historico(a, "-", b, resultado)
        return resultado

    def multiplicar(self, a: float, b: float) -> float:
        resultado = a * b
        self._salvar_historico(a, "*", b, resultado)
        return resultado

    def dividir(self, a: float, b: float) -> float:
        if b == 0:
            raise ZeroDivisionError("Divisão por zero não é permitida.")
        resultado = a / b
        self._salvar_historico(a, "/", b, resultado)
        return resultado

    def _salvar_historico(self, a: float, op: str, b: float, res: float) -> None:
        self.historico.append({
            "operacao": f"{a} {op} {b}",
            "resultado": res
        })

    def exibir_historico(self) -> None:
        print("\\n--- Histórico de Operações ---")
        if not self.historico:
            print("Nenhum cálculo realizado ainda.")
            return
        for i, item in enumerate(self.historico, start=1):
            print(f"{i}. {item['operacao']} = {item['resultado']}")

# Exemplo de uso:
if __name__ == "__main__":
    calc = Calculadora()
    print("Soma:", calc.adicionar(10, 5))
    print("Subtração:", calc.subtrair(20, 8))
    print("Multiplicação:", calc.multiplicar(6, 7))
    print("Divisão:", calc.dividir(50, 2))
    calc.exibir_historico()
`,
  },
  functional: {
    id: 'functional',
    title: 'Pythonic / Dicionário de Funções',
    filename: 'calculadora_funcional.py',
    description: 'Código conciso e elegante usando operadores nativos do módulo operator e despacho por dicionário (Dictionary Dispatch).',
    keyFeatures: [
      'Uso do módulo nativo operator (add, sub, mul, truediv)',
      'Dicionário como tabela de despacho em vez de múltiplos if/elif',
      'Código limpo, expansível e de alta performance',
    ],
    code: `"""
Calculadora Funcional e Concisa em Python
"""
import operator

# Tabela de operações mapeando símbolos para funções nativas do Python
OPERACOES = {
    "+": ("Adição", operator.add),
    "-": ("Subtração", operator.sub),
    "*": ("Multiplicação", operator.mul),
    "/": ("Divisão", operator.truediv),
}

def calcular(a: float, operador: str, b: float) -> float:
    """Executa a operação matemática correspondente ao operador informado."""
    if operador not in OPERACOES:
        raise ValueError(f"Operador '{operador}' inválido. Use +, -, * ou /")
    
    if operador == "/" and b == 0:
        raise ZeroDivisionError("Erro: Impossível dividir por zero!")

    _, funcao = OPERACOES[operador]
    return funcao(a, b)

# Demonstração rápida
if __name__ == "__main__":
    print("15 + 25 =", calcular(15, "+", 25))
    print("100 - 35 =", calcular(100, "-", 35))
    print("8 * 9 =", calcular(8, "*", 9))
    print("144 / 12 =", calcular(144, "/", 12))
`,
  },
  tests: {
    id: 'tests',
    title: 'Testes Automatizados (unittest)',
    filename: 'test_calculadora.py',
    description: 'Testes unitários automatizados para garantir que todas as 4 operações funcionem corretamente, incluindo o teste de ZeroDivisionError.',
    keyFeatures: [
      'Módulo nativo unittest do Python',
      'Testes com números positivos, negativos e decimais (float)',
      'assertRaises para validar a exceção de divisão por zero',
    ],
    code: `"""
Testes Unitários para a Calculadora Python
Execute com: python -m unittest test_calculadora.py
"""
import unittest

def adicao(a, b): return a + b
def subtracao(a, b): return a - b
def multiplicacao(a, b): return a * b
def divisao(a, b):
    if b == 0:
        raise ZeroDivisionError("Divisão por zero!")
    return a / b

class TestCalculadora(unittest.TestCase):

    def test_adicao(self):
        self.assertEqual(adicao(10, 5), 15)
        self.assertEqual(adicao(-3, 3), 0)
        self.assertAlmostEqual(adicao(0.1, 0.2), 0.3, places=7)

    def test_subtracao(self):
        self.assertEqual(subtracao(20, 8), 12)
        self.assertEqual(subtracao(5, 10), -5)

    def test_multiplicacao(self):
        self.assertEqual(multiplicacao(4, 5), 20)
        self.assertEqual(multiplicacao(-3, 4), -12)
        self.assertEqual(multiplicacao(100, 0), 0)

    def test_divisao(self):
        self.assertEqual(divisao(20, 4), 5.0)
        self.assertEqual(divisao(7, 2), 3.5)

    def test_divisao_por_zero(self):
        with self.assertRaises(ZeroDivisionError):
            divisao(10, 0)

if __name__ == "__main__":
    unittest.main()
`,
  },
  readme: {
    id: 'readme',
    title: 'README.md (Documentação Completa)',
    filename: 'README.md',
    description: 'Documento completo explicando toda a arquitetura, estrutura das 4 operações básicas, tomada de decisão condicional, variáveis e guia de execução.',
    keyFeatures: [
      'Explicação aprofundada da lógica if/elif de decisão',
      'Tabela descritiva de todas as variáveis e escopos',
      'Guia de tratamento de exceções (ZeroDivisionError e ValueError)',
      'Instruções de execução no terminal Windows, Linux e macOS',
    ],
    code: `# 🧮 Calculadora Python — 4 Operações Básicas

Uma aplicação educacional e prática desenvolvida em **Python 3** implementando as quatro operações aritméticas fundamentais (**Adição**, **Subtração**, **Multiplicação** e **Divisão**), com tratamento de erros, validações de entrada, múltiplos paradigmas de código e uma interface gráfica interativa com terminal embutido.

---

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Estrutura do Código Python](#-estrutura-do-código-python)
- [Como a Aplicação Decide Qual Função Usar](#-como-a-aplicação-decide-qual-função-usar)
- [Dicionário de Variáveis e Escopos](#-dicionário-de-variáveis-e-escopos)
- [Tratamento de Exceções e Segurança](#-tratamento-de-exceções-e-segurança)
- [Paradigmas Disponíveis](#-paradigmas-disponíveis)
- [Como Executar no seu Computador](#-como-executar-no-seu-computador)
- [Recursos da Aplicação Web](#-recursos-da-aplicação-web)

---

## 🌟 Visão Geral

O projeto tem como objetivo demonstrar como construir uma calculadora robusta, limpa e modular em Python, seguindo os padrões da **PEP 8**, boas práticas de tipagem estática (*Type Hints*) e arquitetura defensiva contra entradas inválidas e divisão por zero.

---

## 🧩 Estrutura do Código Python

O script principal (\`calculadora.py\`) é estruturado em blocos funcionais independentes:

\`\`\`
calculadora.py
 ├── adicao(a, b)          -> Retorna a soma (a + b)
 ├── subtracao(a, b)       -> Retorna a diferença (a - b)
 ├── multiplicacao(a, b)   -> Retorna o produto (a * b)
 ├── divisao(a, b)         -> Retorna o quociente (a / b) com verificação de zero
 ├── exibir_menu()         -> Renderiza o menu no terminal
 ├── obter_numero(msg)     -> Valida entrada com try/except ValueError
 └── main()                -> Loop contínuo (while True) e despacho condicional
\`\`\`

---

## 🔀 Como a Aplicação Decide Qual Função Usar

A seleção da função ocorre por meio de uma **estrutura de despacho condicional** (\`if / elif / else\`) baseada na entrada digitada pelo usuário.

### Fluxograma do Processo de Decisão:

\`\`\`
                ┌─────────────────────────────────┐
                │   Exibe Menu e lê com input()   │
                └────────────────┬────────────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │ Guarda em 'opcao'     │
                     └───────────┬───────────┘
                                 │
              ┌──────────────────┴──────────────────┐
              ▼ (Inválida)                          ▼ (Válida)
    ┌───────────────────┐                  ┌─────────────────┐
    │ if opcao not in   │                  │  Pede num1 e    │
    │   ("1","2","3","4")                  │  num2 ao usuário│
    │ continue (reinicia)                  └────────┬────────┘
    └───────────────────┘                           │
                                                    ▼
                             ┌──────────────────────────────────────────────┐
                             │    Avaliação das Condições Sequenciais       │
                             └──────────────────────┬───────────────────────┘
                                                    │
                 ┌───────────────┬──────────────────┼───────────────┬───────────────┐
                 ▼               ▼                  ▼               ▼               ▼
           opcao == "1"    opcao == "2"       opcao == "3"    opcao == "4"    opcao == "5"
                 │               │                  │               │               │
                 ▼               ▼                  ▼               ▼               ▼
              adicao()       subtracao()      multiplicacao()    divisao()        break
                 │               │                  │               │          (encerra)
                 │               │                  │        (se b==0: raise)
                 └───────────────┴──────────────────┼───────────────┘
                                                    │
                                                    ▼
                                     ┌─────────────────────────────┐
                                     │ Imprime resultado na tela   │
                                     └─────────────────────────────┘
\`\`\`

### Explicação Passo a Passo:

1. **Leitura da Escolha (\`opcao\`)**:
   \`\`\`python
   opcao = input("Escolha uma opção (1-5): ").strip()
   \`\`\`
   O Python lê a opção como texto (\`str\`) para evitar erros caso o usuário digite letras.

2. **Verificação de Saída (\`opcao == "5"\`)**:
   Se o usuário seleciona a opção 5, o comando \`break\` interrompe o laço \`while True\` imediatamente.

3. **Validação de Entrada (\`not in\`)**:
   Caso o valor não seja \`"1"\`, \`"2"\`, \`"3"\` ou \`"4"\`, o programa emite um alerta e usa \`continue\` para voltar ao início do loop sem executar nenhuma operação matemática.

4. **Despacho Sequencial (\`if / elif\`)**:
   - \`opcao == "1"\` ➔ invoca \`adicao(num1, num2)\` e atribui \`operador = "+"\`
   - \`opcao == "2"\` ➔ invoca \`subtracao(num1, num2)\` e atribui \`operador = "-"\`
   - \`opcao == "3"\` ➔ invoca \`multiplicacao(num1, num2)\` e atribui \`operador = "*"\`
   - \`opcao == "4"\` ➔ invoca \`divisao(num1, num2)\` e atribui \`operador = "/"\`

5. **Segunda Decisão Interna (Proteção na Divisão)**:
   Dentro da função \`divisao(a, b)\`, é executada uma verificação de proteção:
   \`\`\`python
   if b == 0:
       raise ZeroDivisionError("Erro: Não é permitido divisão por zero!")
   \`\`\`
   Se \`b\` for \`0\`, a operação aritmética é abortada e a exceção é capturada no bloco \`except ZeroDivisionError\`.

---

## 📊 Dicionário de Variáveis e Escopos

| Nome da Variável | Tipo de Dado (\`type\`) | Escopo | Finalidade / Papel no Sistema |
| :--- | :--- | :--- | :--- |
| **\`opcao\`** | \`str\` | Local de \`main()\` | Armazena o dígito digitado pelo usuário correspondente à opção escolhida no menu. |
| **\`num1\`** | \`float\` | Local de \`main()\` | Armazena o primeiro número real fornecido pelo usuário. |
| **\`num2\`** | \`float\` | Local de \`main()\` | Armazena o segundo número real fornecido (divisor, subtraendo ou multiplicador). |
| **\`resultado\`** | \`float\` | Local de \`main()\` | Guarda o valor retornado (\`return\`) pela função matemática executada. |
| **\`operador\`** | \`str\` | Local de \`main()\` | Guarda o símbolo visual (\`"+"\`, \`"-"\`, \`"*"\` ou \`"/"\`) para exibição amigável. |
| **\`a\`** | \`float\` | Parâmetro das funções | Parâmetro formal que recebe o valor de \`num1\` dentro do escopo da função. |
| **\`b\`** | \`float\` | Parâmetro das funções | Parâmetro formal que recebe o valor de \`num2\` dentro do escopo da função. |
| **\`erro\`** | \`ZeroDivisionError\` | Bloco \`except\` | Objeto de exceção instanciado quando ocorre tentativa de divisão por zero. |
| **\`continuar\`** | \`str\` | Local de \`main()\` | Recebe \`"s"\` ou \`"n"\` para decidir se o ciclo do cálculo deve se repetir. |

---

## 🛡️ Tratamento de Exceções e Segurança

A calculadora é programada defensivamente para não quebrar (*crash*) diante de erros de usuário:

### 1. Entrada Não-Numérica (\`ValueError\`)
Na função \`obter_numero()\`:
\`\`\`python
def obter_numero(mensagem: str) -> float:
    while True:
        try:
            return float(input(mensagem))
        except ValueError:
            print("❌ Entrada inválida! Por favor, digite um número válido.")
\`\`\`
Se o usuário digitar \`"abc"\`, \`",,"\` ou deixar em branco, o \`float()\` levantaria um erro fatal. O bloco \`try...except\` intercepta esse erro e repete a pergunta até obter um número válido.

### 2. Divisão por Zero (\`ZeroDivisionError\`)
Na matemática e no Python, dividir qualquer número por zero é indefinido. A aplicação intercepta e exibe uma mensagem amigável:
\`\`\`python
try:
    resultado = divisao(num1, num2)
except ZeroDivisionError as erro:
    print(f"\\n❌ {erro}")
\`\`\`

---

## 💡 Paradigmas Disponíveis

A aplicação inclui implementações em quatro abordagens:

1. **Script CLI Interativo Padrão (\`calculadora.py\`)**: Ideal para iniciantes, com laço \`while True\` e menu de terminal.
2. **Orientação a Objetos (\`calculadora_oo.py\`)**: Classe \`Calculadora\` com encapsulamento, histórico de operações e métodos de instância.
3. **Pythonic / Tabela de Despacho (\`calculadora_funcional.py\`)**: Dicionário mapeando operadores para funções do módulo nativo \`operator\`.
4. **Testes Unitários (\`test_calculadora.py\`)**: Bateria automatizada com \`unittest\` testando números positivos, negativos, casas decimais e o erro de divisão por zero.

---

## 🚀 Como Executar no seu Computador

### Pré-requisitos
- Python 3.8 ou superior instalado ([python.org](https://www.python.org/downloads/)).

### Passo a Passo

1. Salve o código em um arquivo chamado \`calculadora.py\`.
2. Abra o terminal (Prompt de Comando ou PowerShell no Windows, Terminal no Linux/macOS).
3. Navegue até a pasta do arquivo e execute:

\`\`\`bash
# No Windows
python calculadora.py

# No Linux ou macOS
python3 calculadora.py
\`\`\`

### Para Rodar os Testes Unitários
\`\`\`bash
python -m unittest test_calculadora.py
\`\`\`

---

## 🖥️ Recursos da Aplicação Web Integrada

Esta aplicação conta com uma interface gráfica completa no navegador:

- **Calculadora Visual**: Teclado ergonômico com suporte aos atalhos do teclado físico (\`0-9\`, \`+\`, \`-\`, \`*\`, \`/\`, \`Enter\`, \`Backspace\`, \`Esc\`), histórico de operações e prévia da sintaxe Python executada.
- **Aba Lógica & Variáveis**: Simulador visual interativo da árvore de decisão \`if/elif\` e inspetor de memória em tempo real.
- **Terminal Interativo (REPL)**: Prompt \`>>>\` embutido para testar chamadas avulsas e simulação automática de execução do script.
- **Passo a Passo**: Animação didática mostrando a pilha de execução, variáveis na memória e retorno de valores.
- **Download com 1 Clique**: Botões para baixar o arquivo \`.py\` e o \`README.md\`.

---

Desenvolvido para fins educacionais e didáticos. Bons estudos em Python! 🐍✨
`,
  },
};
