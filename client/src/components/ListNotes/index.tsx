import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { StyledTableCell } from './index.style';
import { useDeleteNote, useGetNotes } from '../../helper/hooks';
import Skeletons from '../Skeletons';
import { Link } from "react-router-dom";
import { ACTIONS, CREATE_NEW_NOTE, DISPLAY_NOTE_LIST, ERR_OCCURRED, NOTES } from '../../helper/constants';
import Filters from '../Filters';
import { useQuery } from '@tanstack/react-query';
import { store } from '../../helper/store';
import Note from '../Note';
import AlertMessage from '../Alert';

const ListNotes = () => {

  const { data: search } = useQuery({
    queryKey: ['search'],
    queryFn: () => store.getSearch()
  })

  const { notes, error, isLoading } = useGetNotes(search);
  const { handleDelete, deleteMutation } = useDeleteNote();

  return (
    <>
      <h3>{DISPLAY_NOTE_LIST}</h3>
      {deleteMutation.isError && <div>{ERR_OCCURRED} {deleteMutation.error.message}</div>}

      <Filters />
      {error ? (
          <AlertMessage alert={error.message} type="error" />
        ) : isLoading ? (
          <>
            <Skeletons flag={1} width={400} height={120} number={1} />
          </>
        ) : (
          <>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>{NOTES} - <Link to={`/create-note`}>{CREATE_NEW_NOTE}</Link> - <Link to={`/login`}>Login</Link> - 
                    <Link to={`/create-user`}> Create User</Link></StyledTableCell>
                  <StyledTableCell align="right">{ACTIONS}</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notes && notes.notes.map((note: Note) => (
                  <Note key={note._id} note={note} onDelete={handleDelete} />
                ))}
              </TableBody>
            </Table>
            </TableContainer>
          </>
      )}
    </>
  );
}

export default ListNotes