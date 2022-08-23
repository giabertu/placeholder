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

// export type UserContextType {
//   user: UserType;
//   setUser: (u: UserType | undefined) => void;
// }

// export const UserContext = createContext<UserContextInterface>({
//   user: undefined,
//   setUser: () => {}
// });

// export const UserContextProvider = (props: UserContextInterface) => {
//   const [user, setUser] = useState<UserType | undefined>(undefined);
//   const value = { user, setUser};

//   return ..

// }


export const User = mongoose.model("User", new mongoose.Schema(userSchema), "users")


