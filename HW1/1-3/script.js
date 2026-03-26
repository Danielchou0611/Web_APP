const questions = [
    {
        question: "哪一位是 NVIDIA (輝達) 的共同創辦人兼現任執行長？",
        options: ["Lisa Su", "Jensen Huang", "Elon Musk", "Tim Cook"],
        answer: 1
    },
    {
        question: "AMD (超微半導體) 的現任執行長是誰？",
        options: ["Jensen Huang", "Lisa Su", "Satya Nadella", "Sam Altman"],
        answer: 1
    },
    {
        question: "Apple (蘋果) 的現任執行長是哪一位？",
        options: ["Steve Jobs", "Tim Cook", "Jony Ive", "Larry Page"],
        answer: 1
    },
    {
        question: "Tesla (特斯拉) 的老闆是誰？",
        options: ["Bill Gates", "Jeff Bezos", "Elon Musk", "Mark Zuckerberg"],
        answer: 2
    },
    {
        question: "Meta (原 Facebook) 的創辦人是誰？",
        options: ["Mark Zuckerberg", "Jack Dorsey", "Sam Altman", "Tim Cook"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options-container');
const scoreEl = document.getElementById('score');
const feedbackEl = document.getElementById('feedback');
const feedbackTextEl = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');
const quizBody = document.getElementById('quiz-body');

function loadQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(index));
        optionsEl.appendChild(button);
    });

    // 重設按鈕文字為下一題
    nextBtn.innerText = "下一題";
}

function resetState() {
    feedbackEl.classList.add('hidden');
    while (optionsEl.firstChild) {
        optionsEl.removeChild(optionsEl.firstChild);
    }
}

function selectOption(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].answer;
    const buttons = optionsEl.getElementsByClassName('option-btn');

    for (let btn of buttons) {
        btn.disabled = true;
    }

    if (selectedIndex === correctIndex) {
        score++;
        scoreEl.innerText = score;
        buttons[selectedIndex].classList.add('correct');
        feedbackTextEl.innerText = "答對了！";
        feedbackTextEl.className = "feedback-correct";
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[correctIndex].classList.add('correct');
        feedbackTextEl.innerText = `答錯了。正確答案是：${questions[currentQuestionIndex].options[correctIndex]}`;
        feedbackTextEl.className = "feedback-wrong";
    }

    // 如果是最後一題，直接把按鈕改為「再試一次」
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.innerText = "再玩一次";
    }

    feedbackEl.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
    // 如果點擊的是「再試一次」，則重新整理頁面
    if (nextBtn.innerText === "再玩一次") {
        location.reload();
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    }
});

// 初始化
loadQuestion();
