import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, Loader2, Globe, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { SocialLoginButton } from '@/components/auth/SocialLoginButton';

// Password strength requirements
function checkRequirements(password: string) {
  return {
    length: password.length >= 8,
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function SignupPage() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const reqs = checkRequirements(password);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (!reqs.length || !reqs.number || !reqs.special) {
      newErrors.password = 'Password does not meet requirements.';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Your passwords don\'t match.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError('');
    if (!validate()) return;

    setLoading(true);
    const { error, needsConfirmation } = await signUp(email.trim(), password, fullName.trim());

    if (error) {
      setGlobalError(error);
      setLoading(false);
    } else if (needsConfirmation) {
      setSuccess(true);
      setLoading(false);
    }
    // On success without confirmation, AuthContext updates user state, and PublicOnlyRoute navigates automatically.
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setGlobalError('');
    const { error } = await signInWithGoogle();
    if (error) {
      setGlobalError(error);
      setGoogleLoading(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <AuthLayout>
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={32} className="text-brand-600" />
          </div>
          <h2 className="font-display font-bold text-2xl text-ink-900 mb-3">Account created!</h2>
          <p className="text-ink-500 text-sm leading-relaxed mb-6">
            Please check your email inbox to verify your account. Once verified, you can sign in and start planning your adventures.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm transition-all shadow-soft"
          >
            Back to Sign In
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <AuthLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="hidden md:flex items-center gap-2.5 mb-6">
          <div className="w-9 h-9 rounded-2xl bg-brand-600 flex items-center justify-center shadow-soft">
            <Globe size={20} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-ink-900">GlobeTrotter</span>
        </div>
        <h1 className="font-display font-bold text-3xl text-ink-900 mb-2">Create your account</h1>
        <p className="text-ink-500 text-sm">Start planning smarter trips with GlobeTrotter.</p>
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
        {globalError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-medium animate-fade-up">
            {globalError}
          </div>
        )}

        {/* Full Name */}
        <div>
          <label htmlFor="signup-name" className="block text-sm font-semibold text-ink-700 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Johnson"
              disabled={loading}
              className={`w-full h-11 pl-10 pr-4 rounded-xl border text-sm font-medium text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all disabled:opacity-50 ${
                errors.fullName ? 'border-red-300 bg-red-50' : 'border-ink-200 bg-white hover:border-ink-300'
              }`}
            />
          </div>
          {errors.fullName && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="signup-email" className="block text-sm font-semibold text-ink-700 mb-1.5">
            Email
          </label>
          <div className="relative">
            <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={loading}
              className={`w-full h-11 pl-10 pr-4 rounded-xl border text-sm font-medium text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all disabled:opacity-50 ${
                errors.email ? 'border-red-300 bg-red-50' : 'border-ink-200 bg-white hover:border-ink-300'
              }`}
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <PasswordInput
            id="signup-password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            disabled={loading}
            error={errors.password}
          />
          {/* Requirements */}
          {password && (
            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
              {[
                { met: reqs.length, label: '8+ characters' },
                { met: reqs.number, label: 'One number' },
                { met: reqs.special, label: 'One special character' },
              ].map(({ met, label }) => (
                <span
                  key={label}
                  className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                    met ? 'text-brand-600' : 'text-ink-400'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${met ? 'bg-brand-500' : 'bg-ink-300'}`} />
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <PasswordInput
            id="signup-confirm-password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat your password"
            autoComplete="new-password"
            disabled={loading}
            error={errors.confirmPassword}
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
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-ink-500">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-semibold text-brand-600 hover:text-brand-700 hover:underline transition-colors"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
