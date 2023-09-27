document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://opentdb.com/api.php?amount=10'; // Update with your API settings
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('next-button');
    let currentQuestionIndex = 0;
    let questions = [];

    // Function to fetch quiz questions from the API
    function fetchQuizQuestions() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                questions = data.results;
                displayQuestion(currentQuestionIndex);
            })
            .catch(error => console.error(error));
    }

    // Function to display a question and its options
    function displayQuestion(index) {
        const question = questions[index];
        questionElement.textContent = question.question;

        // Clear previous options
        optionsElement.innerHTML = '';

        // Add new options
        question.incorrect_answers.forEach((option, i) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => checkAnswer(option === question.correct_answer));
            optionsElement.appendChild(button);
        });

        // Add the correct answer as an option
        const correctButton = document.createElement('button');
        correctButton.textContent = question.correct_answer;
        correctButton.addEventListener('click', () => checkAnswer(true));
        optionsElement.appendChild(correctButton);
    }

    // Function to check if the selected answer is correct
    function checkAnswer(isCorrect) {
        if (isCorrect) {
            // Handle correct answer logic (e.g., increase score)
        } else {
            // Handle incorrect answer logic (e.g., show correct answer)
        }

        // Move to the next question
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex);
        } else {
            // Quiz completed, display a summary or end screen
            questionElement.textContent = 'Quiz Completed!';
            optionsElement.innerHTML = '';
            nextButton.style.display = 'none';
        }
    }

    // Event listener for the "Next" button
    nextButton.addEventListener('click', () => {
        // Move to the next question
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex);
        } else {
            // Quiz completed, display a summary or end screen
            questionElement.textContent = 'Quiz Completed!';
            optionsElement.innerHTML = '';
            nextButton.style.display = 'none';
        }
    });

    // Start the quiz by fetching questions when the page loads
    fetchQuizQuestions();
});
