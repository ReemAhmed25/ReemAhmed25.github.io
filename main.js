const quizData = [
    {
      question: 'After Draco insults Hermione, Ron casts a spell that backfires, what did he intend for Draco to eat?',
      options: ['Bees', 'Butterflies', 'Slugs', 'Mud'],
      answer: 'Slugs',
    },
    {
      question: 'At what age do young witches and wizards recieve their Hogwarts letter?',
      options: ['10', '13', '15', '11'],
      answer: '11',
    },
    {
      question: 'What does Dudley say to Harry last when the Dursley family had to leave to protect themselves?',
      options: [
        'I will miss you , brother.',
        'I do not think you are a waste of space.',
        'we are finally rid of you!',
        'do not forget me.'
      ],
      answer: 'I do not think you are a waste of space.',
    },
    {
      question: 'Hermione created and organization for house elves called S.P.E.W., what does S.P.E.W. stand for?',
      options: [
        'Help The House Elves.',
        ' National House Elves Rights Organization. ',
        'Society For The Promotion OF Elfish Welfare. ', 
        'The House Elf Organization.'
        ],
      answer: 'Society For The Promotion OF Elfish Welfare. ',
    },
    {
      question: 'In Harry’s First year on the Hogwarts Express Harry buys a chocolate frog, whose card did he get on the chocolate frog?',
      options: [
        'McGonagall',
        'Hagrid',
        'Snape',
        'Dumbledore',
      ],
      answer: 'Dumbledore',
    },
    {
      question: 'Who gives Harry Potter the Gillyweed so he can breathe underwater before the second task of the championship?',
      options: ['Dobby', 'McGonagall', 'Hagrid', 'Neville'],
      answer: 'Dobby',
    },
    {
      question: 'Who is Winky?',
      options: [
        'Dobby’s sister ',
        'Crouch family’s house elf who ends up working in the Hogwarts kitchen with Dobby ',
        'Dobby’s lover ',
        'Ron’s house elf',
      ],
      answer: 'Crouch family’s house elf who ends up working in the Hogwarts kitchen with Dobby ',
    },
    {
      question: 'What secret did Hermione use to blackmail Rita Seeker?',
      options: [
        'She discovered Rita Seeker was a Deatheater ',
        'She discovered Rita Seeker was an animagus ',
        'She discovered Rita Seeker was illegally using magic ',
        'She discovered Rita Seeker was eavesdropping in Harry Potter'
      ],
      answer: 'She discovered Rita Seeker was an animagus ',
    },
    {
      question: 'Where did Harry and Ginny have their first kiss? ',
      options: [
        ' In The Burrow ',
        ' In the Room of Requirement ',
        ' In Hagrids house ',
        ' On the Quidditch Field after the Quidditch Game',
      ],
      answer: ' On the Quidditch Field after the Quidditch Game',
    },
    {
      question: 'What bug is Ron terrified of?',
      options: ['Slugs', 'Worms', 'Spiders', 'Ants'],
      answer: 'Spiders',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();