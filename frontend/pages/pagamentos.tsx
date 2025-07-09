import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

type Pagamento = {
  id: string;
  id_usuario: string;
  id_curso: string;
  valor: number;
  status: string;
  data: string;
};

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
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
          // Buscar pagamentos do usuário
          axios.get(`${process.env.NEXT_PUBLIC_PAGAMENTO_URL}/pagamentos/usuario/${res.data.user}`)
            .then(resp => setPagamentos(resp.data))
            .finally(() => setLoading(false));
        } else {
          localStorage.removeItem('token');
          router.push('/login');
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, [router]);

  if (loading) return <div className="p-8">Carregando...</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-2xl font-bold mb-6">Meus Pagamentos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Curso</th>
              <th className="px-4 py-2">Valor</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {pagamentos.map(p => (
              <tr key={p.id}>
                <td className="border px-4 py-2">{p.id}</td>
                <td className="border px-4 py-2">{p.id_curso}</td>
                <td className="border px-4 py-2">R$ {p.valor}</td>
                <td className="border px-4 py-2">{p.status}</td>
                <td className="border px-4 py-2">{new Date(p.data).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
} 