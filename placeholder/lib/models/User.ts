import mongoose from 'mongoose'

//Define new and updated schema
const userSchema = {
  name: String,
  email:  String, 
  avatar: String, 
  bio: String, 
  location: String,
}

export interface UserType {
  name: string,
  email: string,
  avatar: string,
  bio: string,
  location: string
}

export const User = mongoose.model("User", new mongoose.Schema(userSchema), "users")


