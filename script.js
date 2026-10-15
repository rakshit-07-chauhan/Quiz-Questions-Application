
const questions = [
    {
        question: "Which language runs in the browser?",
        options: ["JavaScript", "C", "Java", "Python"],
        answer: "JavaScript"
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    },
    {
        question: "Which method adds an element to an array?",
        options: [".pop()", ".push()", ".join()", ".shift()"],
        answer: ".push()"
    },
    {
        question: "Which symbol is used for strict equality?",
        options: ["=", "==", "===", "!="],
        answer: "==="
    },
    {
        question: "Which method selects an element by its ID?",
        options: [
            "getElementById()",
            "getElementsByClassName()",
            "queryAll()",
            "getElement()"
        ],
        answer: "getElementById()"
    }
];

const questionNumber = document.getElementById("questionNumber");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("optionsContainer");

const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");

const quizContainer = document.getElementById("quizContainer");
const resultContainer = document.getElementById("resultContainer");
const finalScore = document.getElementById("finalScore");

// .value when we want to fatch user's value ,otherwise no any kind of need of .value

let currentQuestion = 0;

let selectedAnswers = new Array(questions.length).fill(null);

function showQuestion() {
    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    questionElement.textContent = current.question;

    optionsContainer.innerHTML = "";

    current.options.forEach(function(option) {
        const optionElement = document.createElement("div");

        optionElement.classList.add("option");
        optionElement.textContent = option;

        if (selectedAnswers[currentQuestion] === option) {
            optionElement.classList.add("selected");
        }

        optionElement.addEventListener("click", function() {
            selectedAnswers[currentQuestion] = option;

            const allOptions =
                optionsContainer.querySelectorAll(".option");

            allOptions.forEach(function(item) {
                item.classList.remove("selected");
            });

            optionElement.classList.add("selected");

            updateButtons();
        });

        optionsContainer.appendChild(optionElement);
    });

    updateButtons();
}

function updateButtons() {
    const isFirstQuestion = currentQuestion === 0;

    const isLastQuestion =
        currentQuestion === questions.length - 1;

    const hasSelectedAnswer =
        selectedAnswers[currentQuestion] !== null;

    previousBtn.hidden = isFirstQuestion;

    nextBtn.hidden = isLastQuestion || !hasSelectedAnswer;

    submitBtn.hidden = !isLastQuestion || !hasSelectedAnswer;
}

nextBtn.addEventListener("click", function() {
    if (
        selectedAnswers[currentQuestion] !== null &&
        currentQuestion < questions.length - 1
    ) {
        currentQuestion++;
        showQuestion();
    }
});

previousBtn.addEventListener("click", function() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});

submitBtn.addEventListener("click", function() {
    let score = 0;
    questions.forEach(function(question, index) {
        if (selectedAnswers[index] === question.answer) {
            score++;
        }
    });

    alert("Quiz submitted successfully!");

    quizContainer.hidden = true;
    resultContainer.hidden = false;

    finalScore.textContent =
        `Your Score: ${score} / ${questions.length}`;

});

showQuestion();
