// Importa o arquivo de estilo CSS específico para o componente de países
import './assets/pais.css';

// Realiza uma requisição para obter os dados dos países a partir de um arquivo JSON
fetch('./paises.json')
    .then(resposta => resposta.json())  // Converte a resposta para JSON
    .then(dados => iniciarApp(dados.map(({ numericCode, name, population, flag }) => ({
        id: numericCode,           // Mapeia o código numérico do país para a propriedade 'id'
        nome: name,                // Mapeia o nome do país para a propriedade 'nome'
        populacao: population,     // Mapeia a população do país para a propriedade 'populacao'
        bandeira: flag,            // Mapeia o URL da bandeira do país para a propriedade 'bandeira'
        favorito: false            // Adiciona a propriedade 'favorito' inicializada como 'false'
    }))));

// Função principal que inicia a aplicação após carregar os dados dos países
function iniciarApp(paises) {
    // Seleciona os elementos da DOM onde as listas de países serão renderizadas
    const listaEsquerda = document.querySelector('#lista-esquerda tbody');
    const listaDireita = document.querySelector('#lista-direita tbody');

    // Função para renderizar as listas de países na tela
    const renderizar = () => {
        // Limpa o conteúdo atual das listas
        [listaEsquerda, listaDireita].forEach(lista => lista.innerHTML = '');

        // Ordena os países por nome e adiciona cada país na lista apropriada
        paises.sort((a, b) => a.nome.localeCompare(b.nome)).forEach(pais => {
            const lista = pais.favorito ? listaDireita : listaEsquerda;  // Determina a lista com base no status 'favorito'
            lista.innerHTML += `
                <tr>
                    <td>${pais.id}</td>  <!-- Exibe o ID do país -->
                    <td>${pais.nome}</td>  <!-- Exibe o nome do país -->
                    <td>${pais.populacao.toLocaleString()}</td>  <!-- Exibe a população do país formatada -->
                    <td><img src="${pais.bandeira}" alt="Bandeira de ${pais.nome}"></td>  <!-- Exibe a bandeira do país -->
                    <td><button class="alternar-favorito" data-id="${pais.id}">
                        ${pais.favorito ? 'Remover' : 'Adicionar'}  <!-- Botão para alternar o status de favorito -->
                    </button></td>
                </tr>`;
        });

        // Atualiza os contadores de países e populações
        atualizarContadores();
    };

    // Função para atualizar os contadores de países e populações
    const atualizarContadores = () => {
        // Filtra os países em dois grupos: favoritos e não favoritos
        const [esquerda, direita] = [paises.filter(p => !p.favorito), paises.filter(p => p.favorito)];

        // Atualiza o contador e a população da lista esquerda (não favoritos)
        document.querySelector('#contagem-esquerda').textContent = `Países: ${esquerda.length}`;
        document.querySelector('#populacao-esquerda').textContent = `População: ${esquerda.reduce((soma, p) => soma + p.populacao, 0).toLocaleString()}`;

        // Atualiza o contador e a população da lista direita (favoritos)
        document.querySelector('#contagem-direita').textContent = `Países: ${direita.length}`;
        document.querySelector('#populacao-direita').textContent = `População: ${direita.reduce((soma, p) => soma + p.populacao, 0).toLocaleString()}`;
    };

    // Adiciona um evento global para detectar cliques nos botões de alternar favoritos
    document.addEventListener('click', evento => {
        if (evento.target.classList.contains('alternar-favorito')) {  // Verifica se o clique foi no botão de alternar favorito
            const pais = paises.find(p => p.id === evento.target.dataset.id);  // Encontra o país correspondente pelo ID
            pais.favorito = !pais.favorito;  // Alterna o status de favorito
            renderizar();  // Re-renderiza as listas para refletir a mudança
        }
    });

    // Renderiza as listas inicialmente quando a aplicação é iniciada
    renderizar();
}

// Componente React que renderiza a interface da aplicação
function Pais() {
    return (
        <>
            <div className="container">
                <div className="lista-container">
                    <h2>Países</h2>  {/* Título da lista de países */}
                    <p id="contagem-esquerda">Países: 0</p>  {/* Contador de países não favoritos */}
                    <p id="populacao-esquerda">População: 0</p>  {/* Contador da população dos países não favoritos */}
                    <table id="lista-esquerda">
                        <thead>
                            <tr>
                                <th>ID</th>  {/* Cabeçalho da coluna ID */}
                                <th>NOME</th>  {/* Cabeçalho da coluna Nome */}
                                <th>POPULAÇÃO</th>  {/* Cabeçalho da coluna População */}
                                <th>BANDEIRA</th>  {/* Cabeçalho da coluna Bandeira */}
                                <th>FAVORITO</th>  {/* Cabeçalho da coluna Favorito */}
                            </tr>
                        </thead>
                        <tbody></tbody>  {/* Corpo da tabela, que será preenchido dinamicamente */}
                    </table>
                </div>
                <div className="lista-container">
                    <h2>Favoritos</h2>  {/* Título da lista de favoritos */}
                    <p id="contagem-direita">Países: 0</p>  {/* Contador de países favoritos */}
                    <p id="populacao-direita">População: 0</p>  {/* Contador da população dos países favoritos */}
                    <table id="lista-direita">
                        <thead>
                            <tr>
                                <th>ID</th>  {/* Cabeçalho da coluna ID */}
                                <th>NOME</th>  {/* Cabeçalho da coluna Nome */}
                                <th>POPULAÇÃO</th>  {/* Cabeçalho da coluna População */}
                                <th>BANDEIRA</th>  {/* Cabeçalho da coluna Bandeira */}
                                <th>FAVORITO</th>  {/* Cabeçalho da coluna Favorito */}
                            </tr>
                        </thead>
                        <tbody></tbody>  {/* Corpo da tabela, que será preenchido dinamicamente */}
                    </table>
                </div>
            </div>
        </>
    );
}

// Exporta o componente Pais para ser utilizado em outras partes da aplicação
export default Pais;
