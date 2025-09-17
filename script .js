const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

const questions = document.querySelectorAll('.question');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const resultsSection = document.getElementById('results');
const resultText = document.getElementById('result-text');
const careerSuggestions = document.getElementById('career-suggestions');
const retakeBtn = document.getElementById('retake-btn');

let currentQuestion = 0;
let userAnswers = {
    analytical: 0,
    creative: 0,
    helping: 0,
    leading: 0
};


document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', () => {
        option.parentElement.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });

        option.classList.add('selected');
    });
});


nextBtn.addEventListener('click', () => {
    const selectedOption = questions[currentQuestion].querySelector('.option.selected');

    if (!selectedOption) {
        alert('Please select an option before continuing.');
        return;
    }

    userAnswers[selectedOption.dataset.value]++;

   
    questions[currentQuestion].style.display = 'none';

    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        questions[currentQuestion].style.display = 'block';
        prevBtn.style.display = 'inline-block';

        if (currentQuestion === questions.length - 1) {
            nextBtn.textContent = 'See Results';
        }
    } else {
       
        showResults();
    }
});


prevBtn.addEventListener('click', () => {
    
    questions[currentQuestion].style.display = 'none';    
    currentQuestion--;
    questions[currentQuestion].style.display = 'block';
    if (currentQuestion === 0) {
        prevBtn.style.display = 'none';
    }

    nextBtn.textContent = 'Next';
});

retakeBtn.addEventListener('click', () => {
    userAnswers = {
        analytical: 0,
        creative: 0,
        helping: 0,
        leading: 0
    };

    currentQuestion = 0;
    resultsSection.style.display = 'none';
    document.querySelector('.quiz').style.display = 'block';

    questions.forEach((question, index) => {
        question.style.display = index === 0 ? 'block' : 'none';
        question.querySelectorAll('.option').forEach(option => {
            option.classList.remove('selected');
        });
    });

    prevBtn.style.display = 'none';
    nextBtn.textContent = 'Next';
});
function showResults() {
    document.querySelector('.quiz').style.display = 'none';
    resultsSection.style.display = 'block';
    let maxScore = 0;
    let dominantTrait = '';

    for (const trait in userAnswers) {
        if (userAnswers[trait] > maxScore) {
            maxScore = userAnswers[trait];
            dominantTrait = trait;
        }
    }
    let careers = [];

    switch(dominantTrait) {
        case 'analytical':
            resultText.textContent = 'Your analytical mind and problem-solving skills make you well-suited for technical and research-oriented careers.';
            careers = ['Data Scientist', 'Software Engineer', 'Financial Analyst', 'Research Scientist', 'Cybersecurity Specialist'];
            break;
        case 'creative':
            resultText.textContent = 'Your creativity and imagination point toward careers where you can express ideas and think outside the box.';
            careers = ['Graphic Designer', 'Content Writer', 'Architect', 'Marketing Manager', 'Video Game Designer'];
            break;
        case 'helping':
            resultText.textContent = 'Your empathy and desire to help others suggest you would thrive in people-focused professions.';
            careers = ['Teacher', 'Nurse', 'Social Worker', 'Counselor', 'Human Resources Specialist'];
            break;
        case 'leading':
            resultText.textContent = 'Your leadership skills and strategic thinking indicate potential for management and entrepreneurial roles.';
            careers = ['Project Manager', 'Business Consultant', 'Entrepreneur', 'Executive Director', 'Sales Manager'];
            break;
    }

    
    careerSuggestions.innerHTML = '<h4>Recommended Career Paths:</h4><ul>';
    careers.forEach(career => {
        careerSuggestions.innerHTML += `<li>${career}</li>`;
    });
    careerSuggestions.innerHTML += '</ul>';
}
