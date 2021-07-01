//API
const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
//ELEMNTS
const quoteInputElement = document.querySelector("#quoteInput");
const quoteDisplayElement = document.querySelector('#quoteDisplay');
const timerElement = document.querySelector('#timer'); 
const startButtonElement = document.querySelector('#start-button'); 
const topLogoElement = document.querySelector('#top-page-logo');
let numberOfCorrect = 0; 

if (quoteDisplayElement && quoteInputElement){
    quoteInputElement.addEventListener("input", () =>{
        const quoteCharacters = quoteDisplayElement.querySelectorAll('span');
        const inputValueCharacters = quoteInputElement.value.split('');
        let correct = true;

        quoteCharacters.forEach((characterSpan, index) => {
            const character = inputValueCharacters[index];
            if (!character){
                characterSpan.classList.remove('correct');
                characterSpan.classList.remove('incorrect')
                correct = false;
                return;
            }
            if (character === characterSpan.innerText){
                if (!characterSpan.classList.contains('correct')) {
                    characterSpan.classList.add('correct');
                    numberOfCorrect++;
                    console.log(numberOfCorrect);
                }      
                characterSpan.classList.remove('incorrect');
            } else {
                characterSpan.classList.add('incorrect');
                characterSpan.classList.remove('correct');
                correct = false;
            }
        })

        if (correct) getNextTextQuote();
    })
}

if(startButtonElement){
    startButtonElement.addEventListener("click",()=>{
        startButtonElement.style.display = "none";
        getNextTextQuote();
        if (quoteInputElement) quoteInputElement.focus();
        if (topLogoElement) topLogoElement.style.visibility = "visible";
    })
}

function getRandomTextQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

//console.log(new Date().getFullYear());

let startTime;
function startTimer(){
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        let currentTime = getTimerTime();
        const minute = 60;
        let typeSpeed = numberOfCorrect/currentTime*minute;
        timerElement.innerText = currentTime +" - "+ Math.round(typeSpeed);
    },100)
}

function getTimerTime(){
    return Math.floor((new Date() - startTime) / 1000)
}

async function getNextTextQuote(){
    if (!quoteDisplayElement || !quoteInputElement) return;
    const quote = await getRandomTextQuote();
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach(character => {
        const characterQuoteSpan = document.createElement('span');
        characterQuoteSpan.innerText = character;
        quoteDisplayElement.append(characterQuoteSpan);
    });
    quoteInputElement.value = null;

    startTimer();
}
