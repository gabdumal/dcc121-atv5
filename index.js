// Captura elementos do DOM
const formPessoa = document.querySelector("#addPessoa");
const addProduto = document.querySelector("#addProduto");

// Adiciona ouvintes
formPessoa.addEventListener("submit", submitListener);

function submitListener(event) {
  event.preventDefault();
  console.log(formPessoa.nome);
}
