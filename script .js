document.addEventListener("DOMContentLoaded", () => {

  const questions = document.querySelectorAll('.question');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const resultsSection = document.getElementById('results');
  const resultText = document.getElementById('result-text');
  const careerSuggestions = document.getElementById('career-suggestions');

  let currentQuestion = 0;
  let userAnswers = {
    analytical: 0,
    creative: 0,
    helping: 0,
    leading: 0
  };

  // ✅ OPTION CLICK WORKS
  document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {
      option.closest('.options')
        .querySelectorAll('.option')
        .forEach(o => o.classList.remove('selected'));

      option.classList.add('selected');
    });
  });

  nextBtn.addEventListener('click', () => {
    const selected = questions[currentQuestion].querySelector('.option.selected');
    if (!selected) {
      alert("Please select an option");
      return;
    }

    userAnswers[selected.dataset.value]++;
    questions[currentQuestion].style.display = "none";
    currentQuestion++;

    if (currentQuestion < questions.length) {
      questions[currentQuestion].style.display = "block";
      prevBtn.style.display = "inline-block";
    } else {
      showResults();
    }
  });

  prevBtn.addEventListener('click', () => {
    questions[currentQuestion].style.display = "none";
    currentQuestion--;
    questions[currentQuestion].style.display = "block";
    if (currentQuestion === 0) prevBtn.style.display = "none";
  });

  function showResults() {
    document.querySelector('.quiz').style.display = "none";
    resultsSection.style.display = "block";

    const top = Object.keys(userAnswers)
      .reduce((a, b) => userAnswers[a] > userAnswers[b] ? a : b);

    const map = {
      analytical: ['Software Engineer', 'Data Scientist'],
      creative: ['Graphic Designer', 'UI/UX Designer'],
      helping: ['Teacher', 'Counselor'],
      leading: ['Project Manager', 'Entrepreneur']
    };

    resultText.textContent = `Best fit: ${top.toUpperCase()}`;
    careerSuggestions.innerHTML =
      `<ul>${map[top].map(c => `<li>${c}</li>`).join('')}</ul>`;
  }

});