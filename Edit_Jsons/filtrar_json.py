import json

# Nome do arquivo JSON original
json_filename = 'RC_FINAL.json'
# Nome do arquivo JSON filtrado
filtered_json_filename = 'filtered_RC.json'

# Lista de termos para verificar
termos = [
    'Sp. Covilhã', 'Sporting da Covilhã', 'SC Covilhã', 'SC da Covilhã', 'S. da Covilhã', 'S. Covilhã', 'leão da serra', 'leões da serra', 'SCC'
]

#'empate', 'vitória', 'derrota', 'golo', 'marc', 'golead', 'serran', 'sporting',  'leões',  'o Covilhã',

# Função para verificar se pelo menos um termo está presente em algum dos campos
def contains_any_term(text, termos):
    text_lower = text.lower()
    return any(term.lower() in text_lower for term in termos)

# Conjunto para armazenar textos únicos (para verificar duplicidade)
unique_texts = set()
# Lista para armazenar notícias filtradas
filtered_noticias = []

# Ler o arquivo JSON original
with open(json_filename, 'r', encoding='utf-8') as jsonfile:
    noticias = json.load(jsonfile)
    for noticia in noticias:
        texto = noticia['texto'].strip()
        section = noticia['section'].strip().lower()
        titulo = noticia['titulo'].strip()
        subtitulo = noticia['subtitulo'].strip()

        # Verificar duplicidade pelo campo "texto"
        if texto in unique_texts:
            continue
        unique_texts.add(texto)

        # Filtrar pela seção "Desporto"
        if "desporto" not in section and section != "":
            continue

        # Verificar se pelo menos um dos termos está presente no título, subtítulo ou texto
        if not (contains_any_term(titulo, termos) or contains_any_term(subtitulo, termos) or contains_any_term(texto, termos)):
            continue

        # Adicionar notícia filtrada à lista
        filtered_noticias.append(noticia)

# Salvar as notícias filtradas em um novo arquivo JSON
with open(filtered_json_filename, 'w', encoding='utf-8') as jsonfile:
    json.dump(filtered_noticias, jsonfile, ensure_ascii=False, indent=4)

print(f"Notícias filtradas salvas em {filtered_json_filename}")
