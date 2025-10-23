const express = require('express');
const {
  createNote,
  getNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
} = require('../controllers/notesController');

const router = express.Router();

router.route('/')
  .post(createNote)
  .get(getNotes);

router.route('/:id')
  .get(getNoteById)
  .put(updateNoteById)
  .delete(deleteNoteById);

module.exports = router;


