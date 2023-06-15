import Note from '../models/notes.model';


//create new note
export const createNote = async (body) => {
      const data = await Note.create(body);
      return data;
    };

//get all notes
export const getAllNotes = async () => {
  const data = await Note.find();
  return data;
};
//get single note
export const getNote = async (_id) => {
  const data = await Note.findById(_id);
  return data;
};

//update single note
export const updateNotes = async (_id, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete note
export const deleteNote = async (_id) => {
  await Note.findByIdAndDelete(_id);
  return '';
};
