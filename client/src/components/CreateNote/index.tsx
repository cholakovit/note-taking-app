import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import { BACK, CREATE_NEW_NOTE, SAVE } from '../../helper/constants';
import { useNoteForm } from '../../helper/hooks';
import { Link } from 'react-router-dom';
import { FormHolder } from '../../app.style';
import { CustomFilledInput } from './index.style';

const CreateNote = () => {
  const { noteTitle, setNoteTitle, noteDescription, setNoteDescription, noteTags, setNoteTags, handleSubmit, titleError, descriptionError, tagError } = useNoteForm();

  return (
    <div>
      <FormHolder noValidate autoComplete="off" onSubmit={handleSubmit}>
        <h3>{CREATE_NEW_NOTE}</h3>
        <FormControl variant="filled">
          <CustomFilledInput id="filled-basic" label="Note Title" variant="filled" value={noteTitle} onChange={e => setNoteTitle(e.target.value)} 
          error={titleError} helperText={titleError ? "Note title is required." : ""} />
        </FormControl>
        <br />
        <FormControl variant="filled">
          <CustomFilledInput id="filled-multiline-static" label="Note Description" value={noteDescription} onChange={e => setNoteDescription(e.target.value)}
            multiline rows={4} variant="filled" error={descriptionError} helperText={descriptionError ? "Note description is required." : ""} />
        </FormControl>
        <br />
        <FormControl variant="filled">
          <CustomFilledInput id="filled-basic" label="Note Tags" variant="filled" value={noteTags} onChange={e => setNoteTags(e.target.value)}
            error={tagError} helperText={tagError ? "Note Tags are required." : "Enter tags separated by (,)"}
          />
        </FormControl>
        <br />
        <div>
          <Button type="submit" variant="contained">{SAVE} </Button>
          <Link to={`/`}> {BACK}</Link>
        </div>
      </FormHolder>
    </div>
  );
};

export default CreateNote;