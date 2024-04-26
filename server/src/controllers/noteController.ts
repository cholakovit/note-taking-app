import { Request, Response } from "express";
import noteModel from '../models/noteModel'
import { StatusCodes } from "http-status-codes";

class NoteController {

  async listNotes(req: Request, res: Response) {
    const notes = await noteModel.find().sort('createdAt')
    res.status(StatusCodes.OK).json({ notes, count: notes.length })
  }

  async createNote(req: Request, res: Response) {
    const note = await noteModel.create(req.body)
    res.status(StatusCodes.CREATED).send({ note })
  }

  showNote(req: Request, res: Response) {
    console.log('showNote')
    res.send('showNote')
  }

  async updateNote(req: Request, res: Response) {
    const { params: { id: noteId } } = req
    const note = await noteModel.findByIdAndUpdate(
      { _id: noteId }, req.body, { new: true, runValidators: true }
    )
    if(!note) {
      throw new Error(`No note with id ${noteId}`)
    }
    res.status(StatusCodes.OK).json({ note })
  }

  async deleteNote(req: Request, res: Response) {
    const { params: { id: noteId } } = req
    const note = await noteModel.findByIdAndDelete({
      _id: noteId,
    })
    if(!note) {
      throw new Error(`No note with id ${noteId}`)
    }
    res.status(StatusCodes.OK).send()
  }

  async searchNotes(req: Request, res: Response) {
    const searchQuery = req.query.query; 
    if (typeof searchQuery !== 'string' || !searchQuery) {
      return res.status(400).json({ message: 'Query parameter is missing or invalid' });
    }

    try {
      // Perform a search using Mongoose with a valid string
      const notes = await noteModel.find({
          $text: { $search: searchQuery }
      });

      res.status(StatusCodes.OK).json({ notes, count: notes.length })
    } catch (err) {
        const error = err as Error
        res.status(500).json({ message: error.message });
    }
  }
}

export default NoteController

