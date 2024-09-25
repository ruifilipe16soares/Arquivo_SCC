import json

# Função para carregar os dados de um arquivo JSON
def load_json(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    return data

# Função para salvar os dados em um arquivo JSON
def save_json(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

# Carregar as notícias existentes do arquivo JSON
noticias1 = load_json('filtered_RCB.json')
noticias2 = load_json('filtered_RC.json')
noticias3 = load_json('filtered_RCC.json')
noticias4 = load_json('filtered_NC.json')


# Combinar todas as notícias em uma única lista
all_news = noticias1 + noticias2 + noticias3 + noticias4

# Salvar todas as notícias no mesmo arquivo JSON
save_json(all_news, 'JSON_FINAL.json')