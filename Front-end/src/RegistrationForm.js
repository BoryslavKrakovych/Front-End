import React, { useState } from "react";
import "./RegistrationForm.css";

const RegistrationForm = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    onRegister(username, password);
  };

  return (
    <div className="registration-form">
      <input
        type="text"
        placeholder="Ім'я користувача"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Зареєструватися</button>
    </div>
  );
};

export default RegistrationForm;