import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

type Curso = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
};

export default function Cursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_CURSO_URL}/cursos`)
      .then(res => setCursos(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-2xl font-bold mb-6">Cursos Disponíveis</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cursos.map(curso => (
          <div key={curso.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg mb-2">{curso.titulo}</h3>
            <p className="mb-2">{curso.descricao}</p>
            <div className="mb-2 font-semibold">R$ {curso.preco}</div>
            <Link href={`/cursos/${curso.id}`} className="btn">Ver Detalhes</Link>
          </div>
        ))}
      </div>
      <style jsx>{`
        .btn {
          background: #2563eb;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 500;
          display: inline-block;
        }
        .btn:hover {
          background: #1d4ed8;
        }
      `}</style>
    </main>
  );
} 