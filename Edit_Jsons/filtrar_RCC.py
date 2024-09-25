import json


#   PARA TIRAR O "ÚLTIMA HORA"
# Nome do arquivo JSON original
json_filename = 'filtered_RCC.json'
# Nome do arquivo JSON filtrado
updated_json_filename = 'filtered_RCC.json'

# Ler o arquivo JSON original
with open(json_filename, 'r', encoding='utf-8') as jsonfile:
    noticias = json.load(jsonfile)

# Atualizar a seção das notícias
for noticia in noticias:
    section = noticia['section'].strip()
    if "Desporto" in section:
        noticia['section'] = "Desporto"

# Salvar as notícias atualizadas em um novo arquivo JSON
with open(updated_json_filename, 'w', encoding='utf-8') as jsonfile:
    json.dump(noticias, jsonfile, ensure_ascii=False, indent=4)

print(f"Seções atualizadas salvas em {updated_json_filename}")
