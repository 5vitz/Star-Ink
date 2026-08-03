import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-10 text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Ops! Algo deu errado.</h1>
          <p className="text-zinc-500 mb-6">O aplicativo encontrou um erro crítico na inicialização.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 rounded-full font-bold"
          >
            Recarregar Aplicativo
          </button>
        </div>
      </div>
    }>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
