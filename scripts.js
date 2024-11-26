// Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Formatar valor do input
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
  }

  console.log(newExpense)
}