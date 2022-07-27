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

  // Estado
  const nome = formPessoa.nome.value;
  estado.pessoas.push(nome);

  // DOM
  const listaPessoas = document.querySelector("#pessoas");
  const linha = document.createElement("li");
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "❌";
  const nomePessoa = document.createElement("span");
  nomePessoa.textContent = nome;
  linha.appendChild(btnRemover);
  linha.appendChild(nomePessoa);
  listaPessoas.appendChild(linha);

  // Limpa formulário
  formPessoa.reset();

  console.log(estado);
}
