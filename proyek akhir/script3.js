let currentQuestion = 1; // Tracks the current question
let totalQuestions = 10; // Total number of questions
let markedQuestions = []; // To store marked questions
let timeLeft = 30 * 60; // 30 minutes in seconds
let selectedAnswers = {}; // To store selected answers

// List of 10 questions and options
const questions = [
  { text: "1.Kertas karton yang dibakar akan berubah menjadi ...", options: ["A. Arang", "B. Kayu", "C. Abu", "D. Tanah"], correctAnswer: "A" },
  { text: "2.Air yang mengalir dari pipa disebut ...", options: ["A. Air Hujan", "B. Air Sumur", "C. Air Sungai", "D. Air Pipa"], correctAnswer: "D" },
  { text: "3.Proses pembuatan baja dilakukan di ...", options: ["A. Pabrik Baja", "B. Pabrik Kertas", "C. Pabrik Plastik", "D. Pabrik Kayu"], correctAnswer: "A" },
  { text: "4.Apakah ibu kota Indonesia?", options: ["A. Jakarta", "B. Surabaya", "C. Bandung", "D. Medan"], correctAnswer: "A" },
  { text: "5.Bumi berbentuk ...", options: ["A. Bulat", "B. Datar", "C. Segitiga", "D. Kubus"], correctAnswer: "A" },
  { text: "6.Gunung tertinggi di Indonesia adalah ...", options: ["A. Gunung Everest", "B. Gunung Merapi", "C. Gunung Rinjani", "D. Gunung Puncak Jaya"], correctAnswer: "D" },
  { text: "7.Benda yang bisa mengambang di air adalah ...", options: ["A. Kayu", "B. Batu", "C. Logam", "D. Kaca"], correctAnswer: "A" },
  { text: "8.Hewan yang terbang adalah ...", options: ["A. Burung", "B. Kucing", "C. Anjing", "D. Sapi"], correctAnswer: "A" },
  { text: "9.Proses fotosintesis terjadi pada ...", options: ["A. Tanaman", "B. Hewan", "C. Manusia", "D. Bakteri"], correctAnswer: "A" },
  { text: "10.Ruang lingkup kimia disebut juga ...", options: ["A. Ilmu Kimia", "B. Ilmu Fisika", "C. Ilmu Biologi", "D. Ilmu Geografi"], correctAnswer: "A" }
];

// Function to render the question based on the current index
function renderQuestion() {
  const question = questions[currentQuestion - 1]; // Get current question
  const questionText = document.getElementById("question-text");
  questionText.textContent = question.text; // Set the question text

  // Set the radio buttons options
  const options = document.querySelectorAll('.option input');
  options.forEach((input, index) => {
    const optionLabel = input.nextElementSibling;
    input.id = `option${index + 1}`;
    input.value = question.options[index]; // Assign value for each option
    optionLabel.textContent = question.options[index]; // Update option label

    // Mark the radio button checked if selected
    if (selectedAnswers[currentQuestion] === question.options[index]) {
      input.checked = true;
    } else {
      input.checked = false;
    }
  });

  // Highlight the current question in the navigation grid
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item, index) => {
    if (index === currentQuestion - 1) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Countdown timer function
function startTimer() {
  const timerElement = document.getElementById('timer');
  
  if (!timerElement) {
    console.error("Timer element not found!");
    return;
  }

  // Update the timer every second
  const timerInterval = setInterval(() => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    // Update the displayed time
    timerElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeLeft > 0) {
      timeLeft--; // Decrement the time left by 1 second
    } else {
      clearInterval(timerInterval); // Stop the timer when time runs out
      alert("Waktu habis!");
      // Optionally, you can disable further actions like navigation, etc.
    }
  }, 1000); // Update every 1000ms (1 second)
}

// Event listeners for navigation
document.getElementById("next").addEventListener("click", function() {
  if (currentQuestion < totalQuestions) {
    currentQuestion++;
    renderQuestion();
  }
});

document.getElementById("prev").addEventListener("click", function() {
  if (currentQuestion > 1) {
    currentQuestion--;
    renderQuestion();
  }
});

// Mark question as "Ragu-Ragu"
document.getElementById("mark").addEventListener("click", function() {
  if (!markedQuestions.includes(currentQuestion)) {
    markedQuestions.push(currentQuestion);
    alert("Soal ini telah ditandai sebagai 'Ragu-Ragu'.");
  } else {
    alert("Soal ini sudah ditandai.");
  }
});

// Handle click on question navigation
document.querySelectorAll('.grid-item').forEach(item => {
  item.addEventListener('click', function() {
    const questionNumber = parseInt(item.getAttribute('data-question'));
    currentQuestion = questionNumber;
    renderQuestion();
  });
});

// Handle selecting an answer
document.querySelectorAll('.option input').forEach((input, index) => {
  input.addEventListener('change', function() {
    const selectedOption = this.value; // Get the option value (A, B, C, D)
    selectedAnswers[currentQuestion] = selectedOption; // Save selected answer
    console.log(`Question ${currentQuestion} selected answer: ${selectedOption}`);
  });
});

// Start the timer and render the first question when the page loads
window.onload = function() {
  renderQuestion();
  startTimer(); // Start the timer as soon as the page is loaded
};
