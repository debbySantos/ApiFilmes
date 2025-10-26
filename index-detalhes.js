document.addEventListener('DOMContentLoaded', async () => {

    const API_KEY = '22f6c5580eb3be734a3c30a1238a90cf';

    const BASE_URL = 'https://api.themoviedb.org/3';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    const detalhesContainer = document.getElementById('detalhes-container');

    const params = new URLSearchParams(window.location.search);
    const idFilme = params.get('id');


 
        const url = `${BASE_URL}/movie/${idFilme}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`;
        const response = await fetch(url);
        const filme = await response.json();

        detalhesDoFilme(filme);

 

    function detalhesDoFilme(filme) {
        const poster = `${IMAGE_BASE_URL}${filme.poster_path}` 
     
        const atores = filme.credits.cast
            .map(actor => `<li>${actor.name} (como ${actor.character})</li>`)
            .join('');

      
        detalhesContainer.innerHTML = `
            <img src="${poster}" alt="${filme.title}">
            <div class="detalhes-dados">
                <h2>${filme.title} (${filme.release_date ? filme.release_date.split('-')[0] : 'N/A'})</h2>
                <p><strong>Sinopse:</strong> ${filme.overview || 'Não disponível.'}</p>
                
                <h3>Atores:</h3>
                <ul>
                    ${atores.length > 0 ? atores : '<li>Informação de elenco não disponível.</li>'}
                </ul>
            </div>
        `;
    }
});