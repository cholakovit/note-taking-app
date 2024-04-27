import React, { FormEvent, useState } from 'react'
import { FormHolder } from '../../app.style'
import { Button, FormControl } from '@mui/material'
import { CustomFilledInput } from '../CreateNote/index.style'
import { Link } from 'react-router-dom'
import { BACK, CREATE_NEW_USER, SAVE } from '../../helper/constants'
import { useMutation } from '@tanstack/react-query'
import { createUser } from '../../helper/fn'

const CreateUser = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const validateUsername = () => {
    if (username.trim() === '') {
      setError(true);
      return false;
    }
    setError(false);
    return true;
  };

  const validatePassword = () => {
    if (password.trim() === '') {
      setError(true);
      return false;
    }
    setError(false);
    return true;
  };

  const mutation = useMutation({
    mutationFn: createUser,
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
    <div>
      <FormHolder noValidate autoComplete="off" onSubmit={handleSubmit}>
        <h3>{CREATE_NEW_USER}</h3>
        <FormControl variant="filled">
          <CustomFilledInput id="filled-basic" label="Username" variant="filled" value={username} onChange={e => setUsername(e.target.value)} 
          error={error} helperText={error ? "Note title is required." : ""} />
        </FormControl>
        <br />
        <FormControl variant="filled">
          <CustomFilledInput id="filled-basic" label="Password" variant="filled" value={password} onChange={e => setPassword(e.target.value)}
            error={error} helperText={error ? "Note Tags are required." : ""}
          />
        </FormControl>
        <br />
        <div>
          <Button type="submit" variant="contained">{SAVE} </Button>
          <Link to={`/`}> {BACK}</Link>
        </div>
      </FormHolder>
    </div>
  )
}

export default CreateUser