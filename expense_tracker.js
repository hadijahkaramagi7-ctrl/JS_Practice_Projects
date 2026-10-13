// Expense Tracker - saved in localStorage

const descInput = document.getElementById('descInput');
const amountInput = document.getElementById('amountInput');
const categoryInput = document.getElementById('categoryInput');
const totalAmount = document.getElementById('totalAmount');
const expenseList = document.getElementById('expenseList');
const summary = document.getElementById('summary');

// Load expenses from localStorage, or start empty
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Save to localStorage and re-render
function save() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
  render();
}

// Add a new expense
function addExpense() {
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  // Validate
  if (desc === '') {
    alert('Please enter a description.');
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    alert('Please enter a valid amount.');
    return;
  }

  expenses.push({
    id: Date.now(),
    desc: desc,
    amount: amount,
    category: category
  });

  // Reset form
  descInput.value = '';
  amountInput.value = '';

  save();
}

// Delete an expense by id
function deleteExpense(id) {
  expenses = expenses.filter(function (e) { return e.id !== id; });
  save();
}

// Clear everything
function clearAll() {
  if (expenses.length === 0) return;
  if (confirm('Delete all expenses?')) {
    expenses = [];
    save();
  }
}

// Render the list, total, and per-category summary
function render() {
  // Total
  let total = 0;
  expenses.forEach(function (e) { total = total + e.amount; });
  totalAmount.textContent = total.toFixed(2);

  // Category summary
  const byCategory = {};
  expenses.forEach(function (e) {
    byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
  });
  summary.innerHTML = '';
  for (const cat in byCategory) {
    const span = document.createElement('span');
    span.textContent = cat + ': ' + byCategory[cat].toFixed(2);
    summary.appendChild(span);
  }

  // List
  expenseList.innerHTML = '';
  if (expenses.length === 0) {
    expenseList.innerHTML = '<li style="justify-content:center;color:#aaa;">No expenses yet</li>';
    return;
  }
  expenses.forEach(function (e) {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="info">
        <div class="desc">${e.desc}</div>
        <div class="cat">${e.category}</div>
      </div>
      <span class="amt">${e.amount.toFixed(2)}</span>
      <button onclick="deleteExpense(${e.id})">×</button>
    `;
    expenseList.appendChild(li);
  });
}

// Initial render on page load
render();
