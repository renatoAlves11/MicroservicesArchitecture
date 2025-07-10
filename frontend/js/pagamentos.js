const PAGAMENTO_URL = "http://localhost:8003";

function listarPagamentos() {
  fetch(PAGAMENTO_URL + "/pagamentos")
    .then(r => r.json())
    .then(pagamentos => {
      const ul = document.getElementById("listaPagamentos");
      ul.innerHTML = "";
      pagamentos.forEach(p => {
        const li = document.createElement("li");
        li.innerHTML = `<b>Status:</b> ${p.status} | <b>Valor:</b> R$ ${p.valor} | <b>ID Usuário:</b> ${p.id_usuario} | <b>ID Curso:</b> ${p.id_curso}`;
        ul.appendChild(li);
      });
    });
}

listarPagamentos();

document.getElementById("pagamentoForm").onsubmit = async function (e) {
  e.preventDefault();
  const id_usuario = document.getElementById("id_usuario").value;
  const id_curso = document.getElementById("id_curso").value;
  const errorDiv = document.getElementById("pagamentoError");
  errorDiv.textContent = "";
  try {
    const res = await fetch(PAGAMENTO_URL + "/pagamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_usuario, id_curso })
    });
    if (res.ok) {
      document.getElementById("pagamentoForm").reset();
      listarPagamentos();
    } else {
      errorDiv.textContent = "Erro ao criar pagamento";
    }
  } catch {
    errorDiv.textContent = "Erro ao conectar com o serviço de pagamentos.";
  }
}; 