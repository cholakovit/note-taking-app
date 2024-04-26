import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { StyledTableCell, StyledTableRow } from './index.style';
import { useDeleteNote, useGetNotes } from '../../helper/hooks';
import Skeletons from '../Skeletons';
import { Link } from "react-router-dom";
import { ACTIONS, CREATE_NEW_NODE, DELETE, DISPLAY_NOTE_LIST, EDIT, ERR_OCCURRED, NOTES } from '../../helper/constants';
import Filters from '../Filters';
import { useQuery } from '@tanstack/react-query';
import { store } from '../../helper/store';

const ListNotes = () => {

  const { data: search } = useQuery({
    queryKey: ['search'],
    queryFn: () => store.getSearch()
  })

  const { notes, error, isLoading } = useGetNotes(search);
  //const { notes, error, isLoading } = useGetNotes();
  const deleteMutation = useDeleteNote();

  console.log('notes: ', notes)

  const handleDelete = (noteId: string) => {
    deleteMutation.mutate(noteId);
  };

  return (
    <>
      <h1>{DISPLAY_NOTE_LIST}</h1>
      {isLoading && <Skeletons count={10} />}
      {error && <div>{ERR_OCCURRED} {error.message}</div>}
      {deleteMutation.isError && <div>{ERR_OCCURRED} {deleteMutation.error.message}</div>}

      <Filters />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>{NOTES} - <Link to={`/create-note`}>{CREATE_NEW_NODE}</Link></StyledTableCell>
              <StyledTableCell align="right">{ACTIONS}</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes && notes.notes.map((note: Note) => (
              <StyledTableRow key={note._id}>
                <StyledTableCell component="th" scope="row">
                  {note.title}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Link to={`/update-note/${note._id}`}>{EDIT}</Link> |
                  <Button onClick={() => handleDelete(note._id!)} color="error">{DELETE}</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListNotes