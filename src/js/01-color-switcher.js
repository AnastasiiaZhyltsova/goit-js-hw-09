function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
    // bgColorBody: document.querySelector('body'),
};

let timerId = null; 
refs.btnStart.addEventListener('click', onClickStart);

function onClickStart() {
     refs.btnStart.disabled = true;
     timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
       
    }, 1000);

   
};

refs.btnStop.addEventListener('click', onClickStop);

function onClickStop() {
    clearInterval(timerId);
    refs.btnStart.disabled = false;
   
};

