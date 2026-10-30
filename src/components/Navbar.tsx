import React from 'react';
import { Terminal, Code2, Calculator, GitBranch, BookOpen, Download } from 'lucide-react';
import { PYTHON_SNIPPETS } from '../codeSnippets';

export type ActiveTab = 'visual' | 'code' | 'terminal' | 'step' | 'logic' | 'guide';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const downloadScript = () => {
    const element = document.createElement('a');
    const file = new Blob([PYTHON_SNIPPETS.cli.code], { type: 'text/x-python' });
    element.href = URL.createObjectURL(file);
    element.download = 'calculadora.py';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadReadme = () => {
    const element = document.createElement('a');
    const file = new Blob([PYTHON_SNIPPETS.readme.code], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'README.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'visual', label: 'Calculadora Visual', icon: <Calculator className="w-4 h-4" /> },
    { id: 'logic', label: 'Lógica & Variáveis', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'code', label: 'Código Python (.py)', icon: <Code2 className="w-4 h-4" /> },
    { id: 'terminal', label: 'Terminal REPL', icon: <Terminal className="w-4 h-4" /> },
    { id: 'step', label: 'Passo a Passo', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'guide', label: 'Guia & Conceitos', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3776AB] via-[#2b5b84] to-[#FFD438] p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/10">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  {/* Stylized Python curves */}
                  <path
                    d="M11.9 2C6.9 2 7.2 4.2 7.2 4.2L7.2 6.4H12.2V7.2H5.1C2.5 7.2 2 10.3 2 10.3C2 13 4.2 13.5 4.2 13.5H5.8V11.5C5.8 9.5 7.5 9.5 7.5 9.5H12.2C14.4 9.5 14.4 7.6 14.4 7.6V4.1C14.4 2.2 11.9 2 11.9 2ZM9.5 3.3C10 3.3 10.4 3.7 10.4 4.2C10.4 4.7 10 5.1 9.5 5.1C9 5.1 8.6 4.7 8.6 4.2C8.6 3.7 9 3.3 9.5 3.3Z"
                    fill="#3776AB"
                  />
                  <path
                    d="M12.1 22C17.1 22 16.8 19.8 16.8 19.8L16.8 17.6H11.8V16.8H18.9C21.5 16.8 22 13.7 22 13.7C22 11 19.8 10.5 19.8 10.5H18.2V12.5C18.2 14.5 16.5 14.5 16.5 14.5H11.8C9.6 14.5 9.6 16.4 9.6 16.4V19.9C9.6 21.8 12.1 22 12.1 22ZM14.5 20.7C14 20.7 13.6 20.3 13.6 19.8C13.6 19.3 14 18.9 14.5 18.9C15 18.9 15.4 19.3 15.4 19.8C15.4 20.3 15 20.7 14.5 20.7Z"
                    fill="#FFD438"
                  />
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-100 text-base tracking-tight">
                  Calculadora Python
                </span>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                  Python 3
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Adição · Subtração · Multiplicação · Divisão
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <nav className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  <span className="hidden md:inline">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={downloadReadme}
              title="Baixar README.md com explicação completa"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">README.md</span>
            </button>
            <button
              onClick={downloadScript}
              title="Baixar calculadora.py"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Baixar .py</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
