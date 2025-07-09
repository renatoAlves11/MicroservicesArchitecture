import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/login`, { email, password });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao fazer login');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input mb-2" required />
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} className="input mb-4" required />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button type="submit" className="btn w-full">Entrar</button>
      </form>
      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
        }
        .btn {
          background: #2563eb;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 500;
        }
        .btn:hover {
          background: #1d4ed8;
        }
      `}</style>
    </main>
  );
} 