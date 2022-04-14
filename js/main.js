// Game of War using cardsapi.com
document.querySelector('.newGame').addEventListener('click',playAgain)

document.querySelector('button').addEventListener('click', drawTwo)

// Open up for deck_id, which cardsAPI uses.

let deckId = ''
let data;
url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`

// We'll need to fetch when we first load and also upon requiring reshuffle.

// Initial fetch here.
fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        data = data;
        console.log(data)
        deckId = data.deck_id;
    })
    .catch(err => {
        console.log(`error ${err}`)
    });

// Global players and wins
let pl1;
let pl2;
let wins = [];
pl1Wins = 0;
pl2Wins = 0;

// When button is pressed, draw two cards, display, determine who's winning, and reshuffle as needed. Phew!

function drawTwo() {
    // Use the deck_id value to poll the API fro 2 cards.
    let url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

    fetch(url)
        .then(res => res.json())
        .then(data => {

            // Display the cards 
            document.querySelector('.player1').src = data.cards[0].image
            document.querySelector('.player2').src = data.cards[1].image
            console.log(data)

            pl1 = data.cards[0].code[0];
            pl2 = data.cards[1].code[0];
            console.log(pl1 + " " + pl2);

            // let's also ensure we have enough cards...
            if (data.remaining < 4) {
                url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`

                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        deckId = data.deck_id;
                    })
            }

            // convert pl1
            if (pl1 == 'ACE') {
                pl1 = 14;
            }
            else if (pl1 == 'K') {
                pl1 = 13;
            }
            else if (pl1 == "Q") {
                pl1 = 12;
            }
            else if (pl1 == "J") {
                pl1 = 11;
            }
            else if (pl1 == '0') {
                pl1 = 10;
            }
            else {
                pl1 = Number(pl1)
            }

            // convert
            if (pl2 == 'ACE') {
                pl2 = 14;
            }
            else if (pl2 == "K") {
                pl2 = 13;
            }
            else if (pl2 == "Q") {
                pl2 = 12;
            }
            else if (pl2 == "J") {
                pl2 = 11;
            }
            else if (pl2 == '0') {
                pl2 = 10;
            }
            else {
                pl2 = Number(pl2);
            }

            let newTD;
            // Compare
            if (pl1 > pl2) {
                wins.push(pl1);
                pl1Wins++;
                if (pl1Wins >= 10) {
                    alert("Player1 wins!")

                }
                newTD = `<tr><td class='playr1'> X </td><td></td></tr>`;
                document.querySelector('table').innerHTML += newTD;

            }
            else if (pl2 > pl1) {
                wins.push(pl2);
                pl2Wins++;
                if (pl2Wins >= 10) {
                    alert("Player2 wins!")
                }
                document.querySelector('table').innerHTML +=
                    `<tr><td></td><td class='playr2'> X </td></tr>`;
            }
            else {
                wins.push('draw');
            }
        })
}

function playAgain() {
    window.location.reload();
    pl1Wins = 0;
    pl2Wins = 0;

}