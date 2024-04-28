import { Request, Response } from "express";
import noteModel from "../models/noteModel";
import tagModel from "../models/tagModel";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import logger from "../logger/logger";

class NoteController {
  listNotes = async (req: Request, res: Response) => {
    try {
      const notes = await noteModel.find().sort("createdAt");
      res.status(StatusCodes.OK).json({ notes, count: notes.length });
    } catch (error) {
      console.error('Error retrieving notes:', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while retrieving notes."
      });
    }
  };

  createNote = async (req: Request, res: Response) => {
    const { title, description, tags } = req.body;
    try {
      if (!title && !description) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Title and description are required." });
      }

      const note = await this.createOrUpdateNoteWithTags(
        undefined,
        title,
        description,
        tags
      );
      res.status(StatusCodes.CREATED).json({ note });
    } catch (err) {
      const error = err as Error;
      logger.error("Error creating or updating note:", error.message);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Error creating or updating note" });
    }
  };

  showNote = async (req: Request, res: Response) => {
    try {
      const noteId = req.params.id;
      const note = await noteModel.findById(noteId);

      if (!note) {
        res.status(StatusCodes.NOT_FOUND).send("Note not found");
      } else {
        res.status(StatusCodes.OK).json({ note });
      }
    } catch (error) {
      logger.error("Error finding note:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Error finding note");
    }
  };

  updateNote = async (req: Request, res: Response) => {
    const { params: { id: noteId } } = req;
  
    try {
      const note = await noteModel.findByIdAndUpdate(
        { _id: noteId },
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!note) {
        logger.error(`No note with id ${noteId}`);
        return res.status(StatusCodes.NOT_FOUND).json({ message: `No note with id ${noteId}` });
      }
  
      res.status(StatusCodes.OK).json({ note });
    } catch (err) {
      const error = err as Error
      logger.error(`Error updating note: ${error.message}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to update note' });
    }
  };

  deleteNote = async (req: Request, res: Response) => {
    const { params: { id: noteId } } = req;

    try {
        const note = await noteModel.findByIdAndDelete(noteId);

        if (!note) {
            logger.error(`No note with id ${noteId}`);
            return res.status(StatusCodes.NOT_FOUND).json({ message: `No note with id ${noteId}` });
        }

        res.status(StatusCodes.OK).send({ message: 'Note deleted successfully' });
    } catch (err) {
      const error = err as Error
      logger.error(`Error deleting note: ${error.message}`);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error deleting note' });
    }
  };

  searchNotes = async (req: Request, res: Response) => {
    const searchQuery = req.query.query;
    if (typeof searchQuery !== "string" || !searchQuery) {
      logger.error("Query parameter is missing or invalid");
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Query parameter is missing or invalid" });
    }

    try {
      // Use aggregation to perform a single query operation
      const results = await tagModel.aggregate([
        { $match: { name: searchQuery } },
        {
          $lookup: {
            from: "notes",
            localField: "notes",
            foreignField: "_id",
            as: "relatedNotes",
          },
        },

        {
          $project: {
            _id: 0,
            notes: "$relatedNotes",
            count: { $size: "$relatedNotes" },
          },
        },
      ]);

      if (results.length === 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Tag not found", notes: [], count: 0 });
      }

      const { notes, count } = results[0];

      res.status(StatusCodes.OK).json({ notes, count });
    } catch (err) {
      const error = err as Error;
      logger.error("Error searching notes by tag:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };

  createOrUpdateNoteWithTags = async (
    noteId: string | undefined,
    title: string,
    description: string,
    tagNames: string
  ) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      let note;
      if (noteId) {
        note = await noteModel.findByIdAndUpdate(
          noteId,
          { title, description, updatedAt: Date.now() },
          { new: true, session }
        );
      } else {
        note = new noteModel({ title, description });
        await note.save({ session });
      }

      // Process each tag name
      // for (const tagName of tagNames) {
      //     await tagModel.findOneAndUpdate({
      //         name: tagName
      //     }, { $addToSet: { notes: note!._id } }, { new: true, upsert: true, session });
      // }

      await tagModel.findOneAndUpdate(
        {
          name: tagNames,
        },
        { $addToSet: { notes: note!._id } },
        { new: true, upsert: true, session }
      );

      await session.commitTransaction();
      return note;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  };
}

export default NoteController;
