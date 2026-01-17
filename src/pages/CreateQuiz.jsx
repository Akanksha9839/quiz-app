import { useEffect, useState } from "react";
import "./CreateQuiz.css";

export default function CreateQuiz() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const [showTypeModal, setShowTypeModal] = useState(true);
  const [questionType, setQuestionType] = useState(null);

  const [questionText, setQuestionText] = useState("");

  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctSingle, setCorrectSingle] = useState(null);
  const [correctMulti, setCorrectMulti] = useState([]);

  const [shortAnswer, setShortAnswer] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setShowTypeModal(true);
  }, []);

  const resetForm = () => {
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectSingle(null);
    setCorrectMulti([]);
    setShortAnswer("");
    setDescription("");
    setQuestionType(null);
    setShowTypeModal(true); // ✅ auto-open again
  };

  const selectType = (type) => {
    setQuestionType(type);
    setShowTypeModal(false);
  };

  const validateAndBuildQuestion = () => {
    if (!questionText.trim()) {
      alert("Question is required");
      return null;
    }

    if (questionType === "mcq-single") {
      if (options.some((o) => !o.trim())) {
        alert("All 4 options are required");
        return null;
      }
      if (correctSingle === null) {
        alert("Select the correct option");
        return null;
      }
      return {
        id: Date.now(),
        type: "mcq-single",
        question: questionText.trim(),
        options,
        correctIndex: correctSingle,
      };
    }

    if (questionType === "mcq-multi") {
      if (options.some((o) => !o.trim())) {
        alert("All 4 options are required");
        return null;
      }
      if (correctMulti.length === 0) {
        alert("Select at least one correct option");
        return null;
      }
      return {
        id: Date.now(),
        type: "mcq-multi",
        question: questionText.trim(),
        options,
        correctIndexes: correctMulti,
      };
    }

    if (questionType === "short") {
      if (!shortAnswer.trim()) {
        alert("Short answer required");
        return null;
      }
      return {
        id: Date.now(),
        type: "short",
        question: questionText.trim(),
        answer: shortAnswer.trim(),
      };
    }

    if (questionType === "description") {
      if (!description.trim()) {
        alert("Description required");
        return null;
      }
      return {
        id: Date.now(),
        type: "description",
        question: questionText.trim(),
        description: description.trim(),
      };
    }

    return null;
  };

  const addQuestion = () => {
    const q = validateAndBuildQuestion();
    if (!q) return;

    setQuestions((prev) => [...prev, q]);
    resetForm(); // ✅ modal auto-opens again
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const saveQuiz = () => {
    if (!quizTitle.trim()) {
      alert("Quiz title is required");
      return;
    }

    if (questions.length === 0) {
      alert("Add at least one question");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("quizzes")) || [];

    const duplicate = stored.find(
      (q) => q.title.toLowerCase() === quizTitle.trim().toLowerCase()
    );
    if (duplicate) {
      alert("Quiz with same title already exists");
      return;
    }

    stored.push({
      id: Date.now(),
      title: quizTitle.trim(),
      questions,
      active: true,
      createdAt: new Date().toLocaleString(),
    });

    localStorage.setItem("quizzes", JSON.stringify(stored));

    alert("Quiz saved successfully ✅");

    // ✅ reset everything after save
    setQuizTitle("");
    setQuestions([]);
    setShowTypeModal(true);
  };

  return (
    <div className="create-container">
      <h2>Create New Quiz</h2>

      <input
        className="quiz-title"
        placeholder="Quiz Title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />

      {questionType && (
        <div className="question-card">
          <input
            placeholder="Question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />

          {(questionType === "mcq-single" || questionType === "mcq-multi") &&
            options.map((opt, i) => (
              <div key={i} className="option-row">
                <input
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const copy = [...options];
                    copy[i] = e.target.value;
                    setOptions(copy);
                  }}
                />
                {questionType === "mcq-single" ? (
                  <input
                    type="radio"
                    name="correct-single"
                    checked={correctSingle === i}
                    onChange={() => setCorrectSingle(i)}
                  />
                ) : (
                  <input
                    type="checkbox"
                    checked={correctMulti.includes(i)}
                    onChange={() =>
                      setCorrectMulti((prev) =>
                        prev.includes(i)
                          ? prev.filter((x) => x !== i)
                          : [...prev, i]
                      )
                    }
                  />
                )}
              </div>
            ))}

          {questionType === "short" && (
            <input
              placeholder="Short Answer (max 2 words)"
              value={shortAnswer}
              onChange={(e) => setShortAnswer(e.target.value)}
            />
          )}

          {questionType === "description" && (
            <textarea
              placeholder="Description (2–4 sentences)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          )}

          <button className="add-btn" onClick={addQuestion}>
            Add Question
          </button>
        </div>
      )}

      <p>Questions Added: {questions.length}</p>

      {questions.map((q, i) => (
        <div key={q.id} className="saved-question">
          <span>
            {i + 1}. {q.question} ({q.type})
          </span>
          <button onClick={() => deleteQuestion(q.id)}>Delete</button>
        </div>
      ))}

      <button className="save-btn" onClick={saveQuiz}>
        Save Quiz
      </button>

      {showTypeModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Select Question Type</h3>
            <button onClick={() => selectType("mcq-single")}>
              MCQ (single correct)
            </button>
            <button onClick={() => selectType("mcq-multi")}>
              MCQ (multi correct)
            </button>
            <button onClick={() => selectType("short")}>
              Short Answer
            </button>
            <button onClick={() => selectType("description")}>
              Description
            </button>
          </div>
        </div>
      )}
    </div>
  );
}