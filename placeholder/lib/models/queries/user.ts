import {User, UserType} from '../User'
import {Types } from 'mongoose'
import { Account } from '../Account'
import { Session } from '../Session'

async function updateUser(user: UserType) {
  console.log('Here is the user in queries' , user)
  const res = await User.replaceOne({email: user.email}, user )
  console.log('Here is the result of the update: ', res)
  return res
}

async function getOneUser(email: string) {
  console.log('Do we ge insie getOneUser? Yes!')
  //@ts-ignore
  const res = await User.findOne({email}).populate({
    path: 'custom_json',
    populate: [
      {
        path: 'mentors',
      },
      {
        path: 'mentees',
      }
    ]
  });
  console.log('Response in server: ' , res)
  return res
}

async function getUserById(id: string) {
  console.log('Do we ge insie getUserById? Yes!')
  //@ts-ignore
  const res = await User.findById(id)
  console.log('Response in server: ' , res) 
  return res
}

async function getUsers() {
    //@ts-ignore
    const users = await User.find({});
    console.log('Here are the users: ', users)
    return users;
}

async function findByIdAndRemove(id: Types.ObjectId) {
  console.log('Do we ge insie getUserById? Yes!')
  const res = await User.findByIdAndRemove(id)
  console.log('Response in server: ' , res)
  Account.findOneAndRemove({userId: id}).then(res => console.log('Account Removed: ', res)).catch(err => console.log(err))
  Session.findOneAndRemove({userId: id}).then(res => console.log('Session Removed: ', res)).catch(err => console.log(err))

  return res
}

export {updateUser, getUsers, getOneUser, getUserById, findByIdAndRemove}