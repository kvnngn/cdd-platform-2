import { useNavigate } from 'react-router-dom';
import { BarChart3, Shield, Users, Zap } from 'lucide-react';
import { useAppStore, USERS } from '../store/appStore';

export function LoginPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppStore();

  const handleLogin = (userId: string) => {
    const user = USERS.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      navigate('/projects');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Ophys Insights</h1>
        <p className="text-slate-400 mt-2 text-sm">Plateforme IA pour la Commercial Due Diligence</p>
        <div className="flex items-center justify-center gap-1 mt-1">
          <span className="text-slate-500 text-xs">by</span>
          <span className="text-blue-400 text-xs font-semibold">StratCap Partners</span>
        </div>
      </div>

      {/* Value props */}
      <div className="flex gap-6 mb-10">
        {[
          { icon: Zap, label: 'Research Engine IA' },
          { icon: Shield, label: 'Confidence Monitor' },
          { icon: Users, label: 'Collaboration temps réel' },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-slate-400 text-xs">
            <Icon className="w-3.5 h-3.5 text-blue-400" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Login cards */}
      <div className="w-full max-w-lg">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-white font-semibold text-lg mb-2">Connexion — Demo</h2>
          <p className="text-slate-400 text-sm mb-6">
            Sélectionnez un profil pour accéder à la plateforme en mode démonstration.
          </p>

          <div className="space-y-3">
            {USERS.map((user) => (
              <button
                key={user.id}
                onClick={() => handleLogin(user.id)}
                className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all group text-left"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold text-sm shrink-0"
                  style={{ backgroundColor: user.color }}
                >
                  {user.initials}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{user.name}</div>
                  <div className="text-slate-400 text-xs">{user.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                    user.role === 'manager'
                      ? 'text-blue-300 bg-blue-500/10 border-blue-500/30'
                      : 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30'
                  }`}>
                    {user.role === 'manager' ? 'Manager' : 'Consultant'}
                  </span>
                  <span className="text-slate-600 group-hover:text-slate-400 transition-colors text-lg">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Données de démonstration — Projet fictif DataSense / Nordic Capital
        </p>
      </div>
    </div>
  );
}
