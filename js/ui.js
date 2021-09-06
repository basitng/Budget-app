const modalBox = () => {
const modal = document.querySelector('.dashboard');

const budgetForm = document.querySelector('.income--form');

const budgetFormTrigger = document.querySelector('.add--budget');

budgetFormTrigger.onclick = () => {
  budgetForm.classList.toggle('active--income');
}

const modalTrigger = document.querySelector('.fixed-btn');


modalTrigger.onclick = () => {
  modal.classList.toggle('active--dashboard');
  modalTrigger.classList.toggle('active--trigger');
}
} 
modalBox();

const inputFunc = () => {
  const inputs = document.querySelectorAll('input');
  const labels = document.querySelectorAll('label');
  
  inputs.forEach(input => {
    input.onfocus = (e) => {
      input.classList.toggle('active--input');
    labels.forEach(label => {
     if(e.target.id === label.getAttribute('for')){
      label.classList.add('active--label');
      
      input.onblur = () => {
        if(input.value === '') label.classList.remove('active--label');
        input.classList.remove('active--input');
      }
     }
    })
    }
  })
}
inputFunc();