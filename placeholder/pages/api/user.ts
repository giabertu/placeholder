import { NextApiRequest, NextApiResponse } from 'next'
import { updateUser, getUsers} from '../../lib/models/queries/user';

export default async function handleUserRequests(request: NextApiRequest, response: NextApiResponse) {

  const user = request.body.user;
  console.log('Request: ', request.body)
  if (request.method === 'PUT') {
    try {
      const result = await updateUser(user);
      response.status(200).json(result)
    } catch (error) {
      console.log('Update user failed 🔴', error)
      response.status(401).json({message: 'update failed'})
    }
  } else if (request.method === 'GET') {
    try {
      const users = await getUsers();
      response.status(200).json(users);
    } catch (error) {
      console.log('Getting users failed 🔴', error)
    }
  } 
}