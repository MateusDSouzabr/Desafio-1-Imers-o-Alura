import React from 'react';

interface Props {
  code: string;
}

export const PythonSyntaxHighlighter: React.FC<Props> = ({ code }) => {
  // Simple, robust line-by-line syntax highlighter for Python
  const renderLine = (line: string, index: number) => {
    // If it's a docstring or comment line
    if (line.trim().startsWith('#')) {
      return (
        <span key={index} className="text-slate-500 italic block">
          {line}
        </span>
      );
    }

    if (line.trim().startsWith('"""') || line.trim().startsWith("'''")) {
      return (
        <span key={index} className="text-emerald-400 italic block">
          {line}
        </span>
      );
    }

    // Tokenize line with regex
    // Split into tokens: strings, comments, words, numbers, operators
    const tokens = line.split(/(".*?"|'.*?'|#.*|\b[a-zA-Z_]\w*\b|\d+(?:\.\d+)?|[=+\-*/<>!&|^~]+|[()[\]{},:])/g);

    const keywords = new Set([
      'def', 'return', 'if', 'elif', 'else', 'while', 'for', 'in', 'try', 'except',
      'raise', 'class', 'import', 'from', 'as', 'pass', 'break', 'continue', 'lambda',
      'with', 'assert', 'yield', 'global', 'nonlocal', 'is', 'not', 'and', 'or'
    ]);

    const builtins = new Set([
      'print', 'input', 'float', 'int', 'str', 'len', 'range', 'enumerate',
      'ZeroDivisionError', 'ValueError', 'TypeError', 'Exception', 'list', 'dict', 'tuple', 'set',
      'True', 'False', 'None', '__name__', '__main__'
    ]);

    const types = new Set(['float', 'int', 'str', 'bool', 'List', 'Dict', 'Any', 'None']);

    return (
      <span key={index} className="block whitespace-pre">
        {tokens.map((token, tIdx) => {
          if (!token) return null;

          if (token.startsWith('#')) {
            return <span key={tIdx} className="text-slate-500 italic">{token}</span>;
          }
          if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
            return <span key={tIdx} className="text-emerald-300">{token}</span>;
          }
          if (keywords.has(token)) {
            return <span key={tIdx} className="text-amber-400 font-semibold">{token}</span>;
          }
          if (builtins.has(token)) {
            return <span key={tIdx} className="text-cyan-400">{token}</span>;
          }
          if (types.has(token)) {
            return <span key={tIdx} className="text-teal-300">{token}</span>;
          }
          if (/^\d+(\.\d+)?$/.test(token)) {
            return <span key={tIdx} className="text-purple-300">{token}</span>;
          }
          if (/^[=+\-*/<>!]+$/.test(token)) {
            return <span key={tIdx} className="text-pink-400 font-medium">{token}</span>;
          }
          return <span key={tIdx} className="text-slate-200">{token}</span>;
        })}
      </span>
    );
  };

  const lines = code.split('\n');

  return (
    <pre className="font-mono text-[13px] leading-6 overflow-x-auto text-slate-100 p-4">
      <code>
        {lines.map((line, idx) => (
          <div key={idx} className="table-row">
            <span className="table-cell select-none pr-4 text-right text-slate-600 text-xs w-8">
              {idx + 1}
            </span>
            <span className="table-cell">
              {renderLine(line, idx)}
            </span>
          </div>
        ))}
      </code>
    </pre>
  );
};
