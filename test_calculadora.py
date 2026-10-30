"""
Testes Unitários para a Calculadora Python
Execute com: python -m unittest test_calculadora.py
"""
import unittest
from calculadora import adicao, subtracao, multiplicacao, divisao, porcentagem

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

    def test_porcentagem(self):
        self.assertEqual(porcentagem(200, 15), 30.0)
        self.assertEqual(porcentagem(50, 10), 5.0)
        self.assertEqual(porcentagem(100, 0), 0.0)
        self.assertEqual(porcentagem(80, 12.5), 10.0)

if __name__ == "__main__":
    unittest.main()
