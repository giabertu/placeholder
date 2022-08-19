import { UserType } from "../lib/models/User";


export default class UserApi {
  
  static ENDPOINT = '/api/user'
  constructor() {}
  
  static async updateUserProfile(user: UserType) {
    const response = await fetch(this.ENDPOINT, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({user: user})
    })
    return await response.json()
  }
}