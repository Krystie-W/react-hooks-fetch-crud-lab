import React from "react";

function QuestionItem({ question, handleDelete, changeAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  function passUpDeleteInfo () {
    handleDelete(id)
  }
  
function handleChange (event) {
  changeAnswer(id, event.target.value)
}

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={passUpDeleteInfo} id={id}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
