// VARIABLES

var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var wordBank = ['abyssinian', 'aegean', 'american curl', 'american bobtail', 'american shorthair', 'american wirehair', 'aphrodite giant', 'arabian mau', 'australian mist', 'balinese', 'bambino', 'bengal', 'birman', 'bombay', 'brazilian shorthair', 'british shorthair', 'british longhair', 'burmese', 'burmilla', 'california spangled', 'chartreux', 'chausie', 'colorpoint shorthair', 'cornish rex', 'cymric', 'devon rex', 'donskoy', 'dragon li', 'eyptial mau', 'european shorthair', 'exotic shorthair', 'foldex', 'german rex', 'havana brown', 'highlander', 'himalayan', 'japanese bobtail', 'javanese', 'khao manee', 'korat', 'korean bobtail', 'korn ja', 'kurilian bobtail', 'laperm', 'lykol', 'main coon', 'manx', 'mekong bobtail', 'minskin', 'munchkin', 'nebelung', 'ocicat', 'oregon rex', 'oriental bicolor', 'oriental shorthair', 'oriental longhair', 'persian', 'ragamuffin', 'ragdoll', 'russian blue', 'sam sawet', 'savannah', 'scottish fold', 'selkirk rex', 'serengeti', 'serrade petit', 'siamese', 'siberian forest cat', 'singapura', 'snowshow', 'sokoke', 'somali', 'sphynx', 'suphalak', 'thai lilac', 'tonkinese', 'toyger', 'turkish angora', 'turkish van', 'ukranian levkoy', 'york chocolate']

var win = 0;
var loss = 0;
var guess = 10;

var winCount = document.getElementById("winCount");
var lossCount = document.getElementById("lossCount");
var guessRemaining = document.getElementById("guessCount");
var currentWord = document.getElementById("wordToGuess");
var guessesMade = document.getElementById("guessesMade");
var messageBox = document.getElementById('messageBox');
var newBtn = document.getElementById('newBtn')

//=======================================================================================

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
  for (i = 0; i < word.length; i++) {
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
  for (i = 0; i < array.length; i++) {
    // add the item at this index to the string, followed by a space
    toWrite = toWrite + array[i] + " ";
  }

  // Write produced string to location
  location.innerHTML = toWrite;
}

function arrayUpdate(array, word, letter) {
  // takes an array, a word, and a letter

  // make a counter variable
  var count = 0;

  // for every character in the word,
  for (i = 0; i < word.length; i++) {
    // if the current character is the same as the chosen letter,
    if (word[i] === letter) {
      // update the array at the same index to be that letter and increase counter
      array[i] = letter;
      count++;
    }
    // if not, just move onto the next
  }

  // Note in the message box how many times the letter occurred
  messageBox.textContent = count + ' "' + letter + '" found'

  // return the updated array
  return array;
}

function game() {
  // SETUP NEW GAME
  // Reset remaining guesses
  guess = 10;
  guessRemaining.textContent = guess;

  // Create empty array for this game's guesses,
  var currentGuesses = [];

  // Update guesses made display to be blank,
  wordDisplay(['&nbsp;'], guessesMade);

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

    //only continue if user input a letter
    if (letters.includes(input)) {

      // check if the letter has been guessed already
      // if it has not been guessed, continue on
      if (!currentGuesses.includes(input)) {

        // clear error message box
        messageBox.textContent = ""

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
            messageBox.textContent = "You won! The word was " + word + "!";

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

          // and note in message box that none were found
          messageBox.textContent = 'No "' + input + '" found'

          // if 0 guesses remain,
          if (guess === 0) {

            // alert the user that they lost, and wat the word was
            messageBox.textContent = "You lost! The word was " + word + "! Try again next time!"

            // update the loss count
            loss++
            lossCount.textContent = loss;

            // And start a new game
            game()
          }
        }
      } else {
        // if you already guessed that letter, write into the error message box that you already guessed that letter
        messageBox.textContent = "You already guessed this letter!"
      }
    } else {
      // if input is not a letter, write into the error message box that you didn't input a letter
      messageBox.textContent = "Please guess a letter."
    }
  }
}



//=======================================================================================

// PAGE CONTENT
newBtn.onclick = function() {
  console.log("New Game Button Pressed");
  game()
}

//Run Game
game()