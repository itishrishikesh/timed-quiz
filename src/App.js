
import React, { useState, useEffect, useRef } from 'react'
import Question from './Components/question.js'
import "./App.css"


function App() {

  const [visibility, setVisibility] = useState(false)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [loading, setLoading] = useState(true)
  const [question, setCurrentQuestion] = useState({
    question_title: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: ""
  })
  const [seconds, setSeconds] = useState(20)
  const interval = useRef(null)
  const getQuestionURL = "https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple&encode=base64";

  function setNewQuestion(data) {

        var shuffle = (array) => array.sort(() => Math.random() - 0.5);

        var question_options = shuffle([data.results[0].incorrect_answers[0],
            data.results[0].incorrect_answers[1],
            data.results[0].incorrect_answers[2],
            data.results[0].correct_answer
        ])
      setLoading(false)
      startCounter()
      setCurrentQuestion({
        question_title: Buffer.from(data.results[0].question, 'base64').toString(),
        optionA: Buffer.from(question_options[0], 'base64').toString(),
        optionB: Buffer.from(question_options[1], 'base64').toString(),
        optionC: Buffer.from(question_options[2], 'base64').toString(),
        optionD: Buffer.from(question_options[3], 'base64').toString(),
        correctOption: Buffer.from(data.results[0].correct_answer, 'base64').toString()
      })

      setQuestionNumber(questionNumber + 1)
  }

  function getNewQuestion(){
    setLoading(true)
    stopCounter()
    fetch(getQuestionURL)
      .then(response => response.json())
      .then(data => setNewQuestion(data))
  }

  function timer(){
    if(questionNumber <= 10){
      if(questionNumber >= 0){
        if(seconds < 0){

          for(var i=0;i<document.getElementsByName("answer").length;i++)
            document.getElementsByName("answer")[i].checked = false;

          if(selectedAnswer === question.correctOption)
            setScore(score + 1)
          
          if(questionNumber != 10)
            getNewQuestion()
          else{
            alert("You scored " + score + " points!")
            setScore(0)
            setQuestionNumber(11)
          }
          setSeconds(20)
        }
      }
    }
    else if(questionNumber == 11){
      setVisibility(!visibility)
      setQuestionNumber(0)
      stopCounter()
    }
  }

  function getSelectedAnswer(answer){
    console.log(answer)
    setSelectedAnswer(answer)
  }

  function handleSubmit(){
    if(questionNumber < 10){
      if(selectedAnswer === question.correctOption)
        setScore(score + 1)

      var ele = document.getElementsByName("answer");
      for(var i=0;i<ele.length;i++)
        ele[i].checked = false;

      getNewQuestion()
      setSeconds(20)
    }
    else{
      alert("You scored " + score + " points!")
      setScore(0)
      setQuestionNumber(11)
    }
  }

  function handleOnStart(){
    getNewQuestion()
    setVisibility(!visibility)
  }
  
  useEffect(timer, [seconds])

  const startCounter = () => interval.current = setInterval(() => {
    setSeconds(prevState => prevState - 1)
  }, 1000)

  const stopCounter = () => clearInterval(interval.current)

  return (
    <div>
      <div className = { !visibility ? "visible container" : "invisible" }>
        <button className="center" onClick={handleOnStart}>Start Quiz!</button>
      </div>

      <div className = { (visibility ? "visible " : "invisible") + " question_container" } >
        <div> <strong>Question Number: </strong>{questionNumber} </div>
        <hr />
        <div>Your score is {score}</div>
        <hr />
        
        <Question 
          QuestionTitle = {question.question_title} 
          OptionA = {question.optionA} 
          OptionB = {question.optionB} 
          OptionC = {question.optionC} 
          OptionD = {question.optionD}
          sendSelectedAnswer = {getSelectedAnswer}
          Loading = {loading}
        />
        <div className = {loading ? "loading" : ""}></div>
        <div className={loading ? "invisible" : "visible"}>
          <button className="submit_button" onClick = {handleSubmit}>Submit</button>          
        </div>
        <hr />
        <div>Time left for answering this question: <span className = "timer">{seconds}</span></div>
      </div>
    </div>
  );
}

export default App;
