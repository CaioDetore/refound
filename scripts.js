// Seleciona os elementos do formulário.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Elementos da lista.
const expenseList = document.querySelector("ul");
const expenseTotal = document.querySelector("aside header h2");
const expenseQuantity = document.querySelector("aside header p span");

// Formatar valor do input.
amount.oninput = () => {
  // "/\D/g" regex que valida somente digitos
  let value = amount.value.replace(/\D/g, "");

  value = Number(value) / 100;

  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return value;
}

form.onsubmit = (event) => {
  event.preventDefault();

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    // criando elemento.
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // cria info da despesa.
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // adicionando nome e categoria na info.
    expenseInfo.append(expenseName, expenseCategory);

    // adicionando valor.
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    // adicionando icone de remover.
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("alt", "remover");
    removeIcon.setAttribute("src", "./img/remove.svg");

    // Adicionando informações no item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // Adicionando informações na lista.
    expenseList.append(expenseItem);

    formClear();
    updateTotals();
  } catch (error) {
    alert("Não foi possivel atualizar a lista de despesas.");
    console.error(error);
  }
}

function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul).
    const items = expenseList.children;

    // Atualiza a qtd de itens.
    expenseQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    // Calculando total.
    let total = 0;

    // percorre cada item (li) da lista (ul).
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      // remove caracteres nao númericos
      let value = itemAmount.textContent.replace(/[^\d,]/g, "");

      value = parseFloat(value);

      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular o total. O valor precisa ser um número."
        );
      }

      // incrementar o valor
      total += Number(value);
    }

    // criando elementos e conteudo.
    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    expenseTotal.innerHTML = "";

    expenseTotal.append(symbolBRL, total);
  } catch (error) {
    console.error(error);
    alert("Não foi possível atualizar o total");
  }
}

// Evento que captura o clique nos itens da lista.
expenseList.addEventListener("click", function (event) {
  // Verifica se o elemento clicado é o icone remover.
  if (event.target.classList.contains("remove-icon")) {
    // Obtém a li pai do elemento clicado. ("o pai mais próximo")
    const item = event.target.closest(".expense");
    item.remove();
  }

  updateTotals();
});

function formClear() {
  amount.value = "";
  expense.value = "";
  category.value = "";
  category.value = "";

  expense.focus();
}
