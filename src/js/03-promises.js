import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}

const delayRef = document.querySelector('input[name="delay"]');
const stepRef = document.querySelector('input[name="step"]');
const amountRef = document.querySelector('input[name="amount"]');
const formRef = document.querySelector('.form');

formRef.addEventListener('submit', event => {
  event.preventDefault();

  let delay = Number(delayRef.value);
  const step = Number(stepRef.value);
  const amount = Number(amountRef.value);

  for (let i = 1; i <= amount; i += 1) {
    if (i > 1) {
      delay += step;
    };
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
      });
  }
});
