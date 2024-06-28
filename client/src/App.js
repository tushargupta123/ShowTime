import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TheatresForMovie from "./pages/TheatresForMovie";
import BookShow from "./pages/BookShow";
import "./stylesheets/alignments.css";
import "./stylesheets/custom.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/sizes.css";
import "./stylesheets/theme.css";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && (
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      )}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <TheatresForMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-show/:id"
            element={
              <ProtectedRoute>
                <BookShow />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
