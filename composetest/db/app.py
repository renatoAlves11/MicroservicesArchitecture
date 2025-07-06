import time

import redis
from flask import Flask
from sqlalchemy import create_engine, text

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    engine = create_engine("postgresql://usuario:senha123@db:5432/meubanco")
    with engine.connect() as conn:
        conn.execute(text("CREATE TABLE usuario(nome varchar(30), senha varchar(30), id INTEGER PRIMARY KEY);"))
        conn.execute(text("INSERT INTO usuario VALUES ('Carlos', '123', 1);"))
        result = conn.execute(text("SELECT * FROM usuario;"))
        rows = result.fetchall()
        rows = [f"id={r.id}, nome={r.nome}, senha={r.senha}" for r in result]
    return f'WEBBBBBBB!!!!!!!!!!!!!!!!!!!!!!!!! I have been seen {count} times.\n BANCODEDADOS:{rows}'
