import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/pages/home.jsx";
import Schedule from "./components/pages/schedule.jsx";
import PrivateRoute from "./components/auth/privateRoute.jsx";
import TrainingData from "./components/pages/training.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/schedule"
          element={
            <PrivateRoute>
              <Schedule />
            </PrivateRoute>
          }
        />
        <Route path="/training" element={<TrainingData />} />
      </Routes>
    </Router>
  );
}

export default App;
