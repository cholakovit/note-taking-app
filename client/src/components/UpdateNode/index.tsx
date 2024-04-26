import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { BACK, ERR_OCCURRED, SAVE, UPDATE_NEW_NOTE } from '../../helper/constants';
import { useNoteFormUpdate } from '../../helper/hooks';
import { Link } from 'react-router-dom';
import { FormHolder } from '../../app.style';

const UpdateNote = () => {
  const { noteTitle, setNoteTitle, noteDescription, setNoteDescription, noteTags, setNoteTags, handleSubmit, mutation } = useNoteFormUpdate();

  return (
    <div>
      <FormHolder noValidate autoComplete="off" onSubmit={handleSubmit}>
        <h3>{UPDATE_NEW_NOTE}</h3>
        <FormControl variant="filled">
          <TextField id="component-filled" value={noteTitle} onChange={e => setNoteTitle(e.target.value)} variant="filled" 
            fullWidth placeholder='Note Title:' />
        </FormControl>
        <br />
        <FormControl variant="filled">
          <TextField id="filled-multiline-static" value={noteDescription} onChange={e => setNoteDescription(e.target.value)} multiline rows={4} variant="filled" 
          fullWidth placeholder='Note Description:' />
        </FormControl>
        <br />
        <FormControl variant="filled">
          <TextField id="note-tags" value={noteTags} onChange={e => setNoteTags(e.target.value)} variant="filled" 
            fullWidth placeholder='Note Tags:' />
        </FormControl>
        <br />
        <div>
          <Button size="small" variant="contained" type="submit">{SAVE} </Button>
          <Link to={`/`}> {BACK}</Link>
        </div>
        {mutation.isError && <p>{ERR_OCCURRED} {mutation.error instanceof Error ? mutation.error.message : 'Unknown error'}</p>}
      </FormHolder>
    </div>
  );
};

export default UpdateNote;