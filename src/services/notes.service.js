import { log } from 'winston';
import Note from '../models/notes.model';
import { client } from '../config/redis';
import * as rabbit from '../utils/producer.util';

//create new note
export const createNote = async (body) => {
      const data = await Note.create(body);
      if(data){
        await client.del(body.createdBy);
      return data;
      }
      return data;
    };

//get all notes
export const getAllNotes = async (body) => {
  const  limit  = 5;
  const data = await Note.find({createdBy: body.createdBy}).limit(parseInt(limit));
  if(data){
  await client.set(body.createdBy,JSON.stringify(data));
  return data;
  }
  const dataProduce = JSON.stringify(data);
  rabbit.producer('GetNotes',dataProduce);
  return data;
};
//get single note
export const getNote = async (_id,body) => {
  const data = await Note.findById({_id: _id, createdBy: body.createdBy});
  await client.set(_id,JSON.stringify(data));
  return data;
};

//update single note
export const updateNotes = async (_id,createdBy, body) => {
  const data = await Note.findByIdAndUpdate(
    {
      _id: _id
    ,
      createdBy: createdBy
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

export const addRemoveTrash = async (_id) => {
  const data = await Note.findById({_id: _id});
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

export const addRemoveArchive = async (_id) => {
  const data = await Note.findById({_id: _id});
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
  status = (data.archive == false) ? true : false;
  const result = await Note.findByIdAndUpdate({ _id},{archive: status },{new: true});
  return result;

};

//get count notes
export const countNotes = async (body) => {
  const data = await Note.find({createdBy: body.createdBy});
  if(data){ 
    const countData = {};
     countData['trashcount'] = await Note.countDocuments({trash: true });
     countData['archivecount'] = await Note.countDocuments({archive: true });
     countData['getallcount'] = await Note.countDocuments({createdBy: body.createdBy});
    
    return countData;
  }

};


