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
  mentorPreferences: {
    desiredCareers: [String],
    desiredCategories: [String],
    desiredTechnologies: [{
      name: String,
      imageSrc: String
    }]
  },
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
  mentorPreferences: {
    desiredCareers: string[],
    desiredCategories: string[],
    desiredTechnologies: (TechnologyObj | string)[]
  },
  experiencedWithTechnologies: TechnologyObj[]
}

export const User = mongoose.model("User", new mongoose.Schema(userSchema), "users")


