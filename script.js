//API
const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
//ELEMNTS
const quoteInputElement = document.querySelector("#quoteInput");
const quoteDisplayElement = document.querySelector('#quoteDisplay');
const timerElement = document.querySelector('#timer'); 

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
                characterSpan.classList.add('correct');
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
        timerElement.innerText = getTimerTime();
    },1000)
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

getNextTextQuote();