export type OperationType = 'adicao' | 'subtracao' | 'multiplicacao' | 'divisao';

export interface CalculationHistoryItem {
  id: string;
  operation: OperationType;
  symbol: string;
  opName: string;
  a: number;
  b: number;
  result: number | null;
  error?: string;
  pythonExpression: string;
  pythonFunctionCall: string;
  timestamp: Date;
}

export type CodeTab = 'cli' | 'oop' | 'functional' | 'tests';

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'system' | 'prompt';
  text: string;
}
