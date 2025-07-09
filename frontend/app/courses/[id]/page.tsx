"use client"

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { userContext } from "../../page";
import { Button } from "@/components/ui/button";

export default function CourseDetailPage() {
  const { id } = useParams();
  const [curso, setCurso] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [pagamentoStatus, setPagamentoStatus] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user } = useContext(userContext);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8004/cursos/${id}`)
        .then(res => res.json())
        .then(data => {
          setCurso(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Erro ao carregar detalhes do curso.");
          setLoading(false);
        });
    }
  }, [id]);

  const handleComprar = async () => {
    setError(""); setSuccess("");
    if (!user) {
      setError("Você precisa estar logado para comprar!");
      return;
    }
    try {
      const resp = await fetch("http://localhost:8003/pagamento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_usuario: user, id_curso: curso.id }),
      });
      const data = await resp.json();
      setSuccess(`Pagamento: ${data.status}`);
    } catch (err) {
      setError("Erro ao processar pagamento");
    }
  };

  if (loading) return <div>Carregando detalhes do curso...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!curso) return <div>Curso não encontrado.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{curso.titulo}</h1>
      <p className="mb-4">{curso.descricao}</p>
      <p className="mb-2 font-semibold">Preço: R$ {curso.preco}</p>
      <Button onClick={handleComprar} disabled={!user}>Comprar/Matricular</Button>
      {success && <div className="text-green-600 mt-2">{success}</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {pagamentoStatus && <div className="mt-2">Status do pagamento: {pagamentoStatus}</div>}
      <h2 className="text-xl font-bold mt-8 mb-2">Conteúdos</h2>
      <ul className="list-disc ml-6">
        {curso.conteudos.map((cont: any) => (
          <li key={cont.id}>
            {cont.ordem}. {cont.titulo}
          </li>
        ))}
      </ul>
    </div>
  );
} 