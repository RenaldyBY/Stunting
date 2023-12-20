// src/components/QuestionnaireForm.js
import React, { useState } from "react";
import axios from "axios";
import allQuestions from "../question/QuestionBaby";

const QuestionnaireForm = () => {
  const [questions, setQuestions] = useState(
    shuffle(allQuestions).slice(0, 10)
  );
  const [answers, setAnswers] = useState(Array(10).fill(null));
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer === "yes" ? 10 : 0;
    setAnswers(newAnswers);
  };

  const calculateTotalScore = () => {
    // Menghitung total skor dari jawaban
    return answers.reduce((total, answer) => total + answer, 0);
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getDate()}`;
    return formattedDate;
  };

  const handleSubmit = () => {
    const totalScore = calculateTotalScore();

    // Menambahkan data baru ke server JSON
    axios
      .post("http://localhost:3001/scores", {
        id: Date.now(),
        date: getCurrentDate(),
        total: totalScore,
      })
      .then((response) => {
        console.log("Scores successfully saved:", response.data);
        setFormSubmitted(true);
      })
      .catch((error) => {
        console.error("Error saving scores:", error);
      });

    // Mengosongkan nilai jawaban setelah submit
    setAnswers(Array(10).fill(null));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold">Questionnaire</h1>
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <p>{question}</p>
          <button
            className={`bg-green-500 text-white px-4 py-2 mr-2 ${
              answers[index] === 10 ? "selected" : ""
            }`}
            onClick={() => handleAnswer(index, "yes")}
          >
            {answers[index] === 10 ? "✔ Ya" : "Ya"}
          </button>
          <button
            className={`bg-red-500 text-white px-4 py-2 ${
              answers[index] === 0 ? "selected" : ""
            }`}
            onClick={() => handleAnswer(index, "no")}
          >
            {answers[index] === 0 ? "✘ Tidak" : "Tidak"}
          </button>
        </div>
      ))}
      <div className="flex-col space-x-2">
        <input type="text" className="p-2 border-2 " />
        <button
          className="px-4 py-2 text-white bg-blue-500"
          onClick={handleSubmit}
          disabled={formSubmitted}
        >
          {formSubmitted ? "Formulir Sudah Dikirim" : "Submit"}
        </button>
      </div>
    </div>
  );
};

// Fungsi untuk mengacak pertanyaan
const shuffle = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default QuestionnaireForm;
