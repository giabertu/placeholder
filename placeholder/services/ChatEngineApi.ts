import axios from "axios"
import { UserType } from "../lib/models/User"


class ChatEngineApi {

  static CHAT_ENGINE_URL = 'https://api.chatengine.io/'


  static async createUser (user: UserType) {
    console.log('User to be sent to chat engine: ', JSON.stringify(user))

    const res = await fetch(`${this.CHAT_ENGINE_URL}users/`, {
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
        secret: user.secret,
      }),
    })
    return await res.json();
  }

  static async getChatEngineUser({username, secret}: {username: string, secret: string}) {
    try {
      const res = await fetch(`${this.CHAT_ENGINE_URL}users/`, {
        method: 'PUT',
        headers : {
          'Content-type': 'application/json',
          'PRIVATE-KEY' : 'e3c4f715-cacd-4a8c-a00a-038a9849edff'
        },
        body: JSON.stringify({username, secret})
      })
      console.log('Response: ', res)
      return await res.json()
    } catch (error) {
      console.log('ChatEngine fetch user error 🔴', error)
    }
    return false;
  }

  static async getOrCreateChat({ownUsername, ownSecret, usernameToChat}: {ownUsername: string, ownSecret: string, usernameToChat: string}) {
    const res = await fetch(`${this.CHAT_ENGINE_URL}chats/`, {
      method: 'PUT',
      headers : {
        'Content-type': 'application/json',
        'Project-ID' : 'd6620cc4-d139-4ed9-85f7-cea40cd73c40',
        'User-Name' : ownUsername,
        'User-Secret' : ownSecret,
      },
      body: JSON.stringify({
        usernames: [usernameToChat],
        title: 'My Chat',
        is_direct_chat: true
      }) 
    })
    return await res.json();
  }
}

export default ChatEngineApi;