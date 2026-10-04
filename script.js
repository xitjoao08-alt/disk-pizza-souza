const items = [

  ['3 QUEIJOS', '48',
    'Muçarela, requeijão, parmesão, tomate, azeitona e orégano',
    'salgada'],

  ['4 QUEIJOS', '48',
    'Muçarela, requeijão, parmesão, cheddar, tomate, azeitona e orégano',
    'salgada'],

  ['MUSSARELA', '48',
    'Muçarela, orégano, tomate e azeitona',
    'salgada'],

  ['BACON', '48',
    'Bacon, muçarela, tomate, orégano e azeitona',
    'salgada'],

  ['AMERICANA', '48',
    'Muçarela, presunto, bacon, milho, tomate, azeitona e orégano',
    'salgada'],

  ['ATUM', '48',
    'Muçarela, atum, cebola, tomate, azeitona e orégano',
    'salgada'],

  ['BAIANA', '48',
    'Muçarela, calabresa, ovo, palmito, cebola, azeitona, tomate e orégano',
    'salgada'],

  ['BRASILEIRA', '48',
    'Muçarela, calabresa, ovo, palmito, cebola, azeitona, tomate e orégano',
    'salgada'],

  ['BRÓCOLIS C/ BACON', '58',
    'Muçarela, brócolis, bacon, alho, tomate, azeitona e orégano',
    'salgada'],

  ['CARIJÓ', '48',
    'Muçarela, frango, bacon, cheddar, batata palha, tomate, azeitona e orégano',
    'salgada'],

  ['CALABRESA', '48',
    'Muçarela, calabresa fatiada, cebola, tomate, azeitona e orégano',
    'salgada'],

  ['FRANGO REQUEIJÃO', '48',
    'Muçarela, frango, requeijão, tomate, azeitona e orégano',
    'salgada'],

  ['LOMBO CANADENSE', '48',
    'Muçarela, lombo, requeijão, cebola, tomate, azeitona e orégano',
    'salgada'],

  ['MARGUERITA', '48',
    'Muçarela, manjericão, tomate, azeitona e orégano',
    'salgada'],

  ['MODA DA CASA', '50',
    'Muçarela, calabresa, frango, bacon, milho, tomate, azeitona e orégano',
    'salgada'],

  ['PALMITO C/ BACON', '48',
    'Muçarela, bacon, palmito, tomate, azeitona e orégano',
    'salgada'],

  ['PALMITO C/ REQUEIJÃO', '48',
    'Muçarela, palmito, requeijão, tomate, azeitona e orégano',
    'salgada'],

  ['PORTUGUESA', '48',
    'Muçarela, presunto, milho, ervilha, cebola, ovo, tomate, azeitona e orégano',
    'salgada'],

  ['PRESUNTO E QUEIJO', '48',
    'Muçarela, presunto, tomate, azeitona e orégano',
    'salgada'],

  ['TOSCANA', '48',
    'Muçarela, calabresa moída, bacon, milho, cebola, tomate, azeitona e orégano',
    'salgada'],

  ['X-TUDO ESPECIAL', '58',
    'Muçarela, presunto, milho, lombo, calabresa, ovo, bacon, cebola, tomate, azeitona e orégano',
    'salgada'],

  ['BRIGADEIRO', '50',
    'Brigadeiro cremoso e granulado',
    'doce'],

  ['SENSAÇÃO', '58',
    'Chocolate ao leite e geleia de morango',
    'doce'],

  ['CREME DE AVELÃ C/ MORANGO', '58',
    'Creme de avelã com chocolate, geleia de morango',
    'doce'],

  ['BORDA DE CALABRESA', '10',
    'Adicional de borda',
    'borda'],

  ['BORDA DE CHEDDAR', '4',
    'Adicional de borda',
    'borda'],

  ['BORDA DE CHOCOLATE', '10',
    'Adicional de borda',
    'borda'],

  ['BORDA DE MUSSARELA', '10',
    'Adicional de borda',
    'borda'],

  ['COCA-COLA E FANTA 2L', '14',
    'Refrigerante 2 litros',
    'bebida'],

  ['GUARANÁ ANTARCTICA 2L', '12',
    'Refrigerante 2 litros',
    'bebida'],

  ['ROLLER 2L', '11',
    'Refrigerante 2 litros',
    'bebida'],

  ['COTUBA 2L', '10',
    'Refrigerante 2 litros',
    'bebida'],

  ['SPRITE 2L', '14',
    'Refrigerante 2 litros',
    'bebida']

];

const menu = document.querySelector('#menu');

let filter = 'todas';


/* MOSTRAR CARDÁPIO */

function render() {

  const q = document
    .querySelector('#search')
    .value
    .toLocaleLowerCase('pt-BR');

  const found = items.filter(x => {

    const categoryMatch =
      filter === 'todas' || x[3] === filter;

    const searchMatch =
      (x[0] + ' ' + x[2])
        .toLocaleLowerCase('pt-BR')
        .includes(q);

    return categoryMatch && searchMatch;

  });

  if (!found.length) {

    menu.innerHTML = `
      <div class="empty">
        Não encontramos esse item. Tente outro sabor.
      </div>
    `;

    return;
  }

  menu.innerHTML = found.map(x => `

    <article class="menu-card">

      <div class="card-top">

        <div class="card-title">
          ${x[0]}
        </div>

        <div class="price">
          R$ ${x[1]}
        </div>

      </div>

      <p class="desc">
        ${x[2]}
      </p>

      <button class="add" data-name="${x[0]}">
        Adicionar ao pedido ↗
      </button>

    </article>

  `).join('');

}


/* FILTROS */

document
  .querySelector('#filters')
  .addEventListener('click', e => {

    const b = e.target.closest('button[data-filter]');

    if (!b) return;

    filter = b.dataset.filter;

    document
      .querySelectorAll('.filter')
      .forEach(x => {
        x.classList.toggle('active', x === b);
      });

    render();

  });


/* PESQUISA */

document
  .querySelector('#search')
  .addEventListener('input', render);


/* PEDIDOS WHATSAPP */

menu.addEventListener('click', e => {

  const b = e.target.closest('[data-name]');

  if (!b) return;

  const item = items.find(
    x => x[0] === b.dataset.name
  );

  const msg =
    `Olá, Disk Pizza Souza! Quero pedir: ${item[0]} — R$ ${item[1]}.`;

  window.open(
    'https://wa.me/5517997550016?text=' +
    encodeURIComponent(msg),
    '_blank',
    'noopener'
  );

});


/* ANO AUTOMÁTICO */

document.querySelector('#year').textContent =
  new Date().getFullYear();


/* INICIALIZAÇÃO */

render();
