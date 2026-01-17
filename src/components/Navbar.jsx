import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2>Quiz App</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/my-quizzes" style={styles.link}>My Quizzes</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    backgroundColor: "#1976d2",
    color: "#fff",
  },
  link: {
    marginLeft: "20px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Navbar;