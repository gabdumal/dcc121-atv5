let estado = {
  pessoas: [],
  produtos: [],
  idProxPessoa: 0,
  idProxProduto: 0,
};

// Captura elementos do DOM
const formPessoa = document.querySelector("#addPessoa");
const addProduto = document.querySelector("#addProduto");
const btnCustoFixo = document.querySelector("#btnCustoFixo");
const btnPerCapita = document.querySelector("#btnPerCapita");
const valorCadaUm = document.querySelector("#valorCadaUm");

// Adiciona ouvintes
formPessoa.addEventListener("submit", submitListener);
btnCustoFixo.addEventListener("click", btnCustoFixoClickListener);
btnPerCapita.addEventListener("click", btnPerCapitaClickListener);

function submitListener(event) {
  event.preventDefault();
  adicionaPessoa();
  // Limpa formulário
  formPessoa.reset();
}

function btnCustoFixoClickListener() {
  if (addProduto.descricao.value != "" && addProduto.valor.value != "") {
    adicionaProduto("cf");
    addProduto.reset();
  }
}
function btnPerCapitaClickListener() {
  if (addProduto.descricao.value != "" && addProduto.valor.value != "") {
    adicionaProduto("pc");
    addProduto.reset();
  }
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
  btnRemover.classList.add("btn-remover");
  btnRemover.addEventListener("click", removePessoa);
  const nomePessoa = document.createElement("span");
  nomePessoa.textContent = nome;
  linha.appendChild(btnRemover);
  linha.appendChild(nomePessoa);
  linha.setAttribute("data-id-pessoa", idPessoa);
  listaPessoas.appendChild(linha);

  atualizaValorCadaUm();
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

  atualizaValorCadaUm();
}

function buscaPessoa(pessoa) {
  return pessoa.idPessoa == this;
}

function adicionaProduto(tipo) {
  // Estado
  const idProduto = estado.idProxProduto;
  const descricao = addProduto.descricao.value;
  const valor = addProduto.valor.value;
  const produtoObj = {
    descricao: descricao,
    valor: valor,
    tipo: tipo,
    idProduto: idProduto,
  };
  estado.produtos.push(produtoObj);
  estado.idProxProduto++;

  // DOM
  let table = 0;
  if (tipo === "cf") {
    table = document.querySelector("#custosFixos");
  } else {
    table = document.querySelector("#custosPerCapita");
  }
  const tr = document.createElement("tr");
  const tdDescricao = document.createElement("td");
  const tdValor = document.createElement("td");
  const tdRemover = document.createElement("td");
  tdDescricao.textContent = descricao;
  tdValor.textContent = valor;
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "❌";
  btnRemover.classList.add("btn-remover");
  btnRemover.addEventListener("click", removeProduto);
  tdRemover.appendChild(btnRemover);
  tr.appendChild(tdDescricao);
  tr.appendChild(tdValor);
  tr.appendChild(tdRemover);
  tr.setAttribute("data-id-produto", idProduto);
  table.appendChild(tr);

  atualizaValorCadaUm();
}

function removeProduto(event) {
  // Captura elementos e dados
  const btnRemover = event.target;
  const tdRemover = btnRemover.parentElement;
  const tr = tdRemover.parentElement;
  const tdDescricao = tr.firstElementChild;
  const tdValor = tr.children[1];
  const idProduto = Number(tr.getAttribute("data-id-produto"));

  // Remove elementos
  btnRemover.remove();
  tdRemover.remove();
  tdDescricao.remove();
  tdValor.remove();
  tr.remove();

  // Remove registro do estado
  const produtos = estado.produtos;
  const indice = produtos.findIndex(buscaProduto, idProduto);
  produtos.splice(indice, 1);

  atualizaValorCadaUm();
}

function buscaProduto(produto) {
  return produto.idProduto == this;
}

function atualizaValorCadaUm() {
  valorCadaUm.textContent = calculaValor();
}

function calculaValor() {
  const numPessoas = estado.pessoas.length;
  const produtos = estado.produtos;
  let valorTotal = 0;
  for (const produto of produtos) {
    if (produto.tipo === "cf" && numPessoas > 0) {
      valorTotal += produto.valor / numPessoas;
    } else {
      valorTotal += produto.valor * numPessoas;
    }
  }
  return valorTotal;
}
