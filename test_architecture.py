#!/usr/bin/env python3
"""
Script para testar a arquitetura de microsserviços
"""

import requests
import time
import json

# URLs dos serviços
DATABASE_SERVICE_URL = "http://localhost:8004"
AUTH_SERVICE_URL = "http://localhost:8000"
CURSO_SERVICE_URL = "http://localhost:8002"
PAGAMENTO_SERVICE_URL = "http://localhost:8003"

def test_database_service():
    """Testa o serviço de banco de dados"""
    print("🔍 Testando Database Service...")
    
    # Teste de health check
    try:
        response = requests.get(f"{DATABASE_SERVICE_URL}/health")
        if response.status_code == 200:
            print("✅ Health check do database service OK")
        else:
            print("❌ Health check do database service falhou")
            return False
    except requests.RequestException as e:
        print(f"❌ Erro ao conectar com database service: {e}")
        return False
    
    # Teste de criação de usuário
    try:
        user_data = {
            "name": "Teste User",
            "email": "teste@example.com",
            "password": "senha123"
        }
        response = requests.post(f"{DATABASE_SERVICE_URL}/usuarios", json=user_data)
        if response.status_code == 201:
            user = response.json()
            print(f"✅ Usuário criado com ID: {user['id']}")
            return user['id']
        else:
            print(f"❌ Erro ao criar usuário: {response.status_code}")
            return None
    except requests.RequestException as e:
        print(f"❌ Erro ao criar usuário: {e}")
        return None

def test_auth_service():
    """Testa o serviço de autenticação"""
    print("\n🔍 Testando Auth Service...")
    
    # Teste de registro
    try:
        register_data = {
            "name": "Auth Test User",
            "email": "auth@example.com",
            "password": "senha123"
        }
        response = requests.post(f"{AUTH_SERVICE_URL}/register", json=register_data)
        if response.status_code == 201:
            print("✅ Registro de usuário OK")
        else:
            print(f"❌ Erro no registro: {response.status_code}")
            return None
    except requests.RequestException as e:
        print(f"❌ Erro no registro: {e}")
        return None
    
    # Teste de login
    try:
        login_data = {
            "email": "auth@example.com",
            "password": "senha123"
        }
        response = requests.post(f"{AUTH_SERVICE_URL}/login", json=login_data)
        if response.status_code == 200:
            token = response.json().get('token')
            print("✅ Login OK")
            return token
        else:
            print(f"❌ Erro no login: {response.status_code}")
            return None
    except requests.RequestException as e:
        print(f"❌ Erro no login: {e}")
        return None

def test_curso_service():
    """Testa o serviço de cursos"""
    print("\n🔍 Testando Curso Service...")
    
    # Teste de criação de curso
    try:
        curso_data = {
            "titulo": "Curso de Teste",
            "descricao": "Descrição do curso de teste",
            "preco": 99.99
        }
        response = requests.post(f"{CURSO_SERVICE_URL}/cursos", json=curso_data)
        if response.status_code == 201:
            curso = response.json()
            print(f"✅ Curso criado com ID: {curso['id']}")
            return curso['id']
        else:
            print(f"❌ Erro ao criar curso: {response.status_code}")
            return None
    except requests.RequestException as e:
        print(f"❌ Erro ao criar curso: {e}")
        return None

def test_pagamento_service():
    """Testa o serviço de pagamentos"""
    print("\n🔍 Testando Pagamento Service...")
    
    # Teste de criação de pagamento
    try:
        pagamento_data = {
            "id_usuario": "1",
            "id_curso": "1"
        }
        response = requests.post(f"{PAGAMENTO_SERVICE_URL}/pagamento", json=pagamento_data)
        if response.status_code == 201:
            pagamento = response.json()
            print(f"✅ Pagamento criado com status: {pagamento['status']}")
            return True
        else:
            print(f"❌ Erro ao criar pagamento: {response.status_code}")
            return False
    except requests.RequestException as e:
        print(f"❌ Erro ao criar pagamento: {e}")
        return False

def main():
    """Função principal para testar toda a arquitetura"""
    print("🚀 Iniciando testes da arquitetura de microsserviços...\n")
    
    # Aguardar um pouco para os serviços subirem
    print("⏳ Aguardando serviços subirem...")
    time.sleep(10)
    
    # Testar database service
    user_id = test_database_service()
    if not user_id:
        print("❌ Falha no teste do database service")
        return
    
    # Testar auth service
    token = test_auth_service()
    if not token:
        print("❌ Falha no teste do auth service")
        return
    
    # Testar curso service
    curso_id = test_curso_service()
    if not curso_id:
        print("❌ Falha no teste do curso service")
        return
    
    # Testar pagamento service
    pagamento_success = test_pagamento_service()
    if not pagamento_success:
        print("❌ Falha no teste do pagamento service")
        return
    
    print("\n🎉 Todos os testes passaram! A arquitetura está funcionando corretamente.")
    print("\n📊 Resumo:")
    print(f"   - Database Service: ✅")
    print(f"   - Auth Service: ✅")
    print(f"   - Curso Service: ✅")
    print(f"   - Pagamento Service: ✅")

if __name__ == "__main__":
    main() 