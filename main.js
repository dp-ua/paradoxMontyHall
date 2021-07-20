const card1 = document.getElementById("1");
const card2 = document.getElementById("2");
const card3 = document.getElementById("3");
const title = document.getElementById("title");

const winText = document.getElementById("winText");
const looseText = document.getElementById("looseText");


card1.addEventListener('click', () => chooseCard(card1));
card2.addEventListener('click', () => chooseCard(card2));
card3.addEventListener('click', () => chooseCard(card3));


let cards = Array(card1, card2, card3);

function getRandom() {
    return Math.round(Math.random() * 2);
}

function clearCards() {
    cards.forEach(c => {
        c.classList.remove("loose");
        c.classList.remove("win")
        c.classList.remove("select");
        c.classList.add("new");
    });
}

function unselectCards() {
    cards.forEach(c => {
        c.classList.remove("select");
    });
}

function startGame() {
    title.innerHTML = "Choose card for the first time";
    round = 1;
    randomCard = getRandom();
    changeResults();
    clearCards();
}

function changeResults() {
    winText.innerText = good == 0 ? 0 : "Count: " + good + ", " + Math.round((good / (good + bad)) * 100, 0) + "%";
    looseText.innerText = bad == 0 ? 0 : "Count: " + bad + ", " + Math.round((bad / (good + bad)) * 100, 0) + "%";
}

function chooseCard(card) {

    if (!card.classList.contains("loose") || round == 3) {
        unselectCards();
        card.classList.add("select");
        selectedCard = card.id - 1;
        selectCard();
    }
}

function arrayRandElement(arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

function selectCard() {
    switch (round) {
        case 1:
            title.innerHTML = "I opened one another card. You can change your mide. Choose card";
            round = 2;
            let freeCards = [];
            cards.forEach(function(card, index, cards) {
                if (index != randomCard && index != selectedCard) freeCards.push(card);
            });
            arrayRandElement(freeCards).classList.add("loose");
            console.log(freeCards.toString());
            break;
        case 2:
            let info = " New game - click on any card. "
            if (selectedCard == randomCard) {
                title.innerHTML = "You win. Gratz :)";
                good++;
            } else {
                title.innerHTML = "Sorry, you loose :(";
                bad++;
            }
            clearCards();
            cards.forEach(function(card, index, cards) {
                if (index == randomCard) {
                    card.classList.add("win");
                } else {
                    card.classList.add("loose");
                }
            });
            round = 3;
            changeResults();
            break;
        case 3:
            startGame();
            break;
    }
}

let good = 0;
let bad = 0;
let round = 1;
let randomCard = 0;
let selectedCard = 0;

startGame();