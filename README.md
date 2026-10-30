# 🧮 Calculadora Python — 4 Operações Básicas

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

O script principal (`calculadora.py`) é estruturado em blocos funcionais independentes:

```
calculadora.py
 ├── adicao(a, b)          -> Retorna a soma (a + b)
 ├── subtracao(a, b)       -> Retorna a diferença (a - b)
 ├── multiplicacao(a, b)   -> Retorna o produto (a * b)
 ├── divisao(a, b)         -> Retorna o quociente (a / b) com verificação de zero
 ├── porcentagem(a, b)     -> Retorna a porcentagem ((a * b) / 100)
 ├── exibir_menu()         -> Renderiza o menu no terminal
 ├── obter_numero(msg)     -> Valida entrada com try/except ValueError
 └── main()                -> Loop contínuo (while True) e despacho condicional
```

---

## 🔀 Como a Aplicação Decide Qual Função Usar

A seleção da função ocorre por meio de uma **estrutura de despacho condicional** (`if / elif / else`) baseada na entrada digitada pelo usuário.

### Fluxograma do Processo de Decisão:

```
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
    │("1","2","3","4","5")                 │  num2 ao usuário│
    │continue (reinicia)│                  └────────┬────────┘
    └───────────────────┘                           │
                                                    ▼
                             ┌──────────────────────────────────────────────┐
                             │    Avaliação das Condições Sequenciais       │
                             └──────────────────────┬───────────────────────┘
                                                    │
                 ┌──────────────┬──────────────┬────┴─────────┬──────────────┬──────────────┐
                 ▼              ▼              ▼              ▼              ▼              ▼
           opcao == "1"   opcao == "2"   opcao == "3"   opcao == "4"   opcao == "5"   opcao == "6"
                 │              │              │              │              │              │
                 ▼              ▼              ▼              ▼              ▼              ▼
              adicao()      subtracao()   multiplicacao()  divisao()    porcentagem()     break
                 │              │              │              │              │          (encerra)
                 │              │              │       (se b==0: raise)      │
                 └──────────────┴──────────────┼──────────────┴──────────────┘
                                                    │
                                                    ▼
                                     ┌─────────────────────────────┐
                                     │ Imprime resultado na tela   │
                                     └─────────────────────────────┘
```

### Explicação Passo a Passo:

1. **Leitura da Escolha (`opcao`)**:
   ```python
   opcao = input("Escolha uma opção (1-6): ").strip()
   ```
   O Python lê a opção como texto (`str`) para evitar erros caso o usuário digite letras.

2. **Verificação de Saída (`opcao == "6"`)**:
   Se o usuário seleciona a opção 6, o comando `break` interrompe o laço `while True` imediatamente.

3. **Validação de Entrada (`not in`)**:
   Caso o valor não seja `"1"`, `"2"`, `"3"`, `"4"` ou `"5"`, o programa emite um alerta e usa `continue` para voltar ao início do loop sem executar nenhuma operação matemática.

4. **Despacho Sequencial (`if / elif`)**:
   - `opcao == "1"` ➔ invoca `adicao(num1, num2)` e atribui `operador = "+"`
   - `opcao == "2"` ➔ invoca `subtracao(num1, num2)` e atribui `operador = "-"`
   - `opcao == "3"` ➔ invoca `multiplicacao(num1, num2)` e atribui `operador = "*"`
   - `opcao == "4"` ➔ invoca `divisao(num1, num2)` e atribui `operador = "/"`
   - `opcao == "5"` ➔ invoca `porcentagem(num1, num2)` e atribui `operador = "%"`

5. **Segunda Decisão Interna (Proteção na Divisão)**:
   Dentro da função `divisao(a, b)`, é executada uma verificação de proteção:
   ```python
   if b == 0:
       raise ZeroDivisionError("Erro: Não é permitido divisão por zero!")
   ```
   Se `b` for `0`, a operação aritmética é abortada e a exceção é capturada no bloco `except ZeroDivisionError`.

---

## 📊 Dicionário de Variáveis e Escopos

| Nome da Variável | Tipo de Dado (`type`) | Escopo | Finalidade / Papel no Sistema |
| :--- | :--- | :--- | :--- |
| **`opcao`** | `str` | Local de `main()` | Armazena o dígito digitado pelo usuário correspondente à opção escolhida no menu. |
| **`num1`** | `float` | Local de `main()` | Armazena o primeiro número real fornecido pelo usuário. |
| **`num2`** | `float` | Local de `main()` | Armazena o segundo número real fornecido (divisor, subtraendo ou multiplicador). |
| **`resultado`** | `float` | Local de `main()` | Guarda o valor retornado (`return`) pela função matemática executada. |
| **`operador`** | `str` | Local de `main()` | Guarda o símbolo visual (`"+"`, `"-"`, `"*"`, `"/"` ou `"%"` ) para exibição amigável. |
| **`a`** | `float` | Parâmetro das funções | Parâmetro formal que recebe o valor de `num1` dentro do escopo da função. |
| **`b`** | `float` | Parâmetro das funções | Parâmetro formal que recebe o valor de `num2` dentro do escopo da função. |
| **`erro`** | `ZeroDivisionError` | Bloco `except` | Objeto de exceção instanciado quando ocorre tentativa de divisão por zero. |
| **`continuar`** | `str` | Local de `main()` | Recebe `"s"` ou `"n"` para decidir se o ciclo do cálculo deve se repetir. |

---

## 🛡️ Tratamento de Exceções e Segurança

A calculadora é programada defensivamente para não quebrar (*crash*) diante de erros de usuário:

### 1. Entrada Não-Numérica (`ValueError`)
Na função `obter_numero()`:
```python
def obter_numero(mensagem: str) -> float:
    while True:
        try:
            return float(input(mensagem))
        except ValueError:
            print("❌ Entrada inválida! Por favor, digite um número válido.")
```
Se o usuário digitar `"abc"`, `",,"` ou deixar em branco, o `float()` levantaria um erro fatal. O bloco `try...except` intercepta esse erro e repete a pergunta até obter um número válido.

### 2. Divisão por Zero (`ZeroDivisionError`)
Na matemática e no Python, dividir qualquer número por zero é indefinido. A aplicação intercepta e exibe uma mensagem amigável:
```python
try:
    resultado = divisao(num1, num2)
except ZeroDivisionError as erro:
    print(f"\n❌ {erro}")
```

---

## 💡 Paradigmas Disponíveis

A aplicação inclui implementações em quatro abordagens:

1. **Script CLI Interativo Padrão (`calculadora.py`)**: Ideal para iniciantes, com laço `while True` e menu de terminal.
2. **Orientação a Objetos (`calculadora_oo.py`)**: Classe `Calculadora` com encapsulamento, histórico de operações e métodos de instância.
3. **Pythonic / Tabela de Despacho (`calculadora_funcional.py`)**: Dicionário mapeando operadores para funções do módulo nativo `operator`.
4. **Testes Unitários (`test_calculadora.py`)**: Bateria automatizada com `unittest` testando números positivos, negativos, casas decimais e o erro de divisão por zero.

---

## 🚀 Como Executar no seu Computador

### Pré-requisitos
- Python 3.8 ou superior instalado ([python.org](https://www.python.org/downloads/)).

### Passo a Passo

1. Salve o código em um arquivo chamado `calculadora.py`.
2. Abra o terminal (Prompt de Comando ou PowerShell no Windows, Terminal no Linux/macOS).
3. Navegue até a pasta do arquivo e execute:

```bash
# No Windows
python calculadora.py

# No Linux ou macOS
python3 calculadora.py
```

### Para Rodar os Testes Unitários
```bash
python -m unittest test_calculadora.py
```

---

## 🖥️ Recursos da Aplicação Web Integrada

Esta aplicação conta com uma interface gráfica completa no navegador:

- **Calculadora Visual**: Teclado ergonômico com suporte aos atalhos do teclado físico (`0-9`, `+`, `-`, `*`, `/`, `Enter`, `Backspace`, `Esc`), histórico de operações e prévia da sintaxe Python executada.
- **Aba Lógica & Variáveis**: Simulador visual interativo da árvore de decisão `if/elif` e inspetor de memória em tempo real.
- **Terminal Interativo (REPL)**: Prompt `>>>` embutido para testar chamadas avulsas e simulação automática de execução do script.
- **Passo a Passo**: Animação didática mostrando a pilha de execução, variáveis na memória e retorno de valores.
- **Download com 1 Clique**: Botões para baixar o arquivo `.py` e o `README.md`.

---

Desenvolvido para fins educacionais e didáticos. Bons estudos em Python! 🐍✨
