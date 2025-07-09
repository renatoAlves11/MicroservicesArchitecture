import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Conteudo {
  id: number;
  ordem: number;
  titulo: string;
  texto: string;
}

interface Curso {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  conteudos: Conteudo[];
}

export default function CursoDetalhe() {
  const router = useRouter();
  const { id } = router.query;
  const [curso, setCurso] = useState<Curso | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagamentoStatus, setPagamentoStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`${process.env.NEXT_PUBLIC_CURSO_URL}/cursos/${id}`)
      .then(res => setCurso(res.data))
      .catch(() => setError('Curso não encontrado'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleComprar = async () => {
    setPagamentoStatus(null);
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    // Descobrir usuário autenticado
    try {
      const verify = await axios.post(`${process.env.NEXT_PUBLIC_AUTH_URL}/verify`, { token });
      if (!verify.data.valid) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }
      const id_usuario = verify.data.user;
      // Criar pagamento
      const resp = await axios.post(`${process.env.NEXT_PUBLIC_PAGAMENTO_URL}/pagamento`, {
        id_usuario,
        id_curso: id
      });
      if (resp.status === 201) {
        setPagamentoStatus('Pagamento criado com sucesso! Status: ' + resp.data.status);
      } else {
        setPagamentoStatus('Erro ao criar pagamento');
      }
    } catch (e: any) {
      setPagamentoStatus(e.response?.data?.error || 'Erro ao criar pagamento');
    }
  };

  if (loading) return <div className="p-8">Carregando...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!curso) return null;

  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <div className="bg-white p-6 rounded shadow w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-2">{curso.titulo}</h2>
        <div className="mb-2">{curso.descricao}</div>
        <div className="mb-4 font-semibold">Preço: R$ {curso.preco}</div>
        <button className="btn mb-4" onClick={handleComprar}>Comprar Curso</button>
        {pagamentoStatus && <div className="mb-4 text-blue-600">{pagamentoStatus}</div>}
        <h3 className="text-lg font-bold mt-6 mb-2">Conteúdo do Curso</h3>
        <ul className="list-disc pl-6">
          {curso.conteudos && curso.conteudos.length > 0 ? (
            curso.conteudos.map(conteudo => (
              <li key={conteudo.id} className="mb-1">
                <span className="font-semibold">{conteudo.ordem}. {conteudo.titulo}</span>: {conteudo.texto}
              </li>
            ))
          ) : (
            <li>Nenhum conteúdo cadastrado.</li>
          )}
        </ul>
      </div>
      <style jsx>{`
        .btn {
          background: #2563eb;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }
        .btn:hover {
          background: #1d4ed8;
        }
      `}</style>
    </main>
  );
} 