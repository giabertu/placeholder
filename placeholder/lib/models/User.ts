import mongoose from 'mongoose'
import { TechnologyObj } from '../../redux/types'

//Define new and updated schema
const userSchema = {
  name: String,
  email:  String, 
  avatar: String, 
  bio: String, 
  location: String,
  level: String,
  purpose: String,
  developerField: String,
  experiencedWithTechnologies: [{
    name : String,
    imageSrc : String
    }]
}

export interface UserType {
  name: string,
  email: string,
  avatar: string,
  bio: string,
  location: string,
  level: string,
  purpose: string,
  developerField: null | string,
  experiencedWithTechnologies: TechnologyObj[]
}

export const User = mongoose.model("User", new mongoose.Schema(userSchema), "users")


