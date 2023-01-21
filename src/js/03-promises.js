

const formEl = document.querySelector(".form")
const inpDelay = document.querySelector("input[name=delay]");
const inpStep = document.querySelector("input[name=step]");
const inpAmount = document.querySelector("input[name=amount]")



const dataPromise = [{ position: 0, delay: 0, }];

formEl.addEventListener("submit", (event) => {
  event.preventDefault()

  const amount = +inpAmount.value;
  let delayMs = +inpDelay.value;
  let delayStep = +inpStep.value;
 
  for (let i = 0; i < amount; i += 1){

    dataPromise.position = i + 1;
    dataPromise.delay = delayMs + delayStep * i;
    
    const {position,delay} = dataPromise;
   
      createPromise( position, delay)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });

  }
})

function createPromise(position, delay) {
  
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((reslove,reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        reslove({position,delay});
      }
      else {
        reject({position,delay});
      }

    },delay)
  })
   
}