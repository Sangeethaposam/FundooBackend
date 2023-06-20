import { log } from 'winston';
import Note from '../models/notes.model';


//create new note
export const createNote = async (body) => {
      const data = await Note.create(body);
      return data;
    };

//get all notes
export const getAllNotes = async (body) => {
  const data = await Note.find({createdBy: body.createdBy});
  return data;
};
//get single note
export const getNote = async (_id,body) => {
  const data = await Note.findById({_id:_id, createdBy: body.createdBy});
  return data;
};

//update single note
export const updateNotes = async (_id, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id
    },{
      createdBy: body.createdBy
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete note
export const deleteNote = async (_id,body) => {
  await Note.findByIdAndDelete({_id},{createdBy: body.createdBy});
  return '';
};

export const addRemoveTrash = async (_id,body) => {
  const data = await Note.findById(_id,{createdBy: body.createdBy});
  let status;
if(!data){
  throw new Error("data not found");
}
/*
if(data.trash == false){
    status = true;
  }else{
    status = false;
  }
*/
  status = (data.trash == false) ? true : false;
  console.log("status....",status);
  const result = await Note.findByIdAndUpdate({ _id},{trash: status },{new: true});
  console.log("result......",result);
  return result;

};

export const addRemoveArchive = async (_id,body) => {
  const data = await Note.findById(_id,{createdBy: body.createdBy});
  let status;
if(!data){
  throw new Error("data not found");
}else{
  if(data.archive == false){
    status = true;
  }else{
    status = false;
  }
}
  const result = await Note.findByIdAndUpdate({ _id},{new: true},{trash: status });
  return result;
};

