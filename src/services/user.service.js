import User from '../models/user.model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

