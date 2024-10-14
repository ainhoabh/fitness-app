import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning, faSpinner } from "@fortawesome/free-solid-svg-icons";

library.add(faPersonRunning, faSpinner);

import Home from "./components/pages/home.jsx";
import Schedule from "./components/pages/schedule.jsx";
import PrivateRoute from "./components/auth/privateRoute.jsx";
import TrainingData from "./components/pages/training.jsx";
import EditTraining from "./components/pages/editTraining.jsx";

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
        <Route path="/edit" element={<EditTraining />} />
      </Routes>
    </Router>
  );
}

export default App;
