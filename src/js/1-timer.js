const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('button[data-start]')
const daySpan = document.querySelector('span[data-days]')
const hoursSpan = document.querySelector('span[data-hours]')
const minsSpan = document.querySelector('span[data-minutes]')
const secsSpan = document.querySelector('span[data-seconds]')

// Описаний в документації
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate; 
let timerId;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];

        const currentDate = new Date();

        if (selectedDate < currentDate) {
            iziToast.error({
                title: 'Error',
                message: 'Illegal operation',
                backgroundColor: 'red',
                theme: 'dark',
                titleColor: 'white',
                position: 'topRight',
                messageSize: '16px',
                titleSize: '16px'
            });
            return;
        }

        userSelectedDate = selectedDate;
        /* console.log(userSelectedDate); */
        startBtn.disabled = false;
        
    },
};

flatpickr(input, options);

startBtn.addEventListener("click", handlerStartBtn);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

/* console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20} */

function handlerStartBtn() {
    const startDate = userSelectedDate.getTime();

    console.log(startDate);
    

    timerId = setInterval(() => {
        const currentDate = new Date(); 
        const ms = startDate - currentDate; 

        if(ms <= 0) {
            clearInterval(timerId);
            console.log("Finish");
            input.disabled = false;
            return
        }
        
        const { days, hours, minutes, seconds } = convertMs(ms);
        daySpan.textContent = addLeadingZero(days);
        hoursSpan.textContent = addLeadingZero(hours);
        minsSpan.textContent = addLeadingZero(minutes);
        secsSpan.textContent = addLeadingZero(seconds);
    }, 1000)

    startBtn.disabled = true;
    input.disabled = true;
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}