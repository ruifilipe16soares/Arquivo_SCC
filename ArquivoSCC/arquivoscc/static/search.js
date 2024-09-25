$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const year = urlParams.get('year');
    const source = urlParams.get('source');
    let currentPage = 1;
    const resultsPerPage = 9;

    // Exibir mensagem de carregamento
    $('#loading-message').show();

    function fetchResults(page) {
        $.get('http://localhost:8087/search', { query: query, year: year, source: source, page: page, size: resultsPerPage }, function(data) {
            $('#loading-message').hide(); // Ocultar mensagem de carregamento

            if (page === 1) {
                $('#results-container').empty();
            }

            if (data.length === 0 && page === 1) {
                $('#results-container').append('<p>Nenhum resultado encontrado.</p>');
            } else {
                data.forEach(function(hit) {
                    const newsDate = new Date(hit._source.data);
                    const formattedDate = newsDate.toLocaleDateString('pt-PT', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });

                    const resultHtml = `
                        <div class="result-item">
                            <p class="news-time" style="color: green;">${formattedDate}</p>
                            <h2><a href="noticia.html?title=${encodeURIComponent(hit._source.titulo)}">${hit._source.titulo}</a></h2>
                            <p>${hit._source.texto.substring(0, 100)}...</p>
                            <button onclick="window.location.href='noticia.html?title=${encodeURIComponent(hit._source.titulo)}'">Continuar a Ler</button>
                        </div>
                    `;
                    $('#results-container').append(resultHtml);
                });

                if (data.length === resultsPerPage) {
                    $('#load-more').show();
                } else {
                    $('#load-more').hide();
                }
            }
        });
    }

    fetchResults(currentPage);

    $('#load-more').on('click', function() {
        currentPage++;
        fetchResults(currentPage);
    });
});
