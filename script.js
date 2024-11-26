const scrambledWords = document.getElementById('scrambled-word');
const guess = document.getElementById('guess');
const button = document.querySelector('#submit button');
const answer = document.getElementById('answer');
const correctScore = document.getElementById('correct-score');
const wrongScore = document.getElementById('wrong-score');
const next = document.getElementById('next');
const restart = document.getElementById('restart');

const words = [
    "apple", "banana", "cherry", "dog", "eagle", "flower", "grape", "horizon", "iceberg", "jungle",
    "kangaroo", "lemon", "mountain", "nebula", "ocean", "pebble", "quartz", "river", "sunset",
    "tiger", "umbrella", "vortex", "whale", "xylophone", "yellow", "zebra", "anchor", "blossom",
    "cloud", "dolphin", "ember", "forest", "galaxy", "harbor", "island", "journey", "key", "light",
    "mystery", "nature", "orchard", "peace", "quiet", "rainbow", "sparkle", "tranquil", "unity",
    "victory", "wisdom", "zenith", "adventure", "breeze", "cascade", "dream", "explore", "freedom",
    "garden", "harmony", "idea", "joy", "knowledge", "landscape", "magic", "night", "oasis", "passion",
    "quest", "reflection", "serenity", "treasure", "uplift", "voyage", "wonder", "youth", "zeal",
    "amber", "bridge", "compass", "desert", "essence", "fountain", "grace", "happiness", "ignite",
    "jade", "kinship", "legend", "moment", "nurture", "optimism", "patience", "quill", "resilience",
    "spirit", "trust", "uplift", "vista", "warmth", "yearning", "zen"];

let currentWord;
let scrambledWord;
let correctGuesses = 0;
let wrongGuesses = 0;

function load() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    scrambledWord = currentWord.split('').sort(() => Math.random() - 0.5).join('');
    scrambledWords.innerText = `Scrambled Word: ${scrambledWord}`;
    correctScore.innerText = `Correct: ${correctGuesses}`;
    wrongScore.innerText = `Wrong: ${wrongGuesses}`;
    guess.value = '';
    answer.innerText = '';
    next.style.display = 'none';
};

function checkGuess() {
    const userGuess = guess.value.trim().toLowerCase();
    if (userGuess === currentWord) {
        correctGuesses++
        answer.innerText = "Correct! Well done!";
        answer.style.color = "green";
    } else {
        wrongGuesses++
        answer.innerText = `Incorrect, The correct word is ${currentWord}! `;
        answer.style.color = "red"
    }
    correctScore.innerText = `Correct: ${correctGuesses}`;
    wrongScore.innerText = `Wrong: ${wrongGuesses}`;
    if (!checkEndGame()) {
        next.style.display = 'flex';
        next.style.justifyContent = 'center';
    }
    guess.disabled = true;
    button.disabled = true;
};

function nextGame() {
    load();
    guess.disabled = false;
    button.disabled = false;
};

function checkEndGame() {
    if (wrongGuesses >= 3) {
        endGame();
        return true;
    }
    return false;
};

function endGame() {
    answer.innerText = `Incorrect, The correct word is ${currentWord}! Game Over! You had ${correctGuesses} correct guesses.`;
    answer.style.color = 'red';
    scrambledWords.innerText = '';
    guess.disabled = true;
    button.disabled = true;
    next.style.display = 'none'
    restart.style.display = 'flex';
    restart.style.justifyContent = 'center';
};

function restartGame() {
    correctGuesses = 0;
    wrongGuesses = 0;
    guess.disabled = false;
    button.disabled = false;
    restart.style.display = "none";
    load();
};

button.addEventListener('click', checkGuess);
restart.addEventListener('click', restartGame);
next.addEventListener('click', nextGame);
guess.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});

load()