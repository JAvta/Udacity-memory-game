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
 ***   - display the card's symbol (put this functionality in another function that you call from this one)
 ***   - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 ***   - if the list already has another card, check to see if the two cards match
 ***     + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 ***     + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 ***     + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 ***     + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
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

const cardAr2x = cardAr.concat(cardAr); // * Create a list that holds all of your cards
const totalCards = cardAr2x.length;

let openAr; // Hold opened cards

let sCount; // Stars
let mCount; // Moves
let tCount; // Time

let s; // Seconds
let m; // Minutes

let time; // Time function

let deckCl; // Select "deck" class
let starsCl; // Select "stars" class
const movesCl = document.querySelector('.moves'); // Select "moves" class
const timeCl = document.querySelector('.time'); // Select "time" class

function clickRespond(evt) {
  const e = evt.target;

  function showCard() {
    e.classList.add('show'); // *** If a card is clicked - display the card's symbol
    openAr.push(e.querySelector('i').classList); // *** - add the card to a *list* of "open" cards
  }

  function matchCheck() { // *** - if the list already has another card, check to see if the two cards match
    const showCl = document.getElementsByClassName("show");
    const c1 = openAr[0].toString();
    const c2 = openAr[1].toString();

    if (c1 === c2) { // *** + if the cards do match, remove the cards from the list and lock the cards in the open position
      for (let i = 1; i >= 0; i--) {
        showCl[i].classList.add('match');
        showCl[i].classList.remove('show');
      }
      openAr = [];

    } else { // *** + if the cards do not match, remove the cards from the list and hide the card's symbol
      setTimeout(function () { // Add a slight delay before hiding cards allowing to see and memorise both of them
        for (let i = 1; i >= 0; i--) {
          showCl[i].classList.remove('show');
        }
        openAr = [];
      }, 300);
    }

    movesCount();
  }

  function movesCount() { // *** + increment the move counter and display it on the page
    mCount++;
    movesCl.textContent = mCount;
    starsCount();
  }

  function starsCount() {
    function removeOne() {
      const fa_starCl = document.getElementsByClassName("fa-star");

      sCount--;
      fa_starCl[sCount].classList.add('fa-star-o');
      fa_starCl[sCount].classList.remove('fa-star');
    }

    if (sCount === 3 && mCount > 12) {
      removeOne();

    } else if (sCount === 2 && mCount > 16) {
      removeOne();
    }

    gameCheck();
  }

  function gameCheck() {
    if (document.getElementsByClassName("match").length === totalCards) {
      timeStop();
      resetDeck();
      gameWon();
    }
  }

  function gameWon() {
    if (tCount < 60) { // Display seconds if less than 1 minute
      tCount = `${tCount} seconds`;

    } else if (tCount < 3600) { // Display minutes and seconds if less than 1 hour
      const ss = s !== 1 ? 's' : ''; // Plural second
      const ms = m !== 1 ? 's' : ''; // Plural minute

      tCount = `${m} minute${ms} and ${s} second${ss}`;

    } else { // Display 'ages!' if more than 1 hour
      tCount = 'ages!'
    }

    const congrats =
    `<div class="won">
      <i class="fa fa-check-circle-o"></i>
      <h1>Congratulations! You Won!</h1>
      <p>Game duration: ${tCount}</p>
      <span class="card match again"> Play again?</span>
    </div>`;

    deckCl.classList.add('won');
    deckCl.insertAdjacentHTML('afterbegin', congrats);
    document.querySelector('.again').addEventListener('click', newGame);
  }

  // clickRespond on unopened cards only
  if (e.nodeName === 'LI' && e.classList.contains('show') !== true && e.classList.contains('match') !== true) {
    if (openAr.length < 1) {
      showCard();

    } else if (openAr.length < 2) {
      showCard();
      matchCheck();
    }
  }
}

function resetStars() {
  if (starsCl != null) { // Remove stars if there are any
    starsCl.parentNode.removeChild(starsCl);
  }

  document.querySelector('.score-panel').insertAdjacentHTML('afterbegin', '<ul class="stars"></ul>');
  starsCl = document.querySelector('.stars');

  for (let i = 0; i < sCount; i++) {
    starsCl.insertAdjacentHTML('afterbegin', '<li><i class="fa fa-star"></i></li>');
  }
}

function resetDeck() { // Create deck container
  if (deckCl != null) { // Remove deck if there is one already
    deckCl.parentNode.removeChild(deckCl);
  }

  document.querySelector('.container').insertAdjacentHTML('beforeend', '<ul class="deck"></ul>');
  deckCl = document.querySelector('.deck');
}

function appendCards() { // ** Display the cards on the page
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalCards; i++) { // ** - loop through each card and create its HTML
    const newEl = document.createElement('li');
    const innerEl = document.createElement('i');

    newEl.classList = 'card';
    innerEl.classList = 'fa fa-' + cardAr2x[i];

    newEl.appendChild(innerEl);
    fragment.appendChild(newEl);
  }

  deckCl.appendChild(fragment); // ** - add each card's HTML to the page
  deckCl.addEventListener('click', clickRespond); // *** Set up the event listener for a card
}

function timeStop() {
  clearInterval(time);
}

function timeStart() {
  if (tCount === 0) { // Start counting seconds after first two cards opened
    time = setInterval(function () {

      if (tCount > 60) {
        s = tCount % 60; // Reminder should be seconds
        m = (tCount - s) / 60; // Divide by 60 minus seconds should be minutes
        timeCl.textContent = `${m}:${s}`;
      } else {
        timeCl.textContent = `00:${tCount}`;
      }

      tCount++;
    }, 1000);
  }
}

function newGame() {
  timeStop();

  openAr = [];

  sCount = 3;
  mCount = 0;
  tCount = 0;

  movesCl.textContent = mCount;
  timeCl.textContent = '00:00';

  resetStars();
  resetDeck();

  shuffle(cardAr2x); // ** - shuffle the list of cards using the provided "shuffle" method
  appendCards();

  timeStart();
}
document.querySelector('.fa-repeat').addEventListener('click', newGame);

newGame();
