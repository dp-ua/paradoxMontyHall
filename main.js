const round1Text = "Раунд 1.<br/>Выберите карту";
const round2Text = "Раунд 2. <br/> Я открыл одну из двух оставшихся карт.<br/> Выберите карту";
const newGameText = " Для начала новой игры - нажмите на любую карту. ";
const winnerText = "Вы выиграли :)";
const looserText = "Вы проиграли :(";

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
    document.getElementById("newGame").classList.add("hide");
    title.innerHTML = round1Text;
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
            title.innerHTML = round2Text;
            round = 2;
            let freeCards = [];
            cards.forEach(function(card, index, cards) {
                if (index != randomCard && index != selectedCard) freeCards.push(card);
            });
            arrayRandElement(freeCards).classList.add("loose");
            break;
        case 2:
            document.getElementById("newGame").classList.remove("hide");
            if (selectedCard == randomCard) {
                title.innerHTML = winnerText;
                good++;
            } else {
                title.innerHTML = looserText;
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

function clearScope() {
    good = 0;
    bad = 0;
    round = 1;
    randomCard = 0;
    selectedCard = 0;
    results = [0, 0, 0];
}
let ver = "1.6.5";

document.getElementById("version").innerText = "Version: " + ver;
clearScope()
startGame();