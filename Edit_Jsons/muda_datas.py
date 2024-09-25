import json
import re
from dateutil import parser

def parse_date(date_str):
    # Define um dicionário para os nomes dos meses em português e suas siglas
    month_names = {
        'janeiro': 'Jan', 'fevereiro': 'Feb', 'março': 'Mar', 'abril': 'Apr', 'maio': 'May', 'junho': 'Jun',
        'julho': 'Jul', 'agosto': 'Aug', 'setembro': 'Sep', 'outubro': 'Oct', 'novembro': 'Nov', 'dezembro': 'Dec',
        'jan': 'Jan', 'fev': 'Feb', 'mar': 'Mar', 'abr': 'Apr', 'mai': 'May', 'jun': 'Jun',
        'jul': 'Jul', 'ago': 'Aug', 'set': 'Sep', 'out': 'Oct', 'nov': 'Nov', 'dez': 'Dec'
    }
    
    # Remove colchetes e vírgulas
    date_str = re.sub(r'[\[\],]', '', date_str.lower())
    
    # Substitui os nomes dos meses em português por suas siglas em inglês
    for pt_month, en_month in month_names.items():
        date_str = date_str.replace(pt_month, en_month)
    
    try:
        # Tenta fazer o parse da data
        parsed_date = parser.parse(date_str, fuzzy=True)
        return parsed_date.strftime('%Y-%m-%d')
    except ValueError:
        return None

def normalize_dates_in_json(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        noticias = json.load(f)
    
    for noticia in noticias:
        if 'data' in noticia:
            normalized_date = parse_date(noticia['data'])
            if normalized_date:
                noticia['data'] = normalized_date
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(noticias, f, ensure_ascii=False, indent=4)

if __name__ == '__main__':
    input_file = 'JSON_FINAL.json'
    output_file = 'JSON_FINAL.json'
    normalize_dates_in_json(input_file, output_file)
