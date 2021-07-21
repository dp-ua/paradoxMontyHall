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

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    title.innerText = "Choose card for the first time";
    round = 1;
    randomCard = getRandom(0, 2);
    changeResults();
    clearCards();
}

function changeResults() {

    winText.innerText = good == 0 ? 0 : good + " - " + Math.round((good / (good + bad)) * 100, 0) + "%";
    looseText.innerText = bad == 0 ? 0 : bad + " - " + Math.round((bad / (good + bad)) * 100, 0) + "%";

    let sumResults = 0;
    results.forEach(r => sumResults += r);

    results.forEach(function(result, index, cards) {
        document.getElementById("card" + index).innerText = result == 0 ? 0 : result + " - " + Math.round((result / sumResults) * 100, 0) + "%";
    });

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
            break;
        case 2:
            let info = " New game - click on any card. "
            if (selectedCard == randomCard) {
                title.innerHTML = "You win. Gratz :)" + info;
                good++;
            } else {
                title.innerHTML = "Sorry, you loose :(" + info;
                bad++;
            }
            clearCards();
            cards.forEach(function(card, index) {
                if (index == randomCard) {
                    card.classList.add("win");
                } else {
                    card.classList.add("loose");
                }
            });
            round = 3;
            results[randomCard]++;
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
let results = [0, 0, 0];
let ver = "1.4";

document.getElementById("version").innerText = "Version: " + ver;
startGame();