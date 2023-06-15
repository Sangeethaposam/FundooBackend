import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new notes
router.post('/Create', userAuth, notesController.createNote);

//route to get all notes
router.get('/GetAll',userAuth, notesController.getAllNotes);

//route to get note
router.get('/:_id',userAuth, notesController.getNote);

//route to get note
router.put('/:_id',userAuth, notesController.updateNotes);

//route to get note
router.delete('/:_id',userAuth, notesController.deleteNote);

export default router;