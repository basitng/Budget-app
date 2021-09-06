class Budget {
  constructor() {
    this.product = document.querySelector('.product');
    this.price = document.querySelector('.price');
    this.message = document.querySelector('.message');
    this.expense = document.querySelector('.expense');
    this.balance = document.querySelector('.balance');
    this.budget = document.querySelector('.income');
    this.budgetAmt = document.querySelector('#income');
    this.submitBtn = document.querySelector('.submit--btn');
    this.addBudgetBtn = document.querySelector('.add--budget');
    this.budgetAmount = localStorage.getItem('budgetAmount');

    this.budget.innerText = "₦" + this.budgetAmount;

    this.budgetLists = JSON.parse(localStorage.getItem('budgetLists')) || [];
    this.container = document.querySelector('.container');
  }
  submitForm() {
    let product = this.product.value;
    let price = parseInt(this.price.value);
    if (!product || !price) {
      this.messager('err', 'Invalid inputs', 2000);
      return;
    }
    this.addBudget(product, price);
    this.price.value = '';
    this.product.value = '';
  }
  addBudget(product, price) {
    this.budgetLists.push({
      product,
      price,
      id: Math.random() * 6000
    })
    localStorage.setItem('budgetLists', JSON.stringify(this.budgetLists))
    this.messager('success', 'Budget added successfully', 3000);
    this.clearElement();

  }
  renderUI() {
    this.budgetLists.forEach(budget => {
      const card = document.createElement('div');
      const block1 = document.createElement('div');
      const block2 = document.createElement('div');
      const product = document.createElement('h5');
      const price = document.createElement('h5');
      const del = document.createElement('button');
      const edit = document.createElement('button');

      card.classList.add('z-depth-2', 'card');
      block1.classList.add('block1');
      block2.classList.add('block2');
      del.classList.add('btn', 'fixed', 'white-text');
      edit.classList.add('btn', 'grey', 'white-text');

      product.innerText = budget.product;
      price.innerText = budget.price;
      edit.innerText = 'edit';
      del.innerText = 'delete';

      block1.append(product);
      block1.append(price);
      block2.append(edit);
      block2.append(del);
      card.append(block1);
      card.append(block2);
      this.container.append(card);

      del.onclick = () => {
        this.budgetLists.forEach(item => {
          if (item.id == budget.id) {
            this.budgetLists.splice(item, 1);
            localStorage.setItem('budgetLists', JSON.stringify(this.budgetLists))
            this.clearElement();
          }
        })
      }
      edit.onclick = () => {
        this.budgetLists.forEach(item => {
          if (item.id == budget.id) {
            let product = this.product.value = budget.product;
            let price = this.price.value = budget.price;
            this.submitBtn.onclick = () => {
              budget.price = price;
              budget.product = product;
              this.budgetLists.splice(item, 1);
              localStorage.setItem('budgetLists', JSON.stringify(this.budgetLists))
              this.clearElement();
            }
          }
        })
      }
    })
    let sumOfPrice = this.addBudgetPrice();

    this.expense.innerHTML = "₦" + sumOfPrice;

    this.balance.innerText = `₦${this.budgetAmount - sumOfPrice} `;
    let budget = this.budgetAmount;
    if (sumOfPrice > budget) {
      this.balance.style.color = 'red';
    } else if (budget > sumOfPrice) {
      this.balance.style.color = 'green';
    }
  }
  clearElement() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild)
    }
    this.renderUI();
  }
  messager(type, msg, dur) {
    switch (type) {
      case 'err':
        this.message.innerText = msg;
        this.message.classList.add('active--error');
        setTimeout(() => {
          this.messager.innerText = '';
          this.message.classList.remove('active--error')
        }, dur)
      case 'success':
        this.message.innerText = msg;
        this.message.classList.add('active--success');
        setTimeout(() => {
          this.messager.innerText = '';
          this.message.classList.remove('active--success')
        }, dur)
      default:
        break
    }
  }
  budgetForm() {
    let price = this.budgetAmt.value;

    if (!price) return;

    this.budgetAmount = price;
    localStorage.setItem('budgetAmount', this.budgetAmount);

    this.budget.innerText = this.budgetAmount;

    this.messager('success', "Budget added successfully", 4000);
  }
  addBudgetPrice() {
    let price = this.budgetLists.reduce((n1, n2) => {
      n1 += n2.price;
      return n1;
    }, 0);
    return price;
  }
  forceReload() {
    document.location.reload();
  }
}

// Event listeners
function eventListeners() {
  const form = document.querySelector('form');
  const budgetBtn = document.querySelector('.add--budgetAmt');
  let budget = new Budget();
  budget.renderUI();
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    budget.submitForm();
  });
  budgetBtn.addEventListener('click', e => {
    budget.budgetForm();
    budget.forceReload();
  })

}

;
document.addEventListener('DOMContentLoaded', eventListeners);