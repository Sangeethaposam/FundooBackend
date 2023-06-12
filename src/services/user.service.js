import User from '../models/user.model';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
  const data = await User.create(body);
  return data;
};

//login user
export const loginUser = async (body) => {
  const data = await User.findOne({email : body.email,password : body.password});
  if(data){
  return data;
  }else{
    throw new Error("Invalid details");
  }
};

