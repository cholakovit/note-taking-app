import React, { FC } from 'react'
import { StyledTableCell, StyledTableRow } from '../ListNotes/index.style'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { DELETE, EDIT } from '../../helper/constants'

const Note: FC<NoteProps> = ({ note, onDelete }) => {
  return (
    <StyledTableRow key={note._id}>
      <StyledTableCell component="th" scope="row">
        {note.title}
      </StyledTableCell>
      <StyledTableCell align="right">
        <Link to={`/update-note/${note._id}`}>{EDIT}</Link> |
        <Button onClick={() => onDelete(note._id!)} color="error">{DELETE}</Button>
      </StyledTableCell>
    </StyledTableRow>
  )
}

export default React.memo(Note)