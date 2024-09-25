document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const newsTitle = urlParams.get('title');

    fetch('data/noticias_normalized.json')
        .then(response => response.json())
        .then(data => {
            const news = data.find(n => n.titulo === newsTitle);
            if (news) {
                const newsContent = document.getElementById('news-content');
                newsContent.innerHTML = `
                    <h2>${news.titulo}</h2>
                    <div class="section">${news.section}</div>
                    <img src="${news.foto}">
                    <div class="subtitulo">${news.subtitulo}</div>
                    <div class="texto">${news.texto}</div>
                    <div class="metadata">
                        <span class="label">DATA:</span> <span>${news.data}</span>
                        <span class="label">AUTOR:</span> <span>${news.autor}</span>
                    </div>
                    <div class="link">
                        <span class="label">NOTÍCIA ORIGINAL:</span> 
                        <span><a href="${news.link}" target="_blank">Ver Notícia Original</a></span>
                    </div>
                `;
            } else {
                const newsContent = document.getElementById('news-content');
                newsContent.innerHTML = `<p>Notícia não encontrada.</p>`;
            }
        });

    // Evento de envio do formulário de pesquisa
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search-query').value;
        const year = document.getElementById('search-year').value;
        const source = document.getElementById('search-source').value;
        const searchParams = new URLSearchParams({ query, year, source }).toString();
        window.location.href = `search.html?${searchParams}`;
    });
});
