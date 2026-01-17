import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyQuizzes.css";

export default function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // LOAD QUIZZES
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("quizzes")) || [];
    setQuizzes(data);
  }, []);

  // TOGGLE ACTIVE / INACTIVE
  const toggleStatus = (id) => {
    const updated = quizzes.map((q) =>
      q.id === id ? { ...q, active: !q.active } : q
    );
    setQuizzes(updated);
    localStorage.setItem("quizzes", JSON.stringify(updated));
  };

  // OPEN EDIT MODAL
  const openEdit = (quiz) => {
    setEditId(quiz.id);
    setEditTitle(quiz.title);
  };

  // SAVE EDIT
  const saveEdit = () => {
    if (!editTitle.trim()) return;

    const updated = quizzes.map((q) =>
      q.id === editId ? { ...q, title: editTitle.trim() } : q
    );
    setQuizzes(updated);
    localStorage.setItem("quizzes", JSON.stringify(updated));
    setEditId(null);
  };

  // CONFIRM DELETE
  const confirmDelete = () => {
    const updated = quizzes.filter((q) => q.id !== deleteId);
    setQuizzes(updated);
    localStorage.setItem("quizzes", JSON.stringify(updated));
    setDeleteId(null);
  };

  return (
    <div className="mq-wrapper">
      <h2>My Quizzes</h2>

      {quizzes.length === 0 ? (
        <p>No quizzes found</p>
      ) : (
        <table className="mq-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Created On</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {quizzes.map((quiz, i) => (
              <tr key={quiz.id}>
                <td>{i + 1}</td>

                <td
                  className="mq-title"
                  onClick={() => openEdit(quiz)}
                >
                  {quiz.title}
                </td>

                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={quiz.active}
                      onChange={() => toggleStatus(quiz.id)}
                    />
                    <span className="slider"></span>
                  </label>
                </td>

                <td>{quiz.createdAt}</td>

                <td className="mq-actions">
                  {quiz.active && (
                    <button
                      className="play-btn"
                      onClick={() => navigate(`/play/${quiz.id}`)}
                    >
                      ▶ Play
                    </button>
                  )}
                  <button onClick={() => openEdit(quiz)}>Edit</button>
                  <button onClick={() => setDeleteId(quiz.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* EDIT MODAL */}
      {editId && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Edit Quiz Title</h3>
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={saveEdit}>Yes</button>
              <button onClick={() => setEditId(null)}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Are you sure you want to delete?</h3>
            <div className="modal-actions">
              <button className="danger" onClick={confirmDelete}>
                Yes
              </button>
              <button onClick={() => setDeleteId(null)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}