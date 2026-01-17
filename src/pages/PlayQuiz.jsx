import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PlayQuiz.css";

export default function PlayQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("quizzes")) || [];
    const found = data.find((q) => String(q.id) === String(id));
    setQuiz(found);
  }, [id]);

  if (!quiz) {
    return <p style={{ textAlign: "center" }}>Quiz not found</p>;
  }

  const question = quiz.questions[current];

  const handleSelect = (value) => {
    setAnswers({ ...answers, [current]: value });
  };

  const nextQuestion = () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate("/result", {
        state: { quiz, answers },
      });
    }
  };

  return (
    <div className="play-wrapper">
      <h2>{quiz.title}</h2>
      <p className="count">
        Question {current + 1} of {quiz.questions.length}
      </p>

      <div className="question-card">
        <h3>{question.question}</h3>

        {/* MCQ Single */}
        {question.type === "mcq-single" &&
          question.options.map((opt, i) => (
            <label key={i} className="option">
              <input
                type="radio"
                checked={answers[current] === i}
                onChange={() => handleSelect(i)}
              />
              {opt}
            </label>
          ))}

        {/* MCQ Multi */}
        {question.type === "mcq-multi" &&
          question.options.map((opt, i) => (
            <label key={i} className="option">
              <input
                type="checkbox"
                checked={answers[current]?.includes(i) || false}
                onChange={() => {
                  const prev = answers[current] || [];
                  handleSelect(
                    prev.includes(i)
                      ? prev.filter((x) => x !== i)
                      : [...prev, i]
                  );
                }}
              />
              {opt}
            </label>
          ))}

        {/* Short Answer */}
        {question.type === "short" && (
          <input
            className="text-input"
            placeholder="Your answer"
            value={answers[current] || ""}
            onChange={(e) => handleSelect(e.target.value)}
          />
        )}

        {/* Description */}
        {question.type === "description" && (
          <textarea
            className="text-input"
            placeholder="Your answer"
            value={answers[current] || ""}
            onChange={(e) => handleSelect(e.target.value)}
          />
        )}
      </div>

      <button className="next-btn" onClick={nextQuestion}>
        {current === quiz.questions.length - 1 ? "Submit Quiz" : "Next"}
      </button>
    </div>
  );
}