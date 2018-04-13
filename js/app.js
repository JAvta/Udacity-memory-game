/*
 * Create a list that holds all of your cards
 */

/**
 ** Display the cards on the page
 **   - shuffle the list of cards using the provided "shuffle" method below
 **   - loop through each card and create its HTML
 **   - add each card's HTML to the page
 **/

/***
 *** Set up the event listener for a card. If a card is clicked:
 ***  - display the card's symbol (put this functionality in another function that you call from this one)
 ***  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 ***  - if the list already has another card, check to see if the two cards match
 ***    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 ***    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 ***    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 ***    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 ***/

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

const cardAr2 = cardAr.concat(cardAr); // * Create a list that holds all of your cards


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

shuffle(cardAr2); // ** - shuffle the list of cards using the provided "shuffle" method

let mCount = 0; // Create variable for moves count
let sCount = 3; // Create variable for stars count
let showAr = []; // Create an empty array for holding showed cards

// Main function set for showing and matching cards as well as counting moves and amending stars
function clickRespond(evt) {
  const e = evt.target;

  function showCard() {
    e.classList.add('show'); // *** If a card is clicked - display the card's symbol
    showAr.push(e.querySelector('i').classList); // *** - add the card to a *list* of "open" cards
  }

  function matchCheck() { // *** - if the list already has another card, check to see if the two cards match

    const showCl = document.getElementsByClassName("show");
    const c1 = showAr[0].toString();
    const c2 = showAr[1].toString();

    if (c1 === c2) { // *** + if the cards do match, remove the cards from the list and lock the cards in the open position
      showAr = [];

      showCl[1].classList.add('match');
      showCl[1].classList.remove('show');

      showCl[0].classList.add('match');
      showCl[0].classList.remove('show');

    } else { // *** + if the cards do not match, remove the cards from the list and hide the card's symbol
      setTimeout(function () { // Add 500ms delay before hiding cards
        showAr = [];

        showCl[1].classList.remove('show');
        showCl[0].classList.remove('show');
      }, 500);
    }
  }

  function starsCount() {
    function removeOne() {
      sCount--;
      const clStars = document.querySelector('.stars');
      clStars.removeChild(clStars.firstChild);
    }

    if (sCount === 3 && mCount > 15) {
      removeOne();
      
    } else if (sCount === 2 && mCount > 45) {
      removeOne();
    }
  }

  function movesCount() { // *** + increment the move counter and display it on the page
    mCount++;
    document.querySelector('.moves').textContent = mCount;

    starsCount();
  }

  if (e.nodeName === 'LI' && e.classList.contains('show') !== true && e.classList.contains('match') !== true) {
    if (showAr.length < 1) {
      showCard();

    } else if (showAr.length < 2) {
      showCard();

      matchCheck();
      movesCount();
    }
  }
}

function createDeck() { // ** Display the cards on the page
  const deckCo = document.createElement('ul'); // Create deck container
  deckCo.classList = 'deck';
  document.querySelector('.container').appendChild(deckCo);

  const deckCl = document.querySelector('.deck');
  const fragment = document.createDocumentFragment();
  const totalCards = cardAr2.length;

  for (let i = 0; i < totalCards; i++) { // ** - loop through each card and create its HTML
    const newEl = document.createElement('li');
    const innerEl = document.createElement('i');

    newEl.classList = 'card';
    innerEl.classList = 'fa fa-' + cardAr2[i];

    newEl.appendChild(innerEl);
    fragment.appendChild(newEl);
  }

  deckCl.appendChild(fragment); // ** - add each card's HTML to the page
  deckCl.addEventListener('click', clickRespond); // *** Set up the event listener for a card
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
  const deckCl = document.querySelector('.deck');
  deckCl.parentNode.removeChild(deckCl);

  showAr = [];
  mCount = 0;
  sCount = 3;
  document.querySelector('.moves').textContent = mCount;

  shuffle(cardAr2);
  createDeck();
  resetStars();
}
document.querySelector('.restart').addEventListener('click', gameRestart);
