
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStartEl = document.querySelector(`button[data-start]`);
const btnStopEl = document.querySelector(`button[data-stop]`);


btnStartEl.addEventListener("click", onChangeBgColor);
btnStopEl.addEventListener("click", onStopChangeBgColor)
btnStopEl.disabled = true;


function onChangeBgColor(event) {
    btnStartEl.disabled = true;
    btnStopEl.disabled = false;
    const timerId = setInterval(() => {
     document.body.style.backgroundColor = getRandomHexColor()
  }, 1000);
}

function onStopChangeBgColor() {
    btnStartEl.disabled = false;
    btnStopEl.disabled = true;
    clearInterval(timerId);
}

