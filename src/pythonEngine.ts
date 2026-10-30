import { OperationType } from './types';

export function adicao(a: number, b: number): number {
  return a + b;
}

export function subtracao(a: number, b: number): number {
  return a - b;
}

export function multiplicacao(a: number, b: number): number {
  return a * b;
}

export function divisao(a: number, b: number): { result: number | null; error?: string } {
  if (b === 0) {
    return {
      result: null,
      error: 'ZeroDivisionError: division by zero (Não é possível dividir por zero)',
    };
  }
  return { result: a / b };
}

export function executarOperacao(
  op: OperationType,
  a: number,
  b: number
): { result: number | null; error?: string; expr: string; call: string } {
  let res: number | null = null;
  let err: string | undefined = undefined;
  let opSymbol = '+';
  let funcName = 'adicao';

  switch (op) {
    case 'adicao':
      res = adicao(a, b);
      opSymbol = '+';
      funcName = 'adicao';
      break;
    case 'subtracao':
      res = subtracao(a, b);
      opSymbol = '-';
      funcName = 'subtracao';
      break;
    case 'multiplicacao':
      res = multiplicacao(a, b);
      opSymbol = '*';
      funcName = 'multiplicacao';
      break;
    case 'divisao':
      funcName = 'divisao';
      opSymbol = '/';
      const divRes = divisao(a, b);
      res = divRes.result;
      err = divRes.error;
      break;
  }

  // Format clean floats
  if (res !== null && !err) {
    res = Number(res.toFixed(10).replace(/\.?0+$/, ''));
  }

  return {
    result: res,
    error: err,
    expr: `${a} ${opSymbol} ${b}`,
    call: `${funcName}(${a}, ${b})`,
  };
}

// In-browser Python REPL environment
export class PythonReplEnvironment {
  private scope: Record<string, number> = {};

  constructor() {
    this.reset();
  }

  reset() {
    this.scope = {
      pi: Math.PI,
      e: Math.E,
    };
  }

  getScope() {
    return { ...this.scope };
  }

  execute(command: string): { output: string; isError?: boolean } {
    const trimmed = command.trim();
    if (!trimmed) {
      return { output: '' };
    }

    // Special commands
    if (trimmed.toLowerCase() === 'help()' || trimmed.toLowerCase() === 'help') {
      return {
        output: [
          'Calculadora Python (Python 3.12.0 simulado)',
          'Funções disponíveis:',
          '  adicao(a, b)        -> Retorna a + b',
          '  subtracao(a, b)     -> Retorna a - b',
          '  multiplicacao(a, b) -> Retorna a * b',
          '  divisao(a, b)       -> Retorna a / b (trata ZeroDivisionError)',
          '',
          'Exemplos:',
          '  >>> adicao(15, 30)',
          '  >>> 100 / 4',
          '  >>> divisao(10, 0)',
          '  >>> x = 50',
          '  >>> multiplicacao(x, 2)',
        ].join('\n'),
      };
    }

    if (trimmed.toLowerCase() === 'clear' || trimmed.toLowerCase() === 'cls') {
      return { output: '__CLEAR__' };
    }

    // Check variable assignment: e.g. x = 10 or x = adicao(5, 5)
    const assignMatch = trimmed.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
    if (assignMatch) {
      const varName = assignMatch[1];
      const valExpr = assignMatch[2];
      try {
        const val = this.evalExpression(valExpr);
        this.scope[varName] = val;
        return { output: '' };
      } catch (err: any) {
        return { output: err.message || String(err), isError: true };
      }
    }

    // Direct expression or function call
    try {
      const val = this.evalExpression(trimmed);
      // Format like Python repr
      if (typeof val === 'number') {
        return { output: String(Number(val.toFixed(10).replace(/\.?0+$/, ''))) };
      }
      return { output: String(val) };
    } catch (err: any) {
      return { output: err.message || String(err), isError: true };
    }
  }

  private evalExpression(raw: string): number {
    let expr = raw.trim();

    // Replace Python function calls with math operations
    // adicao(a, b)
    expr = this.replaceFunctionCall(expr, 'adicao', (a, b) => a + b);
    expr = this.replaceFunctionCall(expr, 'subtracao', (a, b) => a - b);
    expr = this.replaceFunctionCall(expr, 'multiplicacao', (a, b) => a * b);
    expr = this.replaceFunctionCall(expr, 'divisao', (a, b) => {
      if (b === 0) {
        throw new Error('ZeroDivisionError: division by zero');
      }
      return a / b;
    });

    // Check for direct division by zero pattern before eval: e.g. / 0
    if (/\/\s*0(?![.\d])/.test(expr)) {
      throw new Error('ZeroDivisionError: division by zero');
    }

    // Substitute known variables
    for (const [key, value] of Object.entries(this.scope)) {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      expr = expr.replace(regex, String(value));
    }

    // Python power operator ** -> Math.pow
    expr = expr.replace(/(\d+(\.\d+)?)\s*\*\*\s*(\d+(\.\d+)?)/g, 'Math.pow($1, $3)');

    // Check for undefined identifiers
    const remainingIdentifiers = expr.match(/\b[a-zA-Z_]\w*\b/g);
    if (remainingIdentifiers) {
      const allowed = ['Math', 'pow', 'sqrt', 'abs'];
      for (const id of remainingIdentifiers) {
        if (!allowed.includes(id)) {
          throw new Error(`NameError: name '${id}' is not defined`);
        }
      }
    }

    // Safe mathematical evaluation
    try {
      // Only allow safe characters
      if (/[^0-9+\-*/().,%^ \tMathpowsqrtabs]/.test(expr)) {
        throw new Error('SyntaxError: invalid syntax');
      }

      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${expr});`)();
      if (!isFinite(result)) {
        throw new Error('ZeroDivisionError: division by zero');
      }
      return result;
    } catch (err: any) {
      if (err.message && err.message.includes('ZeroDivisionError')) {
        throw err;
      }
      if (err.message && err.message.includes('NameError')) {
        throw err;
      }
      throw new Error(`SyntaxError: invalid syntax (${err.message})`);
    }
  }

  private replaceFunctionCall(
    expr: string,
    funcName: string,
    operation: (a: number, b: number) => number
  ): string {
    const pattern = new RegExp(`${funcName}\\s*\\(([^,]+),([^)]+)\\)`, 'g');
    return expr.replace(pattern, (_match, arg1, arg2) => {
      const val1 = this.evalExpression(arg1);
      const val2 = this.evalExpression(arg2);
      const result = operation(val1, val2);
      return String(result);
    });
  }
}
