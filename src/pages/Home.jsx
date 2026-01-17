import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-cards">
        <div className="home-card" onClick={() => navigate("/create")}>
          <h2>Create New Quiz</h2>
          <p>Create a quiz with questions</p>
        </div>

        <div className="home-card" onClick={() => navigate("/my-quizzes")}>
          <h2>My Quizzes</h2>
          <p>View & play your quizzes</p>
        </div>
      </div>
    </div>
  );
}

export default Home;