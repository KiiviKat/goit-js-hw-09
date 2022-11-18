import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  inputDelayEl: document.querySelector('[name=delay]'),
  inputStepEl: document.querySelector('[name=step]'),
  inputAmountEl: document.querySelector('[name=amount]'),
  submitBtnEl: document.querySelector('[type=submit]'),
};

const onSuccess = (position, delay) => {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

const onReject = (position, delay) => {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const obj = { position, delay };

      if (shouldResolve) {
        resolve(obj);
      } else {
        reject(obj);
      }
    }, delay);
  });
}

refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let delayValue = Number(refs.inputDelayEl.value);
  const stepValue = Number(refs.inputStepEl.value);
  const amountValue = Number(refs.inputAmountEl.value);

  for (let position = 1; position <= amountValue; position += 1) {
    createPromise(position, delayValue)
      .then(res => onSuccess(res.position, res.delay))
      .catch(error => onReject(error.position, error.delay));

    delayValue += stepValue;
  }
}
