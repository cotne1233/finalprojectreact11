import React, { useState } from 'react';

function LoginForm({ onLogin, onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length < 4 || password.length < 4) {
      alert('Username and password must contain at least 4 characters.');
      return;
    }
    if (isRegistering) {
      onRegister(username, password);
    } else {
      onLogin(username, password);
    }
  };

  const handleToggleMode = () => {
    setUsername('');
    setPassword('');
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        <button type="button" onClick={handleToggleMode}>
          {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
