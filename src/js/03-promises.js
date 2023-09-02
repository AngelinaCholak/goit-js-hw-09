// // Імпорт бібліотеки Notiflix
// const Notiflix = require('notiflix');

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const shouldResolve = Math.random() > 0.3;
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// const delayEl = document.querySelector('input[name="delay"]');
// const stepEl = document.querySelector('input[name="step"]');
// const amountEl = document.querySelector('input[name="amount"]');
// const form = document.querySelector('.form');

// function promiseSubmit(event) {
//   event.preventDefault();
//   const results = [];
//   let delay = parseInt(delayEl.value);

//   for (let i = 1; i <= parseInt(amountEl.value); i++) {
//     const promise = createPromise(i, delay);
//     results.push(promise);
//     delay += parseInt(stepEl.value);
//   }

//   Promise.all(results)
//     .then((resolvedPromises) => {
//       resolvedPromises.forEach(({ position, delay }) => {
        
//         Notiflix.Notify.Success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       });
//     })
//     .catch((error) => {
      
//       Notiflix.Notify.Failure(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
//     });
// }

// form.addEventListener('submit', promiseSubmit);
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


document.querySelector('.form').addEventListener('submit', function (e) {
  e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы

  const delay = parseInt(document.querySelector('input[name="delay"').value);
  const step = parseInt(document.querySelector('input[name="step"').value);
  const amount = parseInt(document.querySelector('input[name="amount"').value);

  
  for (let i = 1; i <= amount; i++) {
    const position = i;
    createPromise(position, delay + (i - 1) * step)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});