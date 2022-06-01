import Notiflix from 'notiflix';

const refs = {
    firstDelay: document.querySelector('input[name="delay"]'),
    stepDelay: document.querySelector('input[name="step"]'),
    amount: document.querySelector('input[name="amount"]'),
    btnSubmit: document.querySelector('button'),
}

refs.btnSubmit.addEventListener('click', onClickSubmit)
function onClickSubmit(event) {
    event.preventDefault();

     let amount = +refs.amount.value;
     let delay = +refs.firstDelay.value;
     let step = +refs.stepDelay.value;
    
    for (let i = 1; i <= amount; i += 1) {   
        if (i > 1) {
            delay += step;
      }
     createPromise(i, delay)
       .then(({ position, delay}) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
       })
       .catch(({ position, delay}) => {
       Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
       });
    } 
  }
 
function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay});
            } else {
                reject({ position, delay });
            }
        }, delay)
});
}


