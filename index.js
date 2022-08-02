let estado = {
  pessoas: [],
  produtos: [],
  idProxPessoa: 0,
};

// Captura elementos do DOM
const formPessoa = document.querySelector("#addPessoa");
const addProduto = document.querySelector("#addProduto");

// Adiciona ouvintes
formPessoa.addEventListener("submit", submitListener);

function submitListener(event) {
  event.preventDefault();

  adicionaPessoa();

  // Limpa formulário
  formPessoa.reset();
}

function adicionaPessoa() {
  // Estado
  const idPessoa = estado.idProxPessoa;
  const nome = formPessoa.nome.value;
  const pessoaObj = { nome: nome, idPessoa: idPessoa };
  estado.pessoas.push(pessoaObj);
  estado.idProxPessoa++;

  // DOM
  const listaPessoas = document.querySelector("#pessoas");
  const linha = document.createElement("li");
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "❌";
  btnRemover.addEventListener("click", removePessoa);
  const nomePessoa = document.createElement("span");
  nomePessoa.textContent = nome;
  linha.appendChild(btnRemover);
  linha.appendChild(nomePessoa);
  linha.setAttribute("data-id-pessoa", idPessoa);
  listaPessoas.appendChild(linha);
}

function removePessoa(event) {
  // Captura elementos e dados
  const btnRemover = event.target;
  const linha = btnRemover.parentElement;
  const nomePessoa = linha.lastElementChild;
  const idPessoa = Number(linha.getAttribute("data-id-pessoa"));

  // Remove elementos
  btnRemover.remove();
  nomePessoa.remove();
  linha.remove();

  // Remove registro do estado
  const pessoas = estado.pessoas;
  const indice = pessoas.findIndex(buscaPessoa, idPessoa);
  pessoas.splice(indice, 1);
}

function buscaPessoa(pessoa) {
  return pessoa.idPessoa == this;
}
