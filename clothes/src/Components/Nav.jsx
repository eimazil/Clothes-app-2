import { NavLink } from "react-router-dom";

function Nav({ status }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="navbar-brand">Clothes shop</div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                {status === 2 || status === 3 || status === 4 ? (
                  <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Clothes
                  </NavLink>
                ) : null}
                {status === 2 || status === 3 || status === 4 ? (
                  <NavLink
                    to="/secondLink"
                    end
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    My Purchases
                  </NavLink>
                ) : null}
                {status === 3 ? (
                  <NavLink
                    to="/thirdLink"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Edit Clothes
                  </NavLink>
                ) : null}
                {status === 3 ? (
                  <NavLink
                    to="/fourthLink"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Orders management
                  </NavLink>
                ) : null}
                {status !== 1 ? (
                  <NavLink to="/logout" className="nav-link">
                    Logout
                  </NavLink>
                ) : null}
                {status === 1 ? (
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                ) : null}
                {status === 1 ? (
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                ) : null}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Nav;
