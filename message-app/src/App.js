import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import FormMessagePage from "./FormMessagePage";

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/message-form" element={<FormMessagePage />} />
      </Routes>
    </Router>
  );
}

export default App;
