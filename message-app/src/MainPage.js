import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Добро пожаловать!</h1>
      <button onClick={() => navigate("/message-form")}>Далее</button>
    </div>
  );
};

export default MainPage;
