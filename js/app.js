const modal = document.createElement('div');
modal.classList.add('modal');
modal.id = 'confirmacaoModal';
modal.innerHTML = `
  <div class="modal-content">
    <p>Tem certeza que deseja devolver este jogo?</p>
    <div class="modal-buttons">
      <button id="confirmarBtn">Sim</button>
      <button id="cancelarBtn">Não</button>
    </div>
  </div>
`;
document.body.appendChild(modal);

let jogoSelecionado = null;

function contarJogosAlugados() {
  const alugados = document.querySelectorAll('.dashboard__item__img--rented');
  console.log(`Jogos alugados: ${alugados.length}`);
}

function alterarStatus(id) {
  const game = document.getElementById(`game-${id}`);
  const imagem = game.querySelector('.dashboard__item__img');
  const botao = game.querySelector('.dashboard__item__button');

  

  if (imagem.classList.contains('dashboard__item__img--rented')) {
    // Solicita confirmação antes de devolver
    jogoSelecionado = { imagem, botao };
    document.getElementById('confirmacaoModal').style.display = 'flex';
  } else {
    // Alugar diretamente
    imagem.classList.add('dashboard__item__img--rented');
    botao.classList.add('dashboard__item__button--return');
    botao.textContent = 'Devolver';
  }
  
}

document.addEventListener('click', function (e) {
  if (e.target.id === 'confirmarBtn') {
    if (jogoSelecionado) {
      jogoSelecionado.imagem.classList.remove('dashboard__item__img--rented');
      jogoSelecionado.botao.classList.remove('dashboard__item__button--return');
      jogoSelecionado.botao.textContent = 'Alugar';
    }
    jogoSelecionado = null;
    document.getElementById('confirmacaoModal').style.display = 'none';
  }

  if (e.target.id === 'cancelarBtn') {
    jogoSelecionado = null;
    document.getElementById('confirmacaoModal').style.display = 'none';
  }

});
