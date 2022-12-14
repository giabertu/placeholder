import { Types } from "mongoose";
import { UserType } from "../lib/models/User";


export default class UserApi {

  static USERS_ENDPOINT = '/api/users'
  static USER_ENDPOINT = '/api/user'

  constructor() {}


  static async updateUserProfile(user: UserType) {
    const response = await fetch(this.USER_ENDPOINT, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({user: user})
    })
    return await response.json()
  }

  static async findByIdAndRemove(id: Types.ObjectId | undefined) {
    const response = await fetch(`${process.env.SERVER}${this.USER_ENDPOINT}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id}),
    }) 
    console.log('Here is the response: ', response)
  }

  static async getOneUser(email: string): Promise<UserType | boolean> {
    try {

      console.log('Here is the email: ', email)
      const response = await fetch(`${process.env.SERVER}${this.USER_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      })
      console.log('Response in userApi: ' , response)
      return await response.json()
    } catch (error) {
      console.log('There was an error with the request: ', error);
      return false;
    }
    // return await response.json()
  }

  static async getUserById(id: string) {
    console.log('Here is the email: ', id)
    const response = await fetch(`${process.env.SERVER}${this.USER_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id}),
    })
    // console.log('Response in userApi: ' , response)
    return await response.json()
    // return await response.json()
  }

  static async getCloudinaryUrl(formData: FormData) {
    const response = await fetch('https://api.cloudinary.com/v1_1/gianni-bertuzzi/image/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData
    })
    return await response.json()
  }

  static async getAllUsers(): Promise<UserType[]> {
    const users = await fetch(`${process.env.SERVER}${this.USERS_ENDPOINT}`)
    return await users.json()
  }

  static async getAllUsersFromClient(): Promise<UserType[]> {
    const users = await fetch(this.USERS_ENDPOINT)
    return await users.json()
  }
}