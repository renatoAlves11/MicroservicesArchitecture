"use client"
import { useEffect, useState, useContext } from "react";
import api from "../api";
import { userContext } from "../page";

interface Pagamento {
  id: string;
  id_curso: string;
  valor: number;
  status: string;
  data: string;
}

export default function MyPaymentsPage() {
  const { user } = useContext(userContext);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      setError("Você precisa estar logado para ver seus pagamentos.");
      setLoading(false);
      return;
    }
    api.get(`/pagamentos/usuario/${user}`, { withCredentials: true })
      .then(res => {
        setPagamentos(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erro ao carregar pagamentos.");
        setLoading(false);
      });
  }, [user]);

  if (loading) return <div>Carregando pagamentos...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (pagamentos.length === 0) return <div>Você ainda não realizou nenhum pagamento.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Meus Pagamentos</h1>
      <ul className="list-disc ml-6">
        {pagamentos.map((p) => (
          <li key={p.id}>
            Curso: {p.id_curso} | Valor: R$ {p.valor} | Status: {p.status} | Data: {p.data}
          </li>
        ))}
      </ul>
    </div>
  );
} 