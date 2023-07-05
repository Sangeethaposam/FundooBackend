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
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
    });
    }
  };

  export const getAllNotes = async (req, res, next) => {
    try {
      const data = await NotesService.getAllNotes(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All notes fetched successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
    });
    }
  };
  
  export const getNote = async (req, res, next) => {
    try {
      console.log("controller....");
      const data = await NotesService.getNote(req.params._id,req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Note fetched successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
    });
    }
  };

  export const updateNotes = async (req, res, next) => {
    try {
      const data = await NotesService.updateNotes(req.params._id,req.body.createdBy, req.body);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Note updated successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
    });
    }
  };
  
  export const deleteNote = async (req, res, next) => {
    try {
      await NotesService.deleteNote(req.params._id,req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: [],
        message: 'Note deleted successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
    });
    }
  };
  
  export const addRemoveTrash = async (req, res, next) => {
    try {
      const data = await NotesService.addRemoveTrash(req.params._id);

      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Note added successfully into trash'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
    });
    }
  };

  export const addRemoveArchive = async (req, res, next) => {
    try {
      const data = await NotesService.addRemoveArchive(req.params._id);
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Note added successfully into archive'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
    });
    }
  };

  export const countNotes = async (req, res, next) => {
    try {
      const data = await NotesService.countNotes(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All notes counted successfully'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
    });
    }
  };