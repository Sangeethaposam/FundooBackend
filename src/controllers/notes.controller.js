import HttpStatus from 'http-status-codes';
import * as NotesService from '../services/notes.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const createNote = async (req, res, next) => {
    try {
      const data = await NotesService.createNote(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  export const getAllNotes = async (req, res, next) => {
    try {
      const data = await NotesService.getAllNotes();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All notes fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getNote = async (req, res, next) => {
    try {
      console.log("controller getnote",req.params,req.queries);
      const data = await NotesService.getNote(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Note fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  export const updateNotes = async (req, res, next) => {
    try {
      const data = await NotesService.updateNotes(req.params._id, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Note updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteNote = async (req, res, next) => {
    try {
      await NotesService.deleteNote(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: [],
        message: 'Note deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  