let min = 1;
let max = 100;
const answer = Math.floor(Math.random() * 100) + 1;

const submitBtn = document.getElementById('submit-guess');
const guessInput = document.getElementById('guess-input');
const message = document.getElementById('message');
const rangeDisplay = document.getElementById('range-display');
const historyList = document.getElementById('history-list');

function updateRangeDisplay() {
    rangeDisplay.textContent = `Current Range: ${min} - ${max}`;
}

submitBtn.addEventListener('click', () => {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < min || userGuess > max) {
        message.textContent = `Please enter a valid number between ${min} and ${max}.`;
        message.className = "error";
    } else {
        // Record history
        const li = document.createElement('li');
        li.textContent = userGuess;
        historyList.appendChild(li);

        if (userGuess < answer) {
            message.textContent = "Too low! Try again.";
            message.className = "hint";
            min = userGuess + 1;
        } else if (userGuess > answer) {
            message.textContent = "Too high! Try again.";
            message.className = "hint";
            max = userGuess - 1;
        } else {
            message.textContent = `🎉 Congratulations! You guessed it! The number was ${answer}.`;
            message.className = "success";
            submitBtn.disabled = true;
            guessInput.disabled = true;
        }
        updateRangeDisplay();
    }
    
    guessInput.value = '';
    guessInput.focus();
});

guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        submitBtn.click();
    }
});
