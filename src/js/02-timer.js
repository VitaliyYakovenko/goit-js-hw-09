import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const timeElems = document.querySelectorAll(".value");
const btnStart = document.querySelector("button[data-start]");
btnStart.disabled = true;
let timerId = null;
let active = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < options.defaultDate) {
        alert("Please choose a date in the future"); 
      } else {
          options.defaultDate = selectedDates[0];
          btnStart.removeAttribute("disabled");
    }
  },
};

const time = new flatpickr("#datetime-picker" , options);


btnStart.addEventListener("click", onOpenTimer);
 
function onOpenTimer() {
  active = true;

  if (active) {
    timerId = setInterval(() => {
      time.close();
      const dateNow = Date.now()
      const value = options.defaultDate.getTime() - dateNow;

      const elemTime = convertMs(value);
      
      updateTime(elemTime);
      
      if (value < 0) {
        clearInterval(timerId);
        timeElems[0].textContent = "00";
        timeElems[1].textContent = "00";
        timeElems[2].textContent = "00";
        timeElems[3].textContent = "00";
        return;
      }
    }, 1000);
  } 
  
  

}

function updateTime({ days, hours, minutes, seconds } = {}) {
  timeElems[0].textContent = days;
  timeElems[1].textContent = hours;
  timeElems[2].textContent = minutes;
  timeElems[3].textContent = seconds;
}


function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

