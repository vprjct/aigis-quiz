$(window).on('load', function() {
  origList = [];
  $.ajax({
    type: "GET",
    url: "./json/data.json",
    async: false,
    success: function(data) {
      origList = data;
    }
  });
  console.log(origList);
  
  const shuffle = ([...arr]) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };
  
  let myQuestions = shuffle(origList).slice(0,10);

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div>Q. ${questionNumber+1} / ${myQuestions.length}</div>
           <div class="question"> <img src="./iamges/${currentQuestion.icon}.png"> </div>
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
      if (userAnswer === currentQuestion.name) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
        
        output.push(
          `<div>
             <div style="color:lightgreen">Q. ${questionNumber+1}</div>
             <div class="question"> <img src="./iamges/${currentQuestion.icon}.png"> </div>
             <div class="answers" style="color:lightgreen"> 解答: ${userAnswer} / 正解: ${currentQuestion.name} </div>
           </div>`
        );
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
        
        output.push(
          `<div>
             <div style="color:red">Q. ${questionNumber+1}</div>
             <div class="question"> <img src="./iamges/${currentQuestion.icon}.png"> </div>
             <div class="answers" style="color:red"> 解答: ${userAnswer} / 正解: ${currentQuestion.name} </div>
           </div>`
        );
      }
    });

    const quiz = document.getElementById("quiz-container");
    quiz.style.display = "none";
    
    nextButton.style.display = "none";
    previousButton.style.display = "none";
    submitButton.style.display = "none";
    retryButton.style.display = "inline-block";
    
    // show number of correct answers out of total
    output.push(`<div>正解数 : ${numCorrect} / ${myQuestions.length}</div>`);
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
  const retryButton = document.getElementById("retry");
  retryButton.style.display = "none";
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  retryButton.addEventListener("click", function(){location.reload();});
});
