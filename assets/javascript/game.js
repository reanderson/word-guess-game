// VARIABLES

var wordBank = ['abyssinian', 'american bobtail', 'american curl', 'american shorthair', 'american wirehair', 'balinese', 'bengal', 'birman', 'bombay', 'british shorthair', 'burmese', 'burmilla', 'chartreux', 'chinese li hua', 'colorpoint sorthair', 'cornish rex', 'cymric', 'devon rex', 'egyptian mau', 'european burmese', 'havana brown', 'himalayan', 'japanese bobtail', 'javanese', 'korat', 'laperm', 'maine coon', 'manx', 'nebelung', 'norwegian forest', 'ocicat', 'oriental shorthair', 'persian', 'ragamuffin', 'ragdoll', 'russian blue', 'savannah', 'scottish fold', 'selkirk rex', 'siamese', 'siberian', 'singapura', 'snowshoe', 'somali', 'sphynx', 'tonkinese', 'turkish angora', 'turkish van']

var win = 0;
var loss = 0;
var guess = 12;

var winCount = document.getElementById("winCount");
var lossCount = document.getElementById("lossCount");
var guessRemaining = document.getElementById("guessCount");
var currentWord = document.getElementById("wordToGuess");
var guessesMade = document.getElementById("guessesMade");

// FUNCTIONS

function getRandInt(min, max) {
  // takes two integers, where min is smaller than max
  // returns a random integer between min and max
  // potential returns include min, but do not include max
  return Math.floor(Math.random() * (max - min)) + min;
};

function chooseWord(array) {
  // takes an array of strings
  // get a random integer based on the length of the inputted array
  var index = getRandInt(0, array.length);

  // use random index to select word from the array
  var word = array[index];

  // write the selected word to the console, for testing purposes
  console.log(word);

  // return selected word
  return word;
}

function wordToBlanks(word) {
  // takes a string
  // returns an array of underscores and spaces as long as the inputted word

  // create empty array
  var result = []

  // loop through every character in the word
  for (i = 0; i < word.length; i++){
    // if the character is a space, push a non-breaking space to the array
    if (word[i] === " ") {
      result.push("&nbsp;");
    } else {
      // otherwise, push an underscore
      result.push("_");
    }
  }
  return result;
}

function wordDisplay(array, location) {
  // takes an array and a location to write to
  // writes out the contents of the array, with spaces between each item

  // create empty string
  var toWrite = "";

  // loop through contents of array
  for (i = 0; i < array.length; i++){
    // add the item at this index to the string, followed by a space
    toWrite = toWrite + array[i] + " ";
  }

  // Write produced string to location
  location.innerHTML = toWrite;
}

function arrayUpdate(array, word, letter) {
  // takes an array, a word, and a letter
  
  // for every character in the word,
  for (i = 0; i < word.length; i++) {
    // if the current character is the same as the chosen letter,
    if (word[i] === letter) {
      // update the array at the same index to be that letter
      array[i] = letter;
    }
    // if not, just move onto the next
  }

  // return the updated array
  return array;
}

function game() {
  // SETUP NEW GAME
  // Reset remaining guesses
  guess = 12;
  guessRemaining.textContent = guess;

  // Create empty array for this game's guesses,
  var currentGuesses = [];

  // Update guesses made display to be blank,
  wordDisplay(currentGuesses, guessesMade);

  // Get new word
  var word = chooseWord(wordBank);

  // parse word for display
  var wordArray = wordToBlanks(word);
  wordDisplay(wordArray, currentWord);

  // on a key press,
  document.onkeyup = function (event) {
    // Captures the key press, converts it to lowercase, and saves it to a variable.
    var input = event.key.toLowerCase();
    console.log(input)

    // check if the letter has been guessed already
    // if it has not been guessed, continue on
    if (!currentGuesses.includes(input)) {
              // add the chosen letter to the current guesses,
              currentGuesses.push(input);
              // and update the guesses made display
              wordDisplay(currentGuesses, guessesMade);
      // check if the pressed letter is in the word
      if (word.includes(input)) {
        // if yes, update wordArray to reflect the added letter,
        wordArray = arrayUpdate(wordArray, word, input);
        // and update the display
        wordDisplay(wordArray, currentWord);
        // Then, if no more _s remain in wordArray,
        if (!wordArray.includes("_")) {
          // alert the user that they won
          alert("You won! The word was " + word + "!");
          // update the win count
          win++;
          winCount.textContent = win;
          // And start a new game
          game()
        }
      
      } else {
        // remove one from the number of guesses remaining
        guess--;
        guessRemaining.textContent = guess;
        // if 0 guesses remain,
        if (guess === 0){
          // alert the user that they lost, and wat the word was
          alert("You lost! The word was "+ word + "! Try again next time!")
          // update the loss count
          loss++
          lossCount.textContent = loss;
          // And start a new game
          game()
        }
      }
    }
}
}

//Run Game
game()