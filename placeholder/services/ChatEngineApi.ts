import axios from "axios"
import { UserType } from "../lib/models/User"


class ChatEngineApi {

  static USER_URL = 'https://api.chatengine.io/users/'


  static async createUser (user: UserType) {
    console.log('User to be sent to chat engine: ', JSON.stringify(user))

    const res = await fetch(this.USER_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'PRIVATE-KEY' : 'e3c4f715-cacd-4a8c-a00a-038a9849edff'
      },
      body: JSON.stringify({
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        secret: user.secret
      }),
    })
    return await res.json();
  }

}

export default ChatEngineApi;