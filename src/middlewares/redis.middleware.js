import HttpStatus from 'http-status-codes';
import { client } from '../config/redis';


export const getAllFromRedis = async (req, res, next) => {
  const data = await client.get(req.body.createdBy);
  const notes = JSON.parse(data);
  if (notes != null) {
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: notes,
      message: 'All the notes fetched from redis successfully'
    });
  } else {
    next();
  }
};
export const getSingleNoteFromRedis = async (req, res, next) => {
  const data = await client.get(req.params._id);
  const notes = JSON.parse(data);
  if (notes != null) {
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: notes,
      message: ' notes fetched from redis ...!!!'
    });
  } else {
    next();
  }
};

