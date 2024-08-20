import './assets/pais.css';

//  requisição para obter os dados
fetch('./paises.json')
    .then(resposta => resposta.json())
    .then(dados => iniciarApp(dados.map(({ numericCode, name, population, flag }) => ({
        id: numericCode,
        nome: name,
        populacao: population,
        bandeira: flag,
        favorito: false
    }))));

// os dados dos países
function iniciarApp(paises) {
    const listaEsquerda = document.querySelector('#lista-esquerda tbody');
    const listaDireita = document.querySelector('#lista-direita tbody');

    // Função para renderizar a lista de países
    const renderizar = () => {
        [listaEsquerda, listaDireita].forEach(lista => lista.innerHTML = '');

        // Ordena os países por nome e adiciona cada país na lista apropriada
        paises.sort((a, b) => a.nome.localeCompare(b.nome)).forEach(pais => {
            const lista = pais.favorito ? listaDireita : listaEsquerda;
            lista.innerHTML += `
                <tr>
                    <td>${pais.id}</td>
                    <td>${pais.nome}</td>
                    <td>${pais.populacao.toLocaleString()}</td>
                    <td><img src="${pais.bandeira}" alt="Bandeira de ${pais.nome}"></td>
                    <td><button class="alternar-favorito" data-id="${pais.id}">
                        ${pais.favorito ? 'Remover' : 'Adicionar'}
                    </button></td>
                </tr>`;
        });

        // Atualiza os contadores 
        atualizarContadores();
    };

    // atualizar os contadores
    const atualizarContadores = () => {
        const [esquerda, direita] = [paises.filter(p => !p.favorito), paises.filter(p => p.favorito)];
        document.querySelector('#contagem-esquerda').textContent = `Países: ${esquerda.length}`;
        document.querySelector('#populacao-esquerda').textContent = `População: ${esquerda.reduce((soma, p) => soma + p.populacao, 0).toLocaleString()}`;
        document.querySelector('#contagem-direita').textContent = `Países: ${direita.length}`;
        document.querySelector('#populacao-direita').textContent = `População: ${direita.reduce((soma, p) => soma + p.populacao, 0).toLocaleString()}`;
    };

    
    document.addEventListener('click', evento => {
        if (evento.target.classList.contains('alternar-favorito')) {
            const pais = paises.find(p => p.id === evento.target.dataset.id);
            pais.favorito = !pais.favorito;
            renderizar();
        }
    });

    
    renderizar();
}


function Pais() {
    return (
        <>
            <div className="container">
                <div className="lista-container">
                    <h2>Países</h2>
                    <p id="contagem-esquerda">Países: 0</p>
                    <p id="populacao-esquerda">População: 0</p>
                    <table id="lista-esquerda">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>POPULAÇÃO</th>
                                <th>BANDEIRA</th>
                                <th>FAVORITO</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div className="lista-container">
                    <h2>Favoritos</h2>
                    <p id="contagem-direita">Países: 0</p>
                    <p id="populacao-direita">População: 0</p>
                    <table id="lista-direita">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>POPULAÇÃO</th>
                                <th>BANDEIRA</th>
                                <th>FAVORITO</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Pais;
