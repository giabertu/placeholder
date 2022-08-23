import mongoose from 'mongoose'
import { PersonObject } from 'react-chat-engine-advanced'

import { TechnologyObj } from '../../redux/types'

//Define new and updated schema
const userSchema = {
  username: String,
  email:  String, 
  first_name: String,
  last_name: String,
  secret: String,
  custom_json: {
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
    menteePreferences: {
      desiredCategories: [String],
      desiredTechnologies: [{
        name: String,
        imageSrc: String,
      }]
    },
    experiencedWithTechnologies: [{
      name : String,
      imageSrc : String
      }]
  }
}

export interface UserType {
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  secret: string,
  custom_json: {
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
    menteePreferences: {
      desiredCategories: string[],
      desiredTechnologies: TechnologyObj[]
    }
    experiencedWithTechnologies: TechnologyObj[]
  }
}

let model;
try {
  model = mongoose.model('User')
} catch (error) {
  model = mongoose.model('User', new mongoose.Schema(userSchema), "users")
}

export const User = model;



