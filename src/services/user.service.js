import User from '../models/user.model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as utils from '../utils/user.util';
import * as rabbit from '../utils/producer.util';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const registerUser = async (body) => {
const email = await User.findOne({email : body.email});
if(email){
  throw new Error("Email already exists");
}
//const saltRounds = 10;
else{
const hash = bcrypt.hashSync(body.password, 10);
  body.password = hash;
  const data = await User.create(body);
  
  const dataProduce = JSON.stringify(data);
  rabbit.producer('Registration user',dataProduce);
  return data;
}
};

//login user
export const loginUser = async (body) => {
  const data = await User.findOne({email : body.email});
  if(!data){
    throw new Error("invalid email");
  }else {
    if(bcrypt.compareSync(body.password,data.password)){

      var token = jwt.sign({ id: data.id ,email : data.email}, process.env.SECRET_KEY);
       return token;
  }else{
    throw new Error("Invalid password");
  }
 }
};

//forgotPassword
export const forgotPassword = async (body) => {
  const data = await User.findOne({email : body.email});
  console.log("email ...", data);
  if(data){
    const token = jwt.sign({ id: data.id ,email : data.email}, process.env.RESET_KEY);
    console.log("token generated........", token);
      const send = await  utils.sendMail(data.email,token);
      return send;
  }else {
    throw new Error("invalid email"); 
  }
};

//reset  Password
export const resetPassword = async (_id,body) => {
  const hash = bcrypt.hashSync(body.password, 10);
  body.password = hash;
  const data = await User.findByIdAndUpdate(
    {
      _id
    },{
      password: body.password
    },
    {
      new: true
    }
  );
  if(!data){
    throw new Error("Failed to reset password");
  }
  return data;
};


