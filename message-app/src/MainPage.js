import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import smileImage from "./assets/img/smile.png";

const MainPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="main-page">
      <h1 className="main-page__title">Добро пожаловать!</h1>
      <button
        className="main-page__button"
        onClick={() => navigate("/message-form")}
      >
        Далее
      </button>
      <img
        src={smileImage}
        alt="Smile"
        className={`main-page__img ${isVisible ? "visible" : ""}`}
        height={734}
        width={1088}
      />
    </div>
  );
};

export default MainPage;
