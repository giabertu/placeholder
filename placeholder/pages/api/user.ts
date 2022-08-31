import { NextApiRequest, NextApiResponse } from 'next'
import { findByIdAndRemove, getOneUser, getUserById, updateUser} from '../../lib/models/queries/user';

export default async function handleUserRequests(request: NextApiRequest, response: NextApiResponse) {

  const user = request.body.user;
  const email = request.body.email
  const id = request.body.id

  console.log('Request: ', request.body)
  if (request.method === 'PUT') {
    try {
      const result = await updateUser(user);
      response.status(200).json(result)
    } catch (error) {
      console.log('Update user failed 🔴', error)
      response.status(401).json({message: 'update failed'})
    }
  } else if(request.method === 'POST') {
    try {
        if (email) {
          const userGiven = await getOneUser(email);
          response.status(200).json(userGiven);
        } else {
          const userGiven = await getUserById(id);
          response.status(200).json(userGiven);
        }
    } catch (error) {
      console.log('User fetch failed 🔴', error)
    }
  } else if (request.method == 'DELETE') {
    try {
        const res = await findByIdAndRemove(id);
        response.status(200).json(res);
      } catch (error) {
    console.log('User fetch failed 🔴', error)
  } 
  }
}