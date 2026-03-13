import { useNavigate } from 'react-router-dom';
import { useAppStore, USERS } from '../store/appStore';
import { Avatar } from '../components/ui/Avatar';

export function LoginPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAppStore();

  const handleLogin = (userId: string) => {
    const user = USERS.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0f1117] p-12 flex-col justify-between">
        <div>
          <img src="/Ophys_Logo_white.png" alt="Ophys" className="h-8 mb-12" />
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Commercial Due Diligence<br />Intelligence Platform
          </h1>
          <p className="text-slate-400 text-lg">
            AI-powered research and analysis for strategic decision making.
          </p>
        </div>
        <p className="text-slate-500 text-sm">© 2026 Ophys Insights</p>
      </div>

      {/* Right side - Login */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <img src="/Ophys_Logo_white.png" alt="Ophys" className="h-7 mx-auto mb-4" />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-600">Select your profile to continue</p>
          </div>

          <div className="space-y-3">
            {USERS.map((user) => (
              <button
                key={user.id}
                onClick={() => handleLogin(user.id)}
                className="w-full flex items-center gap-4 p-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg transition-all text-left group shadow-sm hover:shadow"
              >
                <Avatar userId={user.id} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="text-slate-900 font-medium">{user.name}</div>
                  <div className="text-slate-500 text-sm">{user.role === 'manager' ? 'Manager' : 'Consultant'}</div>
                </div>
                <svg
                  className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          <p className="text-center text-slate-400 text-xs mt-8">
            Demo environment
          </p>
        </div>
      </div>
    </div>
  );
}
