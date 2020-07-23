const Note = require("../../db/models/note");

const { dateToString } = require("../../helper/helper");

const transformNote = (note) => {
  return {
    ...note._doc,
    _id: note.id,
    created_at: dateToString(note._doc.created_at),
    updated_at: dateToString(note._doc.updated_at),
  };
};

const notes = async (noteIds) => {
  try {
    const notes = await Note.find({ _id: { $in: noteIds } });
    return notes.map((note) => {
      return {
        ...note._doc,
        _id: note.id,
      };
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const singleNote = async (noteId) => {
  try {
    const note = await Note.findById(noteId);
    return transformNote(note);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.transformNote = transformNote;
exports.notes = notes;
exports.singleNote = singleNote;
