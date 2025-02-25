import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Mail, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated login check
    if (username === 'salesadmin' && password === 'salesadmin') {
      toast.success('Login successful!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      toast.error('Invalid credentials');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Password reset instructions sent to your email');
      setShowForgotPassword(false);
    } catch (error) {
      toast.error('Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#6d21c8] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9vyfmmtw8LDNzjBCI1aZAON60w8P8i9_Zbg&s" 
              alt="Souhoola Logo" 
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Sales Dashboard Login</h1>
          <p className="text-gray-400">Enter your credentials to access the dashboard</p>
        </div>

        {!showForgotPassword ? (
          <form onSubmit={handleLogin} className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-700/50">
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#35de75] text-white"
                    placeholder="Enter your username"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#35de75] text-white"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#35de75] to-[#2bc364] text-[#6d21c8] font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>

              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="w-full text-center text-gray-400 hover:text-[#35de75] text-sm"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-700/50">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-yellow-500 bg-yellow-500/10 p-4 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">Enter your Office 365 email to receive password reset instructions.</p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#35de75] text-white"
                    placeholder="Enter your Office 365 email"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-[#35de75] to-[#2bc364] text-[#6d21c8] font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1 bg-gray-700 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back to Login
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Souhoola IT Department. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}