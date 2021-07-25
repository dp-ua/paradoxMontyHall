function getLang() {
    var url = location.href;
    let lang = url.match(/lang=([^&]+)/);
    return lang == null ? "ru" : lang[1].toLocaleLowerCase();
}

let language = getLang();

function round1Text() {
    switch (language) {
        case "ua":
            return "Раунд 1.<br/>Оберіть карту";
        case "en":
            return "Round 1.<br/>Choose the card";
        default:
            return "Раунд 1.<br/>Выберите карту";
    }
}

function round2Text() {
    switch (language) {
        case "ua":
            return "Раунд 2.<br/>Я відкрив іншу карту<br/> Оберіть карту";
        case "en":
            return "Round 2.<br/>I have opened another card.<br/> Choose the card";
        default:
            return "Раунд 2. <br/> Я открыл одну из двух оставшихся карт.<br/> Выберите карту";
    }
}


function winnerText() {
    switch (language) {
        case "ua":
            return "Ви виграли :)";
        case "en":
            return "You won :)";
        default:
            return "Вы выиграли :)";
    }
}

function looserText() {
    switch (language) {
        case "ua":
            return "Ви програли :(";
        case "en":
            return "You lost :(";
        default:
            return "Вы проиграли :(";
    }
}

function newGame() {
    switch (language) {
        case "ua":
            return "Натисніть на будь-яку карту для продовження..."
        case "en":
            return "Press any card to continue...";
        default:
            return "Нажмите на любую карту для продолжения...";
    }
}

function rulesTitle() {
    switch (language) {
        case "en":
            return "Rules";
        default:
            return "Правила";
    }
}

function rule() {
    switch (language) {
        case "ua":
            return "<ul> <li> Ві граєте у вікторину. </li> <li> Вам пропонуються три карти. За одною с них ховається приз. </li> <li> У першому раунді ви можете обрати будь-яку з трьох карт. </li> <li> Після цього я відкрию одну з двох, що залишилися і не має призу. </li> <Li> У другому раунді ви маєте знов зробити вибір. Ви можете затвердити його або обрати іншу карту. </li> <li>Хай щастить :) </li> </ ul>";
        case "en":
            return "<ul> <li> You play a quiz. </li> <li> Three cards are offered for your. One of them hides a prize. </li> <li> In the first round you can choose any of them. </li> <li> After that I will open one of the two free cards without prize. </li> <Li> In the second round, you can confirm(select the same card like at first time) or change your choice(choose another card). </li> <li> Good Luck :) </li> </ ul>";
        default:
            return "<ul> <li> Вы играете в викторину. </li> <li> Вашему вниманию предлагаются три карты. За одной из них находится приз. </li> <li> В первом раунде вы можете выбрать любую из трех карт. </li> <li> После этого я открою одну из двух оставшихся, где приза нет. </li> <li> Во втором раунде вы можете подтвердить свой выбор или изменить решение и выбрать другую карту. </li> <li> Удачи: ) </li> </ul>";
    }
}

const ru = document.getElementById("ru");
const ua = document.getElementById("ua");
const en = document.getElementById("en");
let langs = Array(ru, ua, en);

ru.addEventListener('click', () => chooseLang(ru));
ua.addEventListener('click', () => chooseLang(ua));
en.addEventListener('click', () => chooseLang(en));

function chooseLang(lang) {
    clearLang();
    lang.classList.add("selectLang");
    language = lang.innerText.toLowerCase();
    changeLanguage();
}


function changeLanguage() {
    switch (round) {
        case 1:
            title.innerHTML = round1Text();
            break;
        case 2:
            title.innerHTML = round2Text();
            break;
        default:
            title.innerHTML = "";
    }
    document.getElementById("rule").innerHTML = rule();
    document.getElementById("rules-title").innerText = rulesTitle();
    document.getElementById("newGame").innerText = newGame();
}

function clearLang() {
    langs.forEach(lang => {
        lang.classList.remove("selectLang");
    });
}


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
    title.innerHTML = round1Text();
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
            title.innerHTML = round2Text();
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
                title.innerHTML = winnerText();
                good++;
            } else {
                title.innerHTML = looserText();
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
let ver = "2.0.2";

/*
    test just random choosen card. 
*/
function testRandom() {
    let card = cards[getRandom(0, 2)];
    console.log("chosen:" + card.innerHTML);
    chooseCard(card);
    chooseCard(card);
    chooseCard(card);
}

/*
first choice - random card. 
second - change to another free. 
*/
function testChange() {
    let card = cards[getRandom(0, 2)];
    let cardToChange;
    chooseCard(card);
    cards.forEach(c => {
        if (!c.classList.contains("loose") && !c.classList.contains("select")) cardToChange = c;
    });
    console.log("Choice :" + card.innerText + ">>>" + cardToChange.innerText);
    chooseCard(cardToChange);
    chooseCard(cardToChange);
}

document.getElementById("version").innerText = "Version: " + ver;
clearScope()
startGame();
chooseLang(document.getElementById(language));


/* remove comment if you whant to run tests

for (let i = 0; i < 1000; i++) {
    testChoice();
}

 */