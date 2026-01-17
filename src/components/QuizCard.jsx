import { useNavigate } from "react-router-dom";

function QuizCard({ quiz }) {
  const navigate = useNavigate();

  return (
    <div className="quiz-card">
      <h3>{quiz.title}</h3>
      <p>Total Questions: {quiz.questions.length}</p>

      <button onClick={() => navigate(`/play-quiz/${quiz.id}`)}>
        Play Quiz
      </button>
    </div>
  );
}

export default QuizCard;