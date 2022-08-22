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

  static async getAllUsers() {
    
  }
}