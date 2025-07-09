import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/verify`, { token })
      .then(res => {
        if (res.data.valid) {
          setUser(res.data.user);
        } else {
          localStorage.removeItem('token');
          router.push('/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <div className="mb-2">Usuário: <span className="font-mono">{user}</span></div>
        <div className="flex gap-4 mt-4 mb-4">
          <a href="/cursos" className="btn">Ver Cursos</a>
          <a href="/pagamentos" className="btn">Meus Pagamentos</a>
        </div>
        <button onClick={handleLogout} className="btn bg-red-600 hover:bg-red-700">Logout</button>
      </div>
      <style jsx>{`
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
        .bg-red-600 {
          background: #dc2626;
        }
        .bg-red-700:hover {
          background: #b91c1c;
        }
      `}</style>
    </main>
  );
} 