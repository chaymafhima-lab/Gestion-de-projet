import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if ( !email || !password ) {
      alert('Veuillez remplir tous les champs et choisir un rôle.');
      return;
    }

    // Pas de backend → on valide localement
    alert(`Bienvenue ${email} !`);

    // Redirection directe vers le dashboard
    navigate('/dashboard');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="page-container">
      <div className="login-container">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label>Email :</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" />
          </div>
          <div className="login-form-group">
            <label>Mot de passe :</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
          </div>
          <button type="submit" className="login-button">Se connecter</button>
          <button type="button" onClick={handleBack} className="login-button">Retour</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
