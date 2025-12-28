
import React, { useState, useEffect, useCallback } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import { db } from './services/db';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'employees'>('dashboard');

  useEffect(() => {
    const auth = localStorage.getItem('isLoggedIn');
    if (auth === 'true') {
      setIsLoggedIn(true);
    }
    db.init().catch(console.error);
  }, []);

  const handleLogin = (success: boolean) => {
    if (success) {
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <i className="fas fa-lighthouse text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Le Phare de Cap Bon</h1>
              <p className="text-xs text-slate-400">Système de Gestion des Absences</p>
            </div>
          </div>

          <nav className="flex gap-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
            >
              <i className="fas fa-chart-line mr-2"></i>Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('employees')}
              className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'employees' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
            >
              <i className="fas fa-users mr-2"></i>Employés
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 rounded-md hover:bg-red-600 transition-colors ml-4"
            >
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full p-4 md:p-6">
        {activeTab === 'dashboard' ? <Dashboard /> : <EmployeeList />}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-slate-500 text-sm">
        <p>© 2025 Le Phare de Cap Bon - Tous droits réservés.</p>
        <p className="mt-1 font-medium text-blue-600">Agroalimentaire Excellence</p>
      </footer>
    </div>
  );
};

export default App;
