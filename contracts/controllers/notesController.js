// Simple in-memory store for notes (reset on server restart)
const notes = [];

function generateId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  ).toUpperCase();
}

// POST /notes
exports.createNote = (req, res) => {
  const { title, content } = req.body || {};
  if (!title || !content) {
    return res.status(400).json({ message: 'title and content are required' });
  }
  const now = new Date().toISOString();
  const note = { id: generateId(), title, content, createdAt: now, updatedAt: now };
  notes.push(note);
  return res.status(201).json(note);
};

// GET /notes
exports.getNotes = (_req, res) => {
  return res.json(notes);
};

// GET /notes/:id
exports.getNoteById = (req, res) => {
  const { id } = req.params;
  const note = notes.find(n => n.id === id);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  return res.json(note);
};

// PUT /notes/:id
exports.updateNoteById = (req, res) => {
  const { id } = req.params;
  const noteIndex = notes.findIndex(n => n.id === id);
  if (noteIndex === -1) return res.status(404).json({ message: 'Note not found' });
  const { title, content } = req.body || {};
  if (!title && !content) {
    return res.status(400).json({ message: 'Nothing to update' });
  }
  const updated = {
    ...notes[noteIndex],
    title: title ?? notes[noteIndex].title,
    content: content ?? notes[noteIndex].content,
    updatedAt: new Date().toISOString(),
  };
  notes[noteIndex] = updated;
  return res.json(updated);
};

// DELETE /notes/:id
exports.deleteNoteById = (req, res) => {
  const { id } = req.params;
  const noteIndex = notes.findIndex(n => n.id === id);
  if (noteIndex === -1) return res.status(404).json({ message: 'Note not found' });
  notes.splice(noteIndex, 1);
  return res.status(204).send();
};


