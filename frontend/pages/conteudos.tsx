import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

type Curso = {
  id: number;
  titulo: string;
};

type Conteudo = {
  id: number;
  titulo: string;
  texto: string;
  ordem: number;
};

export default function Conteudos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursoId, setCursoId] = useState<number | null>(null);
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Conteudo>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Autenticação
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/verify`, { token })
      .then(res => {
        if (!res.data.valid) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
    // Buscar cursos
    axios.get(`${process.env.NEXT_PUBLIC_CURSO_URL}/cursos`)
      .then(res => setCursos(res.data))
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    if (cursoId) {
      setLoading(true);
      axios.get(`${process.env.NEXT_PUBLIC_CURSO_URL}/cursos/${cursoId}`)
        .then(res => setConteudos(res.data.conteudos || []))
        .finally(() => setLoading(false));
    } else {
      setConteudos([]);
    }
  }, [cursoId]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!cursoId || !form.titulo || !form.texto || !form.ordem) {
      setError('Preencha todos os campos');
      return;
    }
    try {
      if (editId) {
        // Editar
        await axios.put(`${process.env.NEXT_PUBLIC_CURSO_URL}/conteudos/${editId}`, {
          titulo: form.titulo,
          texto: form.texto,
          ordem: Number(form.ordem)
        });
      } else {
        // Criar
        await axios.post(`${process.env.NEXT_PUBLIC_CURSO_URL}/conteudos`, {
          curso_id: cursoId,
          titulo: form.titulo,
          texto: form.texto,
          ordem: Number(form.ordem)
        });
      }
      setForm({});
      setEditId(null);
      // Atualizar lista
      const res = await axios.get(`${process.env.NEXT_PUBLIC_CURSO_URL}/cursos/${cursoId}`);
      setConteudos(res.data.conteudos || []);
    } catch (e: any) {
      setError(e.response?.data?.error || 'Erro ao salvar conteúdo');
    }
  };

  const handleEdit = (conteudo: Conteudo) => {
    setForm({ titulo: conteudo.titulo, texto: conteudo.texto, ordem: conteudo.ordem });
    setEditId(conteudo.id);
  };

  const handleDelete = async (id: number) => {
    if (!cursoId) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_CURSO_URL}/cursos/${cursoId}/conteudos/${id}`);
      setConteudos(conteudos.filter(c => c.id !== id));
    } catch (e: any) {
      setError(e.response?.data?.error || 'Erro ao deletar conteúdo');
    }
  };

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Gerenciar Conteúdos</h2>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Selecione o Curso:</label>
          <select className="input mb-2" value={cursoId ?? ''} onChange={e => setCursoId(Number(e.target.value))}>
            <option value="">Selecione...</option>
            {cursos.map(curso => (
              <option key={curso.id} value={curso.id}>{curso.titulo}</option>
            ))}
          </select>
        </div>
        {cursoId && (
          <>
            <form onSubmit={handleSubmit} className="mb-6">
              <input name="titulo" placeholder="Título" className="input mb-2" value={form.titulo || ''} onChange={handleFormChange} required />
              <textarea name="texto" placeholder="Texto" className="input mb-2" value={form.texto || ''} onChange={handleFormChange} required />
              <input name="ordem" type="number" placeholder="Ordem" className="input mb-2" value={form.ordem || ''} onChange={handleFormChange} required />
              {error && <div className="text-red-500 mb-2">{error}</div>}
              <button type="submit" className="btn mr-2">{editId ? 'Salvar Edição' : 'Adicionar Conteúdo'}</button>
              {editId && <button type="button" className="btn bg-gray-400 hover:bg-gray-500" onClick={() => { setForm({}); setEditId(null); }}>Cancelar</button>}
            </form>
            <h3 className="text-lg font-bold mb-2">Conteúdos do Curso</h3>
            <ul className="list-disc pl-6">
              {conteudos.length > 0 ? conteudos.map(conteudo => (
                <li key={conteudo.id} className="mb-1 flex items-center justify-between">
                  <span><span className="font-semibold">{conteudo.ordem}. {conteudo.titulo}</span>: {conteudo.texto}</span>
                  <span>
                    <button className="btn mr-2" onClick={() => handleEdit(conteudo)}>Editar</button>
                    <button className="btn bg-red-600 hover:bg-red-700" onClick={() => handleDelete(conteudo.id)}>Deletar</button>
                  </span>
                </li>
              )) : <li>Nenhum conteúdo cadastrado.</li>}
            </ul>
          </>
        )}
      </div>
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
        .bg-red-600 {
          background: #dc2626;
        }
        .bg-red-700:hover {
          background: #b91c1c;
        }
        .bg-gray-400 {
          background: #9ca3af;
        }
        .bg-gray-500:hover {
          background: #6b7280;
        }
      `}</style>
    </main>
  );
} 