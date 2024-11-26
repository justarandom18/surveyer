let currentUser = 'user1';  // Example: current user is 'user1' (you could dynamically set this based on the logged-in user)

let questions = JSON.parse(localStorage.getItem('questions')) || [
    { id: 1, text: "What is your favorite color?", options: ["Red", "Blue", "Green"], answers: [], creator: 'user1' },
    { id: 2, text: "What is your preferred coding language?", options: ["JavaScript", "Python", "C++"], answers: [], creator: 'user2' }
];

// Save questions back to localStorage whenever updated
function saveQuestions() {
    localStorage.setItem('questions', JSON.stringify(questions));
}

// Load the next question or display a message if there are no more questions
function loadNextQuestion() {
    const questionContainer = document.getElementById('question-container');
    if (currentQuestionIndex >= questions.length) {
        questionContainer.innerHTML = `<p>No more questions!</p>`;
        return;
    }

    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h2>${question.text}</h2>
        <div class="options">
            ${question.options.map((option, idx) => `
                <button onclick="answerQuestion(${currentQuestionIndex}, ${idx})">${option}</button>
            `).join('')}
            <button class="btn-secondary" onclick="skipQuestion()">Skip</button>
        </div>
    `;
}

// Handle the answer selection
function answerQuestion(questionIndex, optionIndex) {
    questions[questionIndex].answers.push(optionIndex); // Store the selected option
    saveQuestions(); // Save updated questions
    currentQuestionIndex++; // Move to the next question
    loadNextQuestion(); // Load the next question
}

// Skip to the next question
function skipQuestion() {
    currentQuestionIndex++; // Skip the current question
    loadNextQuestion(); // Load the next question
}

// Add a new question
function postQuestion() {
    const questionText = document.getElementById('questionText').value.trim();
    const option1 = document.getElementById('option1').value.trim();
    const option2 = document.getElementById('option2').value.trim();

    if (!questionText || !option1 || !option2) {
        alert("Please fill all fields to post a question.");
        return;
    }

    questions.push({
        id: questions.length + 1,
        text: questionText,
        options: [option1, option2],
        answers: [],
        creator: currentUser  // Store the creator's ID here
    });
    saveQuestions();
    alert("Question posted successfully!");

    // Clear input fields
    document.getElementById('questionText').value = '';
    document.getElementById('option1').value = '';
    document.getElementById('option2').value = '';
}

// Load user profile with their created questions (no answers or percentage)
function loadUserProfile() {
    const userQuestionsDiv = document.getElementById('user-questions');

    // Filter questions that were created by the current user
    const userCreatedQuestions = questions.filter(q => q.creator === currentUser);

    if (userCreatedQuestions.length > 0) {
        userQuestionsDiv.innerHTML = userCreatedQuestions.map(q => `
            <div class="question-block">
                <p><strong>${q.text}</strong></p>
            </div>
        `).join('');
    } else {
        userQuestionsDiv.innerHTML = `<p>You have not created any questions yet.</p>`;
    }
}

// Load initial data when the page loads
window.onload = () => {
    if (document.getElementById('question-container')) loadNextQuestion();
    if (document.getElementById('user-activity')) loadUserProfile();
};

// Initialize particles effect
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 100,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ffffff" // Particles will be white
        },
        "shape": {
            "type": "circle"
        },
        "size": {
            "value": 4,
            "random": true
        },
        "move": {
            "enable": true,
            "speed": 2
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            }
        }
    }
});
