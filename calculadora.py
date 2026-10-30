"""
Calculadora Básica em Python
Autor: Criado para atender às operações fundamentais
Operações: Adição (+), Subtração (-), Multiplicação (*), Divisão (/) e Porcentagem (%)
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

def porcentagem(a: float, b: float) -> float:
    """Retorna a porcentagem de b sobre a: (a * b) / 100."""
    return (a * b) / 100

def exibir_menu() -> None:
    """Exibe o menu de opções para o usuário."""
    print("\n" + "=" * 35)
    print("      CALCULADORA EM PYTHON")
    print("=" * 35)
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Porcentagem (%)")
    print("6. Sair")
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
        opcao = input("Escolha uma opção (1-6): ").strip()

        if opcao == "6":
            print("\nObrigado por usar a calculadora! Encerrando...")
            break

        if opcao not in ("1", "2", "3", "4", "5"):
            print("❌ Opção inválida! Escolha um número entre 1 e 6.")
            continue

        num1 = obter_numero("\nDigite o primeiro número: ")
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
            elif opcao == "5":
                resultado = porcentagem(num1, num2)
                operador = "%"

            print(f"\n✅ Resultado: {num1} {operador} {num2} = {resultado}")

        except ZeroDivisionError as erro:
            print(f"\n❌ {erro}")

        # Pergunta se deseja realizar outro cálculo
        continuar = input("\nDeseja fazer outro cálculo? (s/n): ").strip().lower()
        if continuar != "s":
            print("\nPrograma finalizado. Até logo!")
            break

if __name__ == "__main__":
    main()
