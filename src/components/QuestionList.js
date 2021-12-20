import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [quizData, setQuizData] = useState([])


  useEffect(() => {
    async function fetchData() {
      let response = await fetch("http://localhost:3000/questions")
      response = await response.json()
      setQuizData(response);
    }
    fetchData()
  },[])


  async function deleteQuestion(id) {
    await fetch(`http://localhost:3000/questions/${id}`, {
      method: "DELETE",
    })  
       const updateQuestions = quizData.filter((item) => item.id !== id)
       setQuizData(updateQuestions);
 }


 async function changeCorrectAnswer (id, index) {
  const objectToSend = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "correctIndex" : parseInt(`${index}`)
    }),
  }
  let response = await fetch(`http://localhost:3000/questions/${id}`, objectToSend)
   response = await response.json()
   const updatedQuestions = quizData.map((question) => {
    if (question.id === response.id) return response;
    return question;
  });
  setQuizData(updatedQuestions);
}


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{quizData.map((question) => (
         <QuestionItem key={question.id} question={question} handleDelete={deleteQuestion} changeAnswer={changeCorrectAnswer}/>
      ))}</ul>
    </section>
  );
}

export default QuestionList;
