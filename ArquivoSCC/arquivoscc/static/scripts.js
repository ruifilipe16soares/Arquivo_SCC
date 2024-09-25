document.addEventListener('DOMContentLoaded', function() {
    function isOnThisDay(newsDate, currentDate) {
        const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const news = new Date(today.getFullYear(), newsDate.getMonth(), newsDate.getDate());
        const diffTime = today.getTime() - news.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24);

        return diffDays === 0 || diffDays === 1 || diffDays === 2 || diffDays === -1 || diffDays === -2;
    }

    function getRelativeTime(newsDate, currentDate) {
        const yearsDiff = currentDate.getFullYear() - newsDate.getFullYear();
        const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const news = new Date(today.getFullYear(), newsDate.getMonth(), newsDate.getDate());
        const diffTime = today.getTime() - news.getTime();
        const diffDays = diffTime / (1000 * 3600 * 24);

        if (diffDays === 0) {
            return `HOJE, HÁ ${yearsDiff} ANOS...`;
        } else if (diffDays === 1) {
            return `ONTEM, HÁ ${yearsDiff} ANOS...`;
        } else if (diffDays === 2) {
            return `ANTEONTEM, HÁ ${yearsDiff} ANOS...`;
        } else if (diffDays === -1) {
            return `AMANHÃ, FAZ ${yearsDiff} ANOS...`;
        } else if (diffDays === -2) {
            return `DEPOIS DE AMANHÃ, FAZ ${yearsDiff} ANOS...`;
        }
        return '';
    }

    // Função para navegar entre seções
    document.querySelector('.right-arrow').addEventListener('click', function(event) {
        event.preventDefault();
        document.querySelector('#hero-subtitle').classList.add('hidden');
        document.querySelector('#hero-subtitle').classList.remove('fade-in');
        document.getElementById('motivos').classList.remove('hidden');
        document.getElementById('motivos').classList.add('fade-in');
    });

    document.querySelector('.left-arrow').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('motivos').classList.add('hidden');
        document.getElementById('motivos').classList.remove('fade-in');
        document.querySelector('#hero-subtitle').classList.remove('hidden');
        document.querySelector('#hero-subtitle').classList.add('fade-in');
    });

    document.querySelector('.motivation-title a').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'motivations.html';
    });

    document.querySelector('.search-news a').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
    });

    // Clique no logotipo para voltar à página inicial
    document.querySelector('.logo').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    // Fetch e exibir notícias "On this day"
    fetch('data/noticias_normalized.json')
    .then(response => response.json())
    .then(data => {
        const today = new Date();
        const container = document.getElementById('news-container');
        container.innerHTML = ''; // Limpa o conteúdo anterior

        let newsItems = data.filter(news => {
            const newsDate = new Date(news.data);
            return isOnThisDay(newsDate, today);
        });

        if (newsItems.length > 3) {
            document.getElementById('more-news').classList.remove('hidden');
        }

        function displayNews(startIndex) {
            container.innerHTML = '';
            const endIndex = Math.min(startIndex + 3, newsItems.length);
            for (let i = startIndex; i < endIndex; i++) {
                const news = newsItems[i];
                const newsDate = new Date(news.data);
                const relativeTime = getRelativeTime(newsDate, today);

                const newsItem = document.createElement('div');
                newsItem.className = 'news-item';
                newsItem.innerHTML = `
                    <p class="news-time">${relativeTime}</p>
                    <h2><a href="noticia.html?title=${encodeURIComponent(news.titulo)}">${news.titulo}</a></h2>
                    <p>${news.texto.substring(0, 100)}...</p>
                    <button onclick="window.location.href='noticia.html?title=${encodeURIComponent(news.titulo)}'">Continuar a Ler</button>
                `;
                container.appendChild(newsItem);
            }
        }

        let currentIndex = 0;
        displayNews(currentIndex);

        document.getElementById('next-arrow').addEventListener('click', function(event) {
            event.preventDefault();
            currentIndex += 3;
            if (currentIndex >= newsItems.length) {
                currentIndex = 0;
            }
            displayNews(currentIndex);
        });

        document.getElementById('prev-arrow').addEventListener('click', function(event) {
            event.preventDefault();
            currentIndex -= 3;
            if (currentIndex < 0) {
                currentIndex = Math.max(0, newsItems.length - 3);
            }
            displayNews(currentIndex);
        });
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
