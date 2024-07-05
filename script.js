/*              Game Requirements

Description:  User will try to guess a hidden word by guessing letters one at a time.

Requirements:
1.  Display a seriese of blanks representing the hidden word.
2.  Allow users to guess letters one at a time.
3.  Keep track of which letters have been guessed.
4.  Display the guessed letters and the blanks for the hidden word.
5.  Display a win/loss message when the game is over.

Optional:
1.  First screen is a heading with a start button.
2.  The heading and start button will disappear once the game starts.




                    Pseudo Code
Image:
1.  Use photoshop to cut different sections of a picture to use.

Random words:
1.  Either use an array of words or; 
2.  Call on an encyclopedia API (This will be an improvement on a second build)
3.  Once the word is chosen, return it to another array with each of the letters.

// Initialize game variables
wordList = ["javascript", "hangman", "pseudocode", "game"]
selectedWord = random choice from wordList
guessedLetters = []
remainingGuesses = 6
displayWord = "_" repeated for each letter in selectedWord

// Main game loop
while remainingGuesses > 0 and displayWord contains "_":
    print displayWord
    print "Remaining guesses: " + remainingGuesses
    guessedLetter = prompt "Guess a letter: "
    
    if guessedLetter in guessedLetters:
        print "You already guessed that letter."
    else:
        guessedLetters.append(guessedLetter)
        
        if guessedLetter in selectedWord:
            // Update displayWord
            for each letter in selectedWord:
                if letter == guessedLetter:
                    update displayWord at that position with guessedLetter
        else:
            remainingGuesses -= 1
            print "Incorrect guess."

// End game
if displayWord contains no "_":
    print "Congratulations! You guessed the word: " + selectedWord
else:
    print "Game over! The word was: " + selectedWord



                    Working Code
*/

document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const startButton = document.getElementById('start-button');
    const content = document.getElementById('game-container');
    const actions = document.getElementById('actions');
    const intro = document.getElementById('intro');
    

    startButton.addEventListener('click', () => {
        //Reveal the content
        content.style.display = 'flex';
        content.style.flexWrap = 'wrap';

        actions.style.display = 'flex';
        actions.style.justifyContent = 'center';
        actions.style.alignItems = 'center';
    
        // Optionally, you can hide the start button after clicking
        startButton.style.display = 'none';
        intro.style.display = 'none';
    })
})

const matchingGuesses = [] // array containing the indices of the correct guesses
const correctGuesses = [] // array containing the value of the indices of the correct guesses
let guessedLetters = [];
let wrongGuesses = 0;
let remainingGuesses = 6;

console.log(`guessed letters: ${guessedLetters}`);
console.log(`wrong guesses: ${wrongGuesses}`);


const gameContainer = document.getElementById('game-container');


// provide an array of words for the random selection of words
const wordList = [
    'javascript', 
    'python', 
    'react',
    'hangman',
    'labrador',
    'pseudocode',
    'game',
    'cobol',
    'swift',
    'rust',
    'pascal',
    'perl',
    'java',
    'waterskiing',
    'software',
    'programming',
    'computer',
    'hardware',
    'engineering',
    'google',
    'netflix',
    'weather',
    'hurricane',
    'summer',
    'autumn',
    'clock'
];

// Add an initialized game function
function initializeGame(){
    // select a random word from the word list
    const randomIndex = randomWord(wordList);
    //console.log(`the random index: ${randomIndex}`)
    
    // return the selected word to access outside of the function
    return selectedWord = randomIndex.split('');
}

// call to initialize game
const startGame = initializeGame();
// call to display the selected word
const wordDisplay = displayWord(selectedWord);





// function to display the current state of the game
function displayGameState(){
    //console.log('word:  ' + guessedLetters.join(' '));
    console.log('Remaining Guesses:  ' + remainingGuesses);
}




// function to generate a random word from the wordList 

function randomWord(wordList) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
   // const selectedWord = wordList[randomIndex];
    return wordList[randomIndex];;
}



// function to place selected word into an array on the web page in the word container

console.log(`the selectedWord is: ${selectedWord}`)



// create and append an element for each item in the array
function displayWord(selectedWord) {
    const wordContainer = document.getElementById('selected-word-container');
    if(matchingGuesses.length === 0) {
        for(let i=0; i < selectedWord.length; i++){
            let char = document.createElement('div');
            char.classList.add('selected-word');
            char.id = i

            if(matchingGuesses.length !== 0) {
                char.textContent = selectedWord[i];  // Reveal the correct letter  
                wordContainer.appendChild(char);
            }
            else {
            char.textContent = '_';
            wordContainer.appendChild(char);
            }
        }
    }

        // TODO: compare matchingGuesses (array with index of correct guesses) to selectedWord to reveal the index from matchingGuesses
       /*if(matchingGuesses.length !== 0) {
            char.textContent = selectedWord[i];  // Reveal the correct letter  
        }*/
}
//}



let inputs = {
    userGuesses: ''
}



function handleGuess(e){
    // Update the inputs object with the new value
    inputs.userGuesses = e.target.value;
    let letter = inputs.userGuesses
    return letter
};



function submitForm(e){
    e.preventDefault();
    document.getElementById('guesses-form');
    /*inputs = {
        userGuesses: ''
    };*/
    console.log('=========')
    console.log(`Form submitted with the following data: ${inputs.userGuesses}`);
    console.log('=========')
    
}



//TODO: need to write logic to allow the guessed letter (analyzedLetter) to unlock the letter of the word (selectedWord)

// function to analyze a guess
function analyzeGuess(){
    
    const guessesSubmit = document.getElementById('guesses-submit')
    guessesSubmit.addEventListener('click', () => {
        let analyzedLetter = inputs.userGuesses
        //console.log(`analyzed letter: ${analyzedLetter}`)
        let isCorrectGuess = false;
        console.log(`return value letter: ${inputs.userGuesses}`)
        console.log('=======================')
        
        // Check if guessed letter is in the selected word
        for (let i = 0; i < selectedWord.length; i++){
            if(selectedWord [i] === analyzedLetter){
                guessedLetters[i] = analyzedLetter;
                isCorrectGuess = true;
                console.log(`the guess is: ${isCorrectGuess}`);
                console.log('=======================')
            }
        }
        // Decrease the number of remaining guesses if the guess is incorrect
        if(!isCorrectGuess) {
            remainingGuesses--;
        }

        // Display letters in separate array 
        if(isCorrectGuess){
            matchingIndices(selectedWord, analyzedLetter)
            updateCorrectGuesses(selectedWord, matchingGuesses)
            revealWord(correctGuesses)
            displayWord(selectedWord, matchingGuesses)
        
        }
        // Display the updated game state
        displayGameState();

        // check if game is won or lost
        //if (guessedLetters.join(' ') === selectedWord.join('')) {
        if(matchingGuesses.length === selectedWord.length){
            alert (`Congratulations! You guessed the word: ${selectedWord.join("")}`);
        } else if (remainingGuesses === 0) {
            alert (`Game Over!  The word was: ${selectedWord.join("")}`);
        }
    })
}

// Call analyzeGuess
analyzeGuess()







// function to compare the guess to the selected word and match all the matching indices. 
function matchingIndices(arr,value){
    let index = arr.indexOf(value)
    console.log(`matchingIndices arr: ${arr}`)
    console.log(`matchingIndices value: ${value}`)
    //console.log(`matchingIndices origArr: ${origArr}`)
    const values = arr.map(value => arr[value]); 
    console.log (`array values: ${index}`)
    
    // loop to determine what indices match the guessed letter and push to the array matchingGuesses
    while (index !== -1){
        matchingGuesses.push(index)
        index = arr.indexOf (value, index + 1)
        console.log(`matching guess value: ${matchingGuesses}`)
        console.log(`index: ${index}`)
    }
    // TODO: matchingGuesses returns all the indexes and pushes as more matches are correct
    return matchingGuesses
}






// Display guesses on the webpage
function displayGuesses() {
    const btn = document.getElementById('guesses-submit')
    btn.addEventListener('click', function(e){
        e.preventDefault()
        // collect form data
        let guesses = inputs.userGuesses
        console.log(`the guess is: ${guesses}`)
        // create a <p> to contain the guesses
        let p = document.createElement('p')
        p.textContent = guesses + ', '
        // append the paragraph to the output div
        let display = document.getElementById('display-guesses')
        display.appendChild(p)
        // clear form after submission
        document.getElementById('guesses-form').reset()     

    })
}

// Calls displayGuesses function
displayGuesses()



// TODO: This function is NOT working


/*
// function to reveal the index values of the selectedWord using the index values in matchingGuesses into the reveal-word-container
function revealWord() {
    const revealContainer = document.getElementById('reveal-word-container');
    //revealContainer.innerHTML = ''; // Clear the container

    for (let i = 0; i < selectedWord.length; i++) {
        let char = document.createElement('div');
        char.classList.add('selected-word');
        char.id = i;
        let test = correctGuesses.push(selectedWord[matchingGuesses[i]])
        console.log(`test value: ${test}`)
        console.log(`matchingGuesses values: ${matchingGuesses[i].values}`)
        if (matchingGuesses.includes(i)) {
            char.textContent = selectedWord[i]; // Reveal the correct letter
        } 
        /*else {
            char.textContent = '_'; // Keep it hidden
        }

        revealContainer.appendChild(char);
    }
}

revealWord()

*/
// this function places the correct guesses value from selectedWord into the correct index of correctGuesses
function updateCorrectGuesses(selectedWord, matchingGuesses) {
    for (let i = 0; i < matchingGuesses.length; i++) {
        const index = matchingGuesses[i];
        correctGuesses[index] = selectedWord[index];
        console.log(`correctGuesses: ${correctGuesses}`)
    }
    
    return correctGuesses
}

function revealWord(correctGuesses){
    for(i = 0; i < selectedWord.length; i++){
    let revealLetter = []
    console.log(`revealLetter: ${revealLetter}`)
    const reveal = document.getElementById(matchingGuesses)
    let idx = correctGuesses.pop()
    //let idx = matchingGuesses.value
    //console.log(`idx: ${idx}`)
    return revealLetter = reveal.textContent = idx
    
    }
}


/*

function revealWord () {
    const reveal = document.getElementById('reveal-word-container')
    reveal.addEventListener('click', function(e){
        e.preventDefault()
        // collect form data
        let guesses = inputs.userGuesses
        console.log(`the guess is: ${guesses}`)
        // create a <p> to contain the guesses
        let p = document.createElement('p')
        p.textContent = guesses + ', '
        // append the paragraph to the output div
        let display = document.getElementById('display-guesses')
        display.appendChild(p)
        // clear form after submission
        document.getElementById('guesses-form').reset()
}
*/