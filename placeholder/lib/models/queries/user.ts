import {User, UserType} from '../User'

async function updateUser(user: UserType) {
  console.log('Here is the user in queries' , user)
  const res = await User.replaceOne({email: user.email}, user )
  console.log('Here is the result of the update: ', res)
  return res
}

async function getOneUser(email: string) {
  console.log('Do we ge insie getOneUser? Yes!')
  //@ts-ignore
  const res = await User.findOne({email});
  console.log('Response in server: ' , res)
  return res
}

async function getUsers() {
    //@ts-ignore
    const users = await User.find({});
    console.log('Here are the users: ', users)
    return users;
}


export {updateUser, getUsers, getOneUser}