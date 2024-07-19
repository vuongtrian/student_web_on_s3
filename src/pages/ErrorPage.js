import { Link } from "react-router-dom";
import "../main.css";

function ErrorPage() {
  return (
    <div className="app-container">
      <h1>An error occurred!</h1>
      <p>Could not find this page</p>
      <Link to="/students">
        <button>Go to Home Page</button>
      </Link>
    </div>
  );
}

export default ErrorPage;
