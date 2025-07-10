const AUTH_URL = "http://localhost:8000";

function showDashboard() {
  const dashboard = document.getElementById("dashboard");
  const token = localStorage.getItem("token");
  if (!token) {
    dashboard.innerHTML = "Não autenticado.";
    return;
  }
  fetch(AUTH_URL + "/me", {
    credentials: "include",
    headers: { Authorization: "Bearer " + token }
  })
    .then(r => r.json())
    .then(data => {
      if (data.authenticated) {
        dashboard.innerHTML = `<b>Usuário autenticado:</b> ${data.user}`;
      } else {
        dashboard.innerHTML = "Não autenticado.";
      }
    })
    .catch(() => {
      dashboard.innerHTML = "Erro ao buscar usuário.";
    });
}
showDashboard(); 