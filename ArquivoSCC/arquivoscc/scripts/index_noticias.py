import json
from elasticsearch import Elasticsearch
from datetime import datetime

# Inicialize a conexão com o Elasticsearch
es = Elasticsearch([{'host': 'localhost', 'port': 9200, 'scheme': 'http'}])

# Carregue os dados do arquivo JSON
with open('arquivoscc/data/noticias_normalized.json', 'r', encoding='utf-8') as file:
    noticias = json.load(file)

# Função para validar a data
def is_valid_date(date_str):
    try:
        # Verifica se a data pode ser convertida para o formato correto
        if date_str:
            date_format = "%Y-%m-%d" # ajuste conforme necessário
            datetime.strptime(date_str, date_format)
            return True
        else:
            return False
    except ValueError:
        return False

# Define uma data padrão para notícias sem data
default_date = "1970-01-01"

# Indexe os dados no Elasticsearch
for i, noticia in enumerate(noticias):
    if not is_valid_date(noticia.get('data', '')):
        noticia['data'] = default_date
    es.index(index='noticias', id=i, body=noticia)

print("Todos os dados foram indexados com sucesso.")
