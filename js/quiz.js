window.onload = function() {
  const origList = [
    {
      question: "icon_001s",
      correctAnswer: "立花響"
    },
    {
      question: "icon_002s",
      correctAnswer: "風鳴翼"
    },
    {
      question: "icon_003s",
      correctAnswer: "雪音クリス"
    },
    {
      question: "icon_004s",
      correctAnswer: "マリア・カデンツァヴナ・イヴ"
    },
    {
      question: "icon_005s",
      correctAnswer: "暁切歌"
    },
    {
      question: "icon_006s",
      correctAnswer: "月読調"
    },
  ];
  
  const shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };
  
  let myQuestions = shuffle(origList).slice(0,2);

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div>${questionNumber+1} / ${myQuestions.length}</div>
           <div class="question"> <img src="https://raw.githubusercontent.com/vprjct/test/master/iamges/${currentQuestion.question}.png"> </div>
           <div class="answers"> <input type="text" name="answer${questionNumber}"> </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    const output = [];
    
    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=answer${questionNumber}]`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
        
        output.push(
          `<div>
             <div>${questionNumber+1} / ${myQuestions.length}</div>
             <div class="question"> <img src="https://raw.githubusercontent.com/vprjct/test/master/iamges/${currentQuestion.question}.png"> </div>
             <div class="answers" style="color:lightgreen"> userAnswer </div>
           </div>`
        );
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
        
        output.push(
          `<div>
             <div>${questionNumber+1} / ${myQuestions.length}</div>
             <div class="question"> <img src="https://raw.githubusercontent.com/vprjct/test/master/iamges/${currentQuestion.question}.png"> </div>
             <div class="answers" style="color:red"> userAnswer </div>
           </div>`
        );
      }
    });

    quizContainer.style.display = "none";
    nextButton.style.display = "none";
    previousButton.style.display = "none";
    submitButton.style.display = "none";
    
    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    resultsContainer.innerHTML = output.join("");
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      nextButton.style.display     = "inline-block";
      previousButton.style.display = "none";
      submitButton.style.display   = "none";
    } else if (currentSlide === slides.length - 1) {
      nextButton.style.display     = "none";
      previousButton.style.display = "inline-block";
      submitButton.style.display   = "inline-block";
    } else {
      nextButton.style.display     = "inline-block";
      previousButton.style.display = "inline-block";
      submitButton.style.display   = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
};
