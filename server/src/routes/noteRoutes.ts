

import express from 'express'
import NoteController from '../controllers/noteController'

export const noteRouter = express.Router()

const notes = new NoteController()

noteRouter.route('/search').get(notes.searchNotes);
noteRouter.route('/').get(notes.listNotes).post(notes.createNote)
noteRouter.route('/:id').get(notes.showNote).delete(notes.deleteNote).patch(notes.updateNote)


