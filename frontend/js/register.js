const AUTH_URL = "http://localhost:8000";

document.getElementById("registerForm").onsubmit = async function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("registerError");
  errorDiv.textContent = "";
  try {
    const res = await fetch(AUTH_URL + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      errorDiv.textContent = data.error || "Erro ao registrar";
    }
  } catch {
    errorDiv.textContent = "Erro ao conectar com o serviço de autenticação.";
  }
}; 