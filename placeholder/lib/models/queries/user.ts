import {User, UserType} from '../User'

async function updateUser(user: UserType) {
  console.log('Here is the user in queries' , user)
  const res = await User.findOneAndUpdate({email: user.email}, user )
  console.log('Here is the result of the update: ', res)
  return res
}


export {updateUser}