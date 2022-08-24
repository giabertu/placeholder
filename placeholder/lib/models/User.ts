
import mongoose, { Schema, Types } from 'mongoose'
import { TechnologyObj } from '../../redux/types'

//Define new and updated schema
const userSchema = {
  username: String,
  email:  String,
  first_name: String,
  last_name: String,
  secret: String,
  custom_json: {
    mentors: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    mentees: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
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
  _id: string,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  secret: string,
  custom_json: {
    mentors: Types.ObjectId[],
    mentees: Types.ObjectId[],
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

export interface ChatEngineUser {
  id: number,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  secret: string,
  is_authenticated: boolean,
  avatar: null | string,
  custom_json: any,
  is_online: boolean,
  create: string,
}

let model;
try {
  model = mongoose.model('User')
} catch (error) {
  model = mongoose.model('User', new mongoose.Schema(userSchema), "users")
}

export const User = model;



