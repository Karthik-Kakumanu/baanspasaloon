import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BUSINESS_SETTINGS } from '../../config/business';
import { Lock } from 'lucide-react';
import { GoldButton } from '../../components/GoldButton';

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('admin@baan.demo');
  const [password, setPassword] = useState('demo1234');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('baan_admin_auth', 'true');
    onLogin();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111111] rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#2C2114] space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <img
              src={BUSINESS_SETTINGS.logo}
              alt={BUSINESS_SETTINGS.brandFullName}
              className="h-16 w-auto mx-auto object-contain"
            />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0A0A] text-[#FFF0A6] text-xs font-semibold uppercase tracking-wider border border-[#D4A64A]/30">
            <Lock size={12} />
            Admin Demo Console
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A64A]">
            BAAN Management
          </h1>
          <p className="text-xs text-[#F7F3EC]/70">
            Sign in to inspect demo appointment requests, service menus and settings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#F7F3EC]/80 uppercase tracking-wider mb-1">
              Admin Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-bali"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#F7F3EC]/80 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-bali"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-[#2C2114] text-[11px] text-[#F7F3EC]/75 space-y-1">
            <p className="font-semibold text-[#FFF0A6]">Demo Mode Credentials:</p>
            <p>Email: admin@baan.demo</p>
            <p>Password: demo1234 (Any input will grant demo access)</p>
            <p className="italic text-[10px] text-[#F7F3EC]/50">Note: Not production-secure. For demonstration purposes only.</p>
          </div>

          <div className="pt-2">
            <GoldButton
              type="submit"
              text="Sign In to Admin"
              size="md"
              className="w-full"
            />
          </div>
        </form>

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-[#D4A64A] hover:text-[#FFF0A6] hover:underline font-medium">
            ← Return to Public BAAN Website
          </Link>
        </div>
      </div>
    </div>
  );
};
