import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { newNoteValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { getAllFromRedis,getSingleNoteFromRedis } from '../middlewares/redis.middleware';

const router = express.Router();

//route to create a new notes
router.post('/',newNoteValidator,userAuth, notesController.createNote);

//route to get all notes
router.get('',userAuth,getAllFromRedis, notesController.getAllNotes);

//route to get note
router.get('/:_id',userAuth,getSingleNoteFromRedis, notesController.getNote);

//route to update note
router.put('/:_id',userAuth, notesController.updateNotes);

//route to delete note
router.delete('/:_id',userAuth, notesController.deleteNote);

//route to trash 
router.put('/trash/:_id',userAuth, notesController.addRemoveTrash);

//route to archive
router.put('/archive/:_id',userAuth, notesController.addRemoveArchive);

//route to archive
router.get('/countNotes',userAuth, notesController.countNotes);

export default router;