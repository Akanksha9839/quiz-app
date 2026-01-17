import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <p style={{ textAlign: "center" }}>No result found</p>;
  }

  const { quiz, answers } = state;

  let score = 0;

  quiz.questions.forEach((q, i) => {
    if (q.type === "mcq-single" && answers[i] === q.correctIndex) {
      score++;
    }

    if (
      q.type === "mcq-multi" &&
      JSON.stringify(answers[i]?.sort()) ===
        JSON.stringify(q.correctIndexes.sort())
    ) {
      score++;
    }

    if (q.type === "short" && answers[i] === q.answer) {
      score++;
    }
  });

  return (
    <div className="result-wrapper">
      <div className="result-card">
        <h2>🎉 Congratulations!</h2>
        <p className="score">
          You scored <strong>{score}</strong> out of{" "}
          <strong>{quiz.questions.length}</strong>
        </p>

        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    </div>
  );
}