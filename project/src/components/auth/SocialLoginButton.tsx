import React from 'react';

interface SocialLoginButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function SocialLoginButton({ onClick, loading = false, disabled = false }: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full h-11 flex items-center justify-center gap-3 px-4 rounded-xl border border-ink-200 bg-white hover:bg-ink-50 hover:border-ink-300 text-sm font-semibold text-ink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-ink-300 border-t-ink-600 rounded-full animate-spin" />
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#EA4335"
            d="M12 5c1.617 0 3.101.554 4.286 1.474l3.182-3.183C17.527 1.264 14.898 0 12 0 7.392 0 3.397 2.6 1.386 6.41l3.76 2.92C6.13 6.79 8.888 5 12 5Z"
          />
          <path
            fill="#34A853"
            d="M23.896 12.274c0-.918-.082-1.8-.235-2.644H12v5h6.687c-.288 1.55-1.165 2.863-2.487 3.74l3.794 2.947C22.105 19.14 23.896 15.93 23.896 12.274Z"
          />
          <path
            fill="#FBBC05"
            d="M5.146 14.334A7.056 7.056 0 0 1 4.71 12c0-.808.14-1.592.39-2.328L1.34 6.752A11.938 11.938 0 0 0 0 12c0 1.925.451 3.745 1.254 5.36l3.892-3.026Z"
          />
          <path
            fill="#4285F4"
            d="M12 24c2.88 0 5.298-.953 7.065-2.584l-3.794-2.948C14.27 19.443 13.21 19.8 12 19.8c-3.1 0-5.734-1.97-6.708-4.701L1.4 18.125C3.413 21.386 7.376 24 12 24Z"
          />
        </svg>
      )}
      <span>{loading ? 'Redirecting...' : 'Continue with Google'}</span>
    </button>
  );
}
