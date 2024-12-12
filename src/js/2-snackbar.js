// Описаний у документації
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener("submit", handlerSubmitBtn);

function handlerSubmitBtn (evt){
    evt.preventDefault();

    const delay = evt.target.elements.delay.value;
    const stateValue = evt.target.elements.state.value;
    

    const makePromise = (stateValue, delay) => {
        return new Promise ((resolve, reject) => {
            setTimeout (() => {
                if (stateValue === "fulfilled") {
                    resolve(delay);
                } else {
                    reject(delay);
                }
            }, delay);
    });
};

    makePromise (stateValue, delay)
    .then(item => {
        console.log(item);
        
        iziToast.success({
            title: 'OK',
            message: `Fulfilled promise in ${item}ms`,
            backgroundColor: 'green',
            theme: 'dark',
            titleColor: 'white',
            position: 'topRight',
            messageSize: '16px',
            titleSize: '16px'
        });
    })
    .catch(value => {
        console.log(value);
        
        iziToast.error({
            title: 'Error',
            message: `Rejected promise in ${value}ms`,
            backgroundColor: 'red',
            theme: 'dark',
            titleColor: 'white',
            position: 'topRight',
            messageSize: '16px',
            titleSize: '16px'
        });
    });
}

