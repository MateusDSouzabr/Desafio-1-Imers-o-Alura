"""
Calculadora Funcional e Concisa em Python
"""
import operator

# Tabela de operações mapeando símbolos para funções nativas do Python
OPERACOES = {
    "+": ("Adição", operator.add),
    "-": ("Subtração", operator.sub),
    "*": ("Multiplicação", operator.mul),
    "/": ("Divisão", operator.truediv),
    "%": ("Porcentagem", lambda a, b: (a * b) / 100),
}

def calcular(a: float, operador: str, b: float) -> float:
    """Executa a operação matemática correspondente ao operador informado."""
    if operador not in OPERACOES:
        raise ValueError(f"Operador '{operador}' inválido. Use +, -, *, / ou %")
    
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
    print("15% de 200 =", calcular(200, "%", 15))
