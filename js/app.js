/*
 * Create a list that holds all of your cards
 */

const cardAr = [ // Cards listed in array
  'anchor',
  'bicycle',
  'bolt',
  'bomb',
  'cube',
  'diamond',
  'leaf',
  'paper-plane-o'
];

const cardAr2 = cardAr.concat(cardAr); // Double the cards

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

shuffle(cardAr2); // * Shuffle all the cards for initial deck

let mCount = 0; // Create variable for moves count
let sCount = 3; // Create variable for stars count
let showAr = []; // Create an empty array for holding showed cards
const clShow = document.getElementsByClassName("show"); // Create shortcut for selecting showed cards

function clickRespond(evt) {
  const e = evt.target;

  function showCard() {
    showAr.push(e.querySelector('i').classList);
    e.classList.add('show');
  }

  function matchCheck() {
    const c1 = showAr[0].toString();
    const c2 = showAr[1].toString();

    if (c1 === c2) {
      clShow[1].classList.add('match');
      clShow[1].classList.remove('show');

      clShow[0].classList.add('match');
      clShow[0].classList.remove('show');

      showAr = [];

    } else {
      setTimeout(function () {
        clShow[1].classList.remove('show');
        clShow[0].classList.remove('show');
        showAr = [];
      }, 500);
    }
  }

  if (e.nodeName === 'LI' && e.classList.contains('show') !== true && e.classList.contains('match') !== true) {
    if (showAr.length < 1) {
      showCard();

    } else if (showAr.length < 2) {
      showCard();
      matchCheck();

      mCount++;
      document.querySelector('.moves').textContent = mCount;
    }
  }
}

function createDeck() {
  const deckCo = document.createElement('ul');
  deckCo.classList = 'deck';
  document.querySelector('.container').appendChild(deckCo);

  const clDeck = document.querySelector('.deck');
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

  clDeck.appendChild(fragment); // * Add each card's HTML to the page
  clDeck.addEventListener('click', clickRespond);
}
createDeck(); // Create initial deck

function resetStars() {
  const clStars = document.querySelector('.stars');
  clStars.parentNode.removeChild(clStars);

  document.querySelector('.score-panel').insertAdjacentHTML('afterbegin', '<ul class="stars"></ul>');

  for (let s = 0; s < 3; s++) {
    document.querySelector('.stars').insertAdjacentHTML('afterbegin', '<li><i class="fa fa-star"> </i></li>');

  }
}

function gameRestart() {
  const clDeck = document.querySelector('.deck');
  clDeck.parentNode.removeChild(clDeck);

  showAr = [];
  mCount = 0;
  sCount = 3;
  document.querySelector('.moves').textContent = mCount;

  shuffle(cardAr2);
  createDeck();
  resetStars();
}
document.querySelector('.restart').addEventListener('click', gameRestart);



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
