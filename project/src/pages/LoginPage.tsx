import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Loader2, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { SocialLoginButton } from '@/components/auth/SocialLoginButton';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signInWithGoogle } = useAuth();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    const { error: authError } = await signIn(email.trim(), password);

    if (authError) {
      setError(authError);
      setLoading(false);
    }
    // On success, AuthContext updates user state, which triggers PublicOnlyRoute to navigate to /dashboard automatically.
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError('');
    const { error: authError } = await signInWithGoogle();
    if (authError) {
      setError(authError);
      setGoogleLoading(false);
    }
    // On success Supabase redirects the browser — no need to navigate()
  };

  return (
    <AuthLayout>
      {/* Header */}
      <div className="mb-8">
        {/* Desktop logo (hidden on mobile — shown in AuthLayout) */}
        <div className="hidden md:flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-2xl bg-brand-600 flex items-center justify-center shadow-soft">
            <Globe size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-ink-900">GlobeTrotter</span>
        </div>

        <h1 className="font-display font-bold text-3xl text-ink-900 mb-2">Welcome back</h1>
        <p className="text-ink-500 text-sm">Sign in to continue planning your next adventure.</p>
      </div>

      {/* Google */}
      <SocialLoginButton onClick={handleGoogle} loading={googleLoading} disabled={loading} />

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-ink-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-ink-50 text-xs font-semibold text-ink-400 uppercase tracking-wider">OR</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Global error */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-medium animate-fade-up">
            {error}
          </div>
        )}

        {/* Email */}
        <div>
          <label htmlFor="login-email" className="block text-sm font-semibold text-ink-700 mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-ink-200 bg-white hover:border-ink-300 text-sm font-medium text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="text-sm font-semibold text-ink-700">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={loading}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full h-11 mt-2 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold text-sm transition-all shadow-soft hover:shadow-card disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          {loading ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Footer link */}
      <p className="mt-6 text-center text-sm text-ink-500">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="font-semibold text-brand-600 hover:text-brand-700 hover:underline transition-colors"
        >
          Create account
        </Link>
      </p>
    </AuthLayout>
  );
}
