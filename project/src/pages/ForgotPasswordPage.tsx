import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2, Loader2, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AuthLayout } from '@/components/auth/AuthLayout';

export function ForgotPasswordPage() {
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    const { error: authError } = await resetPassword(email.trim());
    setLoading(false);

    if (authError) {
      setError(authError);
    } else {
      setSent(true);
    }
  };

  return (
    <AuthLayout>
      {/* Back link */}
      <Link
        to="/login"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-ink-800 transition-colors mb-8 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
        Back to Sign In
      </Link>

      {sent ? (
        /* ── Success state ───────────────────────────────────────────────── */
        <div className="text-center py-4 animate-fade-up">
          <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={32} className="text-brand-600" />
          </div>
          <h2 className="font-display font-bold text-2xl text-ink-900 mb-3">Check your inbox</h2>
          <p className="text-ink-500 text-sm leading-relaxed mb-2">
            We've sent password reset instructions to:
          </p>
          <p className="font-semibold text-ink-900 text-sm mb-6">{email}</p>
          <p className="text-xs text-ink-400 mb-8">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => setSent(false)}
              className="text-brand-600 font-semibold hover:underline"
            >
              try again
            </button>
            .
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl border border-ink-200 bg-white hover:bg-ink-50 text-sm font-semibold text-ink-700 transition-all shadow-soft"
          >
            Back to Sign In
          </Link>
        </div>
      ) : (
        /* ── Form ────────────────────────────────────────────────────────── */
        <>
          <div className="mb-8">
            <div className="hidden md:flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-2xl bg-brand-600 flex items-center justify-center shadow-soft">
                <Globe size={20} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl text-ink-900">GlobeTrotter</span>
            </div>
            <h1 className="font-display font-bold text-3xl text-ink-900 mb-2">Reset your password</h1>
            <p className="text-ink-500 text-sm">
              Enter your email and we'll send you a password reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-medium animate-fade-up">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="forgot-email" className="block text-sm font-semibold text-ink-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                <input
                  id="forgot-email"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold text-sm transition-all shadow-soft hover:shadow-card disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-500">
            Remember your password?{' '}
            <Link
              to="/login"
              className="font-semibold text-brand-600 hover:text-brand-700 hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </>
      )}
    </AuthLayout>
  );
}
