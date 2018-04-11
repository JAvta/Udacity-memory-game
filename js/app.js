/*
 * Create a list that holds all of your cards
 */

const cardAr = [
  'anchor',
  'bicycle',
  'bolt',
  'bomb',
  'cube',
  'diamond',
  'leaf',
  'paper-plane-o'
];

const cardAr2 = cardAr.concat(cardAr); // Double the values

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

shuffle(cardAr2); // * Shuffle the list of cards



let showAr = [];
function clickRespond(evt) {
  const e = evt.target;
  const sh = document.getElementsByClassName("show");

  if (e.nodeName === 'LI' && e.classList.contains('show') !== true && e.classList.contains('match') !== true) {
    if (showAr.length < 1) {
      showAr.push(e.querySelector('i').classList);
      e.classList.add('show');

    } else if (showAr.length < 2) {
      showAr.push(e.querySelector('i').classList);
      e.classList.add('show');

      let c1 = showAr[0].toString();
      let c2 = showAr[1].toString();

      if (c1 === c2) {
        sh[1].classList.add('match');
        sh[1].classList.remove('show');

        sh[0].classList.add('match');
        sh[0].classList.remove('show');
        showAr = [];

      } else {
        setTimeout(function () {
          sh[1].classList.remove('show');
          sh[0].classList.remove('show');
          showAr = [];
        }, 500);
      }
    }
  }

}
function createDeck() {
  const deckContainer = document.createElement('ul');
  deckContainer.classList = 'deck';
  document.querySelector('.container').appendChild(deckContainer);

  const remove = document.querySelector('.deck')
  const fragment = document.createDocumentFragment();
  const totalCards = cardAr2.length;

  for (let i = 0; i < totalCards; i++) { // * Loop through each card and create its HTML
    const newEl = document.createElement('li');
    const innerEl = document.createElement('i');

    newEl.classList = 'card';
    innerEl.classList = 'fa fa-' + cardAr2[i];

    newEl.appendChild(innerEl);
    fragment.appendChild(newEl);
  }

  document.querySelector('.deck').appendChild(fragment); // * Add each card's HTML to the page
  document.querySelector('.deck').addEventListener('click', clickRespond);
  document.querySelector('.restart').addEventListener('click', restartDeck);
}
createDeck();

function restartDeck() {
  const d = document.querySelector('.deck');
  d.parentNode.removeChild(d);
  shuffle(cardAr2);
  createDeck();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
