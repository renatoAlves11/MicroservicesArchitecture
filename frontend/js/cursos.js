const CURSO_URL = "http://localhost:8002";

function listarCursos() {
  fetch(CURSO_URL + "/cursos")
    .then(r => r.json())
    .then(cursos => {
      const ul = document.getElementById("listaCursos");
      ul.innerHTML = "";
      cursos.forEach(curso => {
        const li = document.createElement("li");
        li.innerHTML = `<b>${curso.titulo}</b> - R$ ${curso.preco} <br><small>${curso.descricao}</small>`;
        ul.appendChild(li);
      });
    });
}

listarCursos();

document.getElementById("cursoForm").onsubmit = async function (e) {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const preco = document.getElementById("preco").value;
  const errorDiv = document.getElementById("cursoError");
  errorDiv.textContent = "";
  try {
    const res = await fetch(CURSO_URL + "/cursos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descricao, preco: parseFloat(preco) })
    });
    if (res.ok) {
      document.getElementById("cursoForm").reset();
      listarCursos();
    } else {
      errorDiv.textContent = "Erro ao criar curso";
    }
  } catch {
    errorDiv.textContent = "Erro ao conectar com o serviço de cursos.";
  }
}; 