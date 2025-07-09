const AUTH_URL = "http://localhost:8000";

document.getElementById("loginForm").onsubmit = async function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("loginError");
  errorDiv.textContent = "";
  try {
    const res = await fetch(AUTH_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } else {
      errorDiv.textContent = data.error || "Login inválido";
    }
  } catch {
    errorDiv.textContent = "Erro ao conectar com o serviço de autenticação.";
  }
}; 