const Note = require("../../db/models/note");
const { transformNote, singleNote } = require("./merge");

const note = async (args) => {
  try {
    const note = await Note.findById({
      _id: args._id,
    });
    if (!note) {
      throw new Error("Unknown note!");
    }
    return singleNote(note);
  } catch (err) {
    throw err;
  }
};

const notes = async () => {
  try {let notedArr = []

    const notes = await Note.find().sort("-created_at");
    return notes.map((note) => {
      return transformNote(note);
    });
  } catch (err) {
    throw err;
  }
};

const createNote = async (args, req) => {
  const note = new Note({
    title: args.title,
    detail: args.detail
  });
  try {
    const result = await note.save();
    const createdNote = transformNote(result);
    return createdNote;
  } catch (err) {
    throw err;
  }
};

const updateNote = async (args) => {
  try {
    const noteID = await Note.findById({
      _id: args._id,
    });
    if (!noteID) {
      throw new Error("Note not found.");
    }

    await Note.findByIdAndUpdate(
      noteID,
      {
        $set: {
          note: args.note,
        },
      },
      { new: true }
    );
    return noteID;
  } catch (err) {
    throw err;
  }
};

const deleteNote = async (args) => {
  try {
    const noteID = await Note.findById({
      _id: args._id,
    });
    if (!noteID) {
      throw new Error("Note not found.");
    }
    await Note.deleteOne(noteID);
    return noteID;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createNote,
  deleteNote,
  updateNote,
  note,
  notes,
};
