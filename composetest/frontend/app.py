from flask import Flask, render_template, request, redirect, url_for, flash, session
import requests
import os

app = Flask(__name__)
app.secret_key = "segredo"

# URLs dos microsserviços
USER_URL = os.environ.get("USER_URL", "http://user:5000")
AUTH_URL = os.environ.get("AUTH_URL", "http://auth:5000")
PAGAMENTO_URL = os.environ.get("PAGAMENTO_URL", "http://pagamento:5000")
CURSO_URL = os.environ.get("CURSO_URL", "http://curso_conteudo:5000")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        data = {
            "name": request.form["name"],
            "email": request.form["email"],
            "password": request.form["password"]
        }
        response = requests.post(f"{USER_URL}/user", json=data)
        if response.status_code == 201:
            flash("Usuário criado com sucesso!", "success")
            return redirect(url_for("login"))
        else:
            flash("Erro ao criar usuário", "danger")
    return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        data = {
            "email": request.form["email"],
            "password": request.form["password"]
        }
        response = requests.post(f"{AUTH_URL}/login", json=data)
        if response.status_code == 200:
            token = response.json().get("token") 
            session["token"] = token
            flash("Login bem-sucedido!", "success")
            return redirect(url_for("usuarios"))
        else:
            flash("Credenciais inválidas", "danger")
    return render_template("login.html")

@app.route("/usuarios")
def usuarios():
    response = requests.get(f"{USER_URL}/user")
    usuarios = response.json()
    return render_template("usuarios.html", usuarios=usuarios)

@app.route("/pagamento", methods=["GET", "POST"])
def pagamento():
    if request.method == "POST":
        dados = {
            "id": request.form["id_usuario"],
            "id_curso": request.form["id_curso"]
        }
        response = requests.post(f"{PAGAMENTO_URL}/pagamento", json=dados)
        if response.status_code == 200:
            resultado = response.json()
            return render_template("pagamento.html", resultado=resultado)
        else:
            flash("Erro ao processar pagamento", "danger")
    return render_template("pagamento.html")

@app.route('/cursos')
def frontend_cursos():
    response = requests.get(f"{CURSO_API_URL}/cursos")
    cursos = response.json()
    return render_template('cursos.html', cursos=cursos)

@app.route('/cursos/<int:curso_id>')
def frontend_ver_curso(curso_id):
    curso_resp = requests.get(f"{CURSO_URL}/cursos/{curso_id}")
    conteudos_resp = requests.get(f"{CURSO_URL}/cursos/{curso_id}/conteudos")

    if curso_resp.status_code != 200 or conteudos_resp.status_code != 200:
        return "Erro ao carregar curso ou conteúdos", 500

    curso = curso_resp.json()
    conteudos = conteudos_resp.json()

    return render_template('ver_curso.html', curso=curso, conteudos=conteudos)

@app.route('/cursos/novo', methods=['GET', 'POST'])
def criar_curso_frontend():
    if request.method == 'POST':
        data = {
            'titulo': request.form['titulo'],
            'descricao': request.form['descricao'],
            'preco': request.form['preco']
        }

        response = requests.post(f"{CURSO_API_URL}/cursos", json=data)

        if response.status_code == 201:
            return redirect(url_for('frontend_cursos'))  # você pode redirecionar para a lista de cursos
        else:
            return "Erro ao criar curso", 400

    return render_template('criar_curso.html')

@app.route('/cursos/<int:curso_id>/conteudos/novo', methods=['GET', 'POST'])
def frontend_criar_conteudo(curso_id):
if request.method == 'POST':
    data = {
        'curso_id': curso_id,
        'ordem': request.form['ordem'],
        'titulo': request.form['titulo'],
        'texto': request.form['texto']
    }

    response = requests.post(f"{CURSO_URL}/conteudos", json=data)

    if response.status_code == 201:
        return redirect(url_for('frontend_ver_curso', curso_id=curso_id))
    else:
        return "Erro ao criar conteúdo", 400

return render_template('criar_conteudo.html', curso_id=curso_id)

@app.route("/logout")
def logout():
    session.clear()
    flash("Logout realizado com sucesso!", "info")
    return redirect(url_for("login"))