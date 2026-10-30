import React, { useState } from 'react';
import { Copy, Check, Download, Terminal, CheckCircle2, FileCode } from 'lucide-react';
import { PYTHON_SNIPPETS } from '../codeSnippets';
import { PythonSyntaxHighlighter } from './PythonSyntaxHighlighter';

export const CodeViewer: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('cli');
  const [copied, setCopied] = useState<boolean>(false);

  const currentSnippet = PYTHON_SNIPPETS[selectedTab] || PYTHON_SNIPPETS.cli;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const isMarkdown = currentSnippet.filename.endsWith('.md');
    const file = new Blob([currentSnippet.code], {
      type: isMarkdown ? 'text/markdown' : 'text/x-python',
    });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = currentSnippet.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="py-6 px-4 max-w-7xl mx-auto space-y-6">
      {/* Header & Paradigm Switcher */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-slate-100">
                {currentSnippet.filename.endsWith('.md') ? 'Documentação da Aplicação' : 'Código Fonte em Python'}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {currentSnippet.filename.endsWith('.md')
                ? 'Manual explicativo completo com arquitetura, variáveis, fluxo condicional e guia de execução.'
                : 'Código completo, modular, documentado e pronto para executar com Python 3.'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar {currentSnippet.filename}</span>
            </button>
          </div>
        </div>

        {/* Tab selector */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
          {Object.values(PYTHON_SNIPPETS).map((snip) => {
            const isSelected = selectedTab === snip.id;
            return (
              <button
                key={snip.id}
                onClick={() => setSelectedTab(snip.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-slate-800 text-amber-400 border border-amber-400/30 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {snip.title}
              </button>
            );
          })}
        </div>

        {/* Snippet Description & Features */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentSnippet.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-400">
            {currentSnippet.keyFeatures.map((feat, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{feat}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Code Editor Box */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Editor Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-xs text-slate-400">
              {currentSnippet.filename}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            UTF-8 · Python 3
          </span>
        </div>

        {/* Code Content */}
        <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
          <PythonSyntaxHighlighter code={currentSnippet.code} />
        </div>
      </div>

      {/* Quick Run Instructions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2 mb-3">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>Como executar este código no seu computador:</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-slate-400 text-[11px] mb-1 font-sans">No Windows (Prompt ou PowerShell):</div>
            <div className="text-emerald-400 select-all">$ python {currentSnippet.filename}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-slate-400 text-[11px] mb-1 font-sans">No Linux ou macOS (Terminal):</div>
            <div className="text-emerald-400 select-all">$ python3 {currentSnippet.filename}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
