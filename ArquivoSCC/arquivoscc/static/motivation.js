document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search-query').value;
        const year = document.getElementById('search-year').value;
        const source = document.getElementById('search-source').value;
        const searchParams = new URLSearchParams({ query, year, source }).toString();
        window.location.href = `search.html?${searchParams}`;
    });
});
