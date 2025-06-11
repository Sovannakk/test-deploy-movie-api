'use client';
import { MovieService } from '@/service/MovieService';
import { LoginRequest, RegisterRequest } from '@/types/Movie';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
const Page = () => {
  const [showAuthModal, setShowAuthModal] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [, setDataRegister] = useState<Response | undefined>();
  // const [, setDataLogin] = useState<LoginResponse | undefined>();

  const createRegister = async () => {
    const data: RegisterRequest = {
      fullName: authForm.name,
      password: authForm.password,
      email: authForm.email,
      profilePicture: ""
    };

    try {
      const response = await MovieService.AuthService(data);
      if (response !== null) {
        setDataRegister(response);
        console.log("Register successfully", response);
        // setAuthError('Registration successful! Please login.');
        toast.success('Registration successful! Please login.');
        setIsLogin(true);
        setAuthForm({ email: '', password: '', name: '' })
      } else {
        console.log("Register failed", response);
        setAuthError("Registration failed. Try again.");
      }
    } catch (error) {
      console.log("Register failed", error);
      setAuthError("An error occurred during registration.");
    }
  };

  const loginUser = async () => {
    const data: LoginRequest = {
      email: authForm.email,
      password: authForm.password,
    };
    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...data,
      });

      if (res?.status == 200) {
        router.push("/home");
      }
      setShowAuthModal(false);
    } catch {
      setAuthError(isLogin ? 'Invalid credentials' : 'Registration failed');
    }
  };


  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);

    try {
      if (isLogin) {
        await loginUser();
      } else {
        await createRegister();
      }
    } catch {
      setAuthError(isLogin ? 'Invalid credentials' : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Auth Modal */}
      {showAuthModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
        // onClick={() => setShowAuthModal(false)}
        >
          <div
            className="bg-white/10 backdrop-blur-lg rounded-2xl w-full max-w-md p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-white/60">
                {isLogin ? 'Sign in to continue watching' : 'Join us to start watching'}
              </p>
            </div>

            {authError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-500 text-sm">{authError}</p>
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={authForm.name}
                    onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${authForm.name ?
                      'bg-white text-black' : 'bg-white/5 text-white'
                      }`}
                    placeholder="Enter your name"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${authForm.email ?
                    'bg-white text-black' : 'bg-white/5 text-white'
                    }`}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                  className={`w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${authForm.password ?
                    'bg-white text-black' : 'bg-white/5 text-white'
                    }`}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/60">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setAuthError(null);
                  }}
                  className="text-purple-500 hover:text-purple-400"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
