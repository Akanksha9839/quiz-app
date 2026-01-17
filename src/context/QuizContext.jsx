import { createContext, useContext, useState, useEffect } from "react";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("quizzes")) || [];
    setQuizzes(stored);
  }, []);

  const saveToStorage = (data) => {
    setQuizzes(data);
    localStorage.setItem("quizzes", JSON.stringify(data));
  };

  return (
    <QuizContext.Provider value={{ quizzes, saveToStorage }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);