import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { CREATE_NEW_NODE, SAVE } from '../../helper/constants';
import { useNoteForm } from '../../helper/hooks';
import { Link } from 'react-router-dom';
import { FormHolder } from '../../app.style';

const CreateNote = () => {
  const { noteTitle, setNoteTitle, noteDescription, setNoteDescription, noteTags, setNoteTags, handleSubmit } = useNoteForm();

  return (
    <div>
      <FormHolder noValidate autoComplete="off" onSubmit={handleSubmit}>
        <h3>{CREATE_NEW_NODE}</h3>
        <FormControl variant="filled">
          <TextField id="component-filled" value={noteTitle} onChange={e => setNoteTitle(e.target.value)} variant="filled" fullWidth placeholder='Note Title:' />
        </FormControl>
        <br />
        <FormControl variant="filled">
          <TextField id="filled-multiline-static" value={noteDescription} onChange={e => setNoteDescription(e.target.value)} multiline rows={4} variant="filled" 
            fullWidth placeholder='Note Description:' />
        </FormControl>
        <br />
        <FormControl variant="filled">
          <TextField id="note-tags" value={noteTags} onChange={e => setNoteTags(e.target.value)} variant="filled" fullWidth placeholder='Note Tags:' />
        </FormControl>
        <br />
        <div>
          <Button type="submit" variant="contained">{SAVE} </Button>
          <Link to={`/`}> Back</Link>
        </div>
      </FormHolder>
    </div>
  );
};

export default CreateNote;