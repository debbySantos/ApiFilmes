document.addEventListener('DOMContentLoaded', () => {

    const API_KEY = '22f6c5580eb3be734a3c30a1238a90cf'; 
    const BASE_URL = 'https://api.themoviedb.org/3';
    const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200/';

    const botaoDeBusca = document.getElementById('botao-busca');
    const inputBusca = document.getElementById('input-busca');
    const botaoDePopulares = document.getElementById('botao-populares');
    const filmesRenderizar = document.getElementById('filmes');

    async function fetchApi(endpoint, nomeFilme = "") {
        const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=pt-BR${nomeFilme}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.results;

        } catch (error) {
            console.error(error);
        }
    }

    function renderizarFilmes(listaFilmes) {
        filmesRenderizar.innerHTML = ''; 
        listaFilmes.forEach(filme => {
            const filmeCardLink = document.createElement('a');
            filmeCardLink.classList.add('filme-card');
            
            filmeCardLink.href = `detalhes.html?id=${filme.id}`; 

            const poster = `${IMAGE_BASE_URL}${filme.poster_path}`    

            filmeCardLink.innerHTML = `
                <img src="${poster}" alt="${filme.title}">
                <div class="tituloFilme">${filme.title}</div>
            `;
            
            filmesRenderizar.appendChild(filmeCardLink);
        });
    }

    botaoDeBusca.addEventListener('click', async () => {
        const query = inputBusca.value;
        if (query) {
            const nomeFilme = `&query=${encodeURIComponent(query)}`;
            const urlBusca = await fetchApi('/search/movie', nomeFilme);
            
            renderizarFilmes(urlBusca);
        }
    });

    botaoDePopulares.addEventListener('click', async () => {
        const urlPopulares = await fetchApi('/movie/popular');
        renderizarFilmes(urlPopulares);
    });


    botaoDePopulares.click();
});