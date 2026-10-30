"""
Calculadora Orientada a Objetos em Python
"""
from typing import List, Dict, Any

class Calculadora:
    """Classe que representa uma calculadora com operações básicas e histórico."""

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

    def porcentagem(self, a: float, b: float) -> float:
        resultado = (a * b) / 100
        self._salvar_historico(a, "%", b, resultado)
        return resultado

    def _salvar_historico(self, a: float, op: str, b: float, res: float) -> None:
        self.historico.append({
            "operacao": f"{a} {op} {b}",
            "resultado": res
        })

    def exibir_historico(self) -> None:
        print("\n--- Histórico de Operações ---")
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
    print("Porcentagem (15% de 200):", calc.porcentagem(200, 15))
    calc.exibir_historico()
