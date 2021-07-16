import { Link } from "react-router-dom";
import "./navbar.css";

const NavBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.assign("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navv navbar-dark">
      <div className="container-fluid">
        <Link to="/app" className="navbar-brand bg-info me">
          Alkemy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto menu">
            <li className="nav-item ">
              <Link to="/home" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item ml-5">
              <Link to="/search" className="nav-link ">
                Buscador
              </Link>
            </li>
            <li className="nav-item " onClick={() => handleLogout()}>
              <div className="nav-link">Logout</div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
