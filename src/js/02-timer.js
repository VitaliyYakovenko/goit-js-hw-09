import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


const timeElems = document.querySelectorAll(".value");
const btnStart = document.querySelector("button[data-start]");
btnStart.disabled = true;

let active = false;

const time = new flatpickr("#datetime-picker", options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
  onClose(selectedDates) {
    const timeСalendar = selectedDates[0].getTime();
    const timerId = setInterval(() => {

    const timeNow = Date.now();

      if (timeNow > timeСalendar) {
        alert("Please choose a date in the future");
        btnStart.disabled = true;
        clearInterval(timerId);
        return
      }
      btnStart.disabled = false;
      
      const differenceTime = timeСalendar - timeNow;
      const timerTime = convertMs(differenceTime);
      if(active) {
        onOpenTimer(time.close());
        updateTime(timerTime);   
      } 
      
    }, 1000)
  },
});


btnStart.addEventListener("click", onOpenTimer);
 
function onOpenTimer(t) {
  active = true
  if (active) {
  time.close();
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
