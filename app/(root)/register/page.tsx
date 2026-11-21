"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  LockKeyIcon,
  Mail01Icon,
  Shield01Icon,
  UserIcon,
  ViewIcon,
  ViewOffSlashIcon,
} from "hugeicons-react";

export function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const emailDomain = email.includes("@")
    ? email.split("@")[1].toLowerCase().trim()
    : "";
  const isPersonalDomain = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "live.com",
  ].includes(emailDomain);

  const isEduDomain =
    emailDomain.includes(".edu") ||
    emailDomain.includes(".ac.") ||
    emailDomain.endsWith(".edu.ng");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setError("Please fill in all required registration fields.");
      return;
    }

    if (
      trimmedName.split(" ").length < 2 ||
      trimmedName.split(" ").some((n) => n.length < 2)
    ) {
      setError("Full name must include both first and last name.");
      return;
    }

    if (trimmedName.length < 5) {
      setError("Full name must be at least 5 characters long.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: trimmedName,
          email: trimmedEmail,
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(
          data.error || "An error occurred while creating your account.",
        );
        setLoading(false);
        return;
      }

      setLoading(false);
      setSuccess("Account successfully created. Redirecting to login...");
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setSuccess(null);
        router.push("/login?registered=true");
      }, 1000);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    setError(null);
    setGoogleLoading(true);

    // Simulate Google OAuth account creation
    setTimeout(() => {
      setGoogleLoading(false);
      router.push("/#how-it-works");
    }, 750);
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-12 sm:py-20 flex flex-col items-center">
      <div className="w-full bg-card border-2 border-border p-6 sm:p-8 relative">
        <div className="mb-6 pb-5 border-b-2 border-dashed border-border text-center">
          <h1 className="text-2xl sm:text-3xl font-medium font-heading tracking-tight text-foreground">
            Create your account
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 leading-relaxed max-w-sm mx-auto">
            Register with your campus email to vote in institutional elections
            or organize verified ballots.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-status-rejected/10 border border-status-rejected/30 text-xs font-sans font-medium text-status-rejected flex items-center gap-2 text-left">
            <InformationCircleIcon size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-5 p-3.5 bg-status-confirmed/10 border border-status-confirmed/30 text-xs font-sans font-medium text-status-confirmed flex items-center gap-2 text-left">
            <CheckmarkCircle02Icon size={14} className="shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="space-y-4 text-left"
        >
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="e.g. Katherine Adeyemi"
                autoComplete="name"
                required
                className="text-input h-12 w-full text-sm pl-11! pr-4! font-sans"
              />
              <UserIcon
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
            >
              Campus / Institutional Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="e.g. k.adeyemi@oauife.edu.ng"
                autoComplete="email"
                required
                className="text-input h-12 w-full text-sm pl-11! pr-4! font-mono"
              />
              <Mail01Icon
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>

            {emailDomain && (
              <div className="mt-2 text-[11px] font-medium">
                {isPersonalDomain ? (
                  <span className="text-brand flex items-center gap-1.5">
                    <InformationCircleIcon size={13} className="shrink-0" />
                    Personal email: You can organize polls; campus elections
                    will require a verified institutional domain.
                  </span>
                ) : isEduDomain ? (
                  <span className="text-status-confirmed flex items-center gap-1.5 font-medium">
                    <CheckmarkCircle02Icon size={13} className="shrink-0" />
                    Verified Campus Affiliation: @{emailDomain}
                  </span>
                ) : (
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Shield01Icon size={13} className="text-brand shrink-0" />
                    Recognized Domain: @{emailDomain}
                  </span>
                )}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground"
              >
                Password
              </label>
              <span className="text-[10px] font-mono text-muted-foreground">
                Min. 8 characters
              </span>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="••••••••••••"
                autoComplete="new-password"
                required
                minLength={8}
                className="text-input h-12 w-full text-sm pl-11! pr-12! font-mono"
              />
              <LockKeyIcon
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <ViewOffSlashIcon size={18} />
                ) : (
                  <ViewIcon size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="••••••••••••"
                autoComplete="new-password"
                required
                className="text-input h-12 w-full text-sm pl-11! pr-12! font-mono"
              />
              <LockKeyIcon
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <ViewOffSlashIcon size={18} />
                ) : (
                  <ViewIcon size={18} />
                )}
              </button>
            </div>
            {/* Password match indicator */}
            {confirmPassword && (
              <div className="mt-1.5 text-[11px] font-sans">
                {password === confirmPassword ? (
                  <span className="text-status-confirmed flex items-center gap-1 font-medium">
                    <CheckmarkCircle02Icon size={12} />
                    Passwords match
                  </span>
                ) : (
                  <span className="text-status-rejected font-medium">
                    Passwords do not match
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="btn btn-primary group w-full h-12 text-xs font-bold tracking-wider flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="inline-block w-3 h-3 border-2 border-background border-t-transparent animate-spin" />
                  Creating Account...
                </span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight01Icon size={16} className="btn-arrow-icon" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Divider: Neo-Editorial Plain Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative px-3 bg-card text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Or continue with
          </div>
        </div>

        {/* Google / Gmail Fast Sign Up */}
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading}
            className="btn btn-secondary w-full h-12 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-60"
            aria-label="Sign up with Google or Gmail"
          >
            {googleLoading ? (
              <span className="flex items-center gap-2 font-mono text-[11px]">
                <span className="inline-block w-3 h-3 border-2 border-brand border-t-transparent animate-spin" />
                Connecting to Google...
              </span>
            ) : (
              <>
                <GoogleIcon className="w-4 h-4 shrink-0" />
                <span>Continue with Google</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-6 pt-5 border-t border-border/60 text-center text-xs text-muted-foreground">
          <span>Already have an account? </span>
          <a href="/login" className="text-brand font-medium hover:underline">
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
}
