import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Bem-vindo à Plataforma de Cursos</h1>
      <nav className="flex flex-col gap-4 w-full max-w-xs">
        <Link href="/login" className="btn">Login</Link>
        <Link href="/register" className="btn">Registrar</Link>
        <Link href="/cursos" className="btn">Cursos</Link>
        <Link href="/pagamentos" className="btn">Pagamentos</Link>
        <Link href="/dashboard" className="btn">Dashboard</Link>
        <Link href="/conteudos" className="btn">Gerenciar Conteúdos</Link>
      </nav>
      <style jsx>{`
        .btn {
          display: block;
          background: #2563eb;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          text-align: center;
          font-weight: 500;
          transition: background 0.2s;
        }
        .btn:hover {
          background: #1d4ed8;
        }
      `}</style>
    </main>
  );
} 