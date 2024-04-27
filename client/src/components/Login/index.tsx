import React, { FormEvent, useState } from 'react'
import './style.css'
import { useMutation } from '@tanstack/react-query';
import { postLogin } from '../../helper/fn';
//import { logger } from '@/app/lib/logger';
    
const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const validateUsername = () => {
    if (username.trim() === '') {
      setError('');
      return false;
    }
    setError(null);
    return true;
  };

  const validatePassword = () => {
    if (password.trim() === '') {
      setError('');
      return false;
    }
    setError(null);
    return true;
  };

  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: () => {
      alert('Note created successfully!');
      setUsername('');
      setPassword('');
    },
    onError: (error: Error) => {
      console.error('Error creating note:', error.message);
    }
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateUsername() && !validatePassword()) return;
    mutation.mutate({
      username: username,
      password: password,
    });
  };


  return (
    <div className="box">
      <form onSubmit={handleSubmit}>
        {error && <p className='err'>{error}</p>}
        <h2>Login</h2>

        <div className="inputBox">
          <input type="text" required onChange={(e) => setUsername(e.target.value)} />
          <span>Username</span>
          <i></i>
        </div>

        <div className="inputBox">
          <input type="password" required onChange={(e) => setPassword(e.target.value)} />
          <span>Password</span>
          <i></i>
        </div>

        <div className="links">
          <a href="/">Back</a>
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login