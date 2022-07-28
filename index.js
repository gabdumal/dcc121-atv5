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
  const idPessoa = estado.pessoas.length;
  const nome = formPessoa.nome.value;
  const pessoaObj = { nome: nome, idPessoa: idPessoa };
  estado.pessoas.push(pessoaObj);

  // DOM
  const listaPessoas = document.querySelector("#pessoas");
  const linha = document.createElement("li");
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "❌";
  const nomePessoa = document.createElement("span");
  nomePessoa.textContent = nome;
  linha.appendChild(btnRemover);
  linha.appendChild(nomePessoa);
  linha.setAttribute("data-id-pessoa", idPessoa);
  listaPessoas.appendChild(linha);

  // Limpa formulário
  formPessoa.reset();

  console.log(estado);
}

function removePessoa(idPessoa) {}
