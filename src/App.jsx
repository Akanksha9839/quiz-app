import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateQuiz from "./pages/CreateQuiz";
import MyQuizzes from "./pages/MyQuizzes";
import PlayQuiz from "./pages/PlayQuiz";
import Result from "./pages/Result";

export default function App() {
  return (
    <HashRouter>
      {/* Navbar har page pe dikhega */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/my-quizzes" element={<MyQuizzes />} />
        <Route path="/play/:id" element={<PlayQuiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </HashRouter>
  );
}