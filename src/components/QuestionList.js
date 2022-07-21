import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

//Fetch all the questions 
  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
      .then((resp) => resp.json())
      .then((questions) => {
        setQuestions(questions)
      });
  }, []);

// To handle a deletion click
function handleDeleteClick(id) {
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE",
  })
    .then((resp) => resp.json)
    .then(() => {
      const updatedQuestions = questions.filter((quiz) => 
          quiz.id !== id);
      setQuestions(updatedQuestions)
    });
};

//Handle an answer
  function handleAnswerChange(correctIndex, id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((resp) => resp.json())
      .then((updatedQuestionList) => {
        const updatedQuestions = questions.map((quiz) => {
          if (quiz.id === updatedQuestionList.id){
            return updatedQuestionList
          }
          else {
            return quiz;
          }
        });
        setQuestions(updatedQuestions)
      });
  }

  const questionItems = questions.map((quiz) => (
    <QuestionItem 
      key={quiz.id} onAnswerChange={handleAnswerChange}
      onDeleteClick={handleDeleteClick} question={quiz} />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
        {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;
