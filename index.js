let estado = {
  pessoas: [],
  produtos: [],
};

// Captura elementos do DOM
const formPessoa = document.querySelector("#addPessoa");
const addProduto = document.querySelector("#addProduto");

// Adiciona ouvintes
formPessoa.addEventListener("submit", submitListener);

function submitListener(event) {
  event.preventDefault();

  const nome = formPessoa.nome.value;
  estado.pessoas.push(nome);

  console.log(estado);
}
