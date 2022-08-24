import { Divider, Wrap, WrapItem, Tag, AvatarGroup } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { Avatar } from 'react-chat-engine-advanced'
import { CloudUploadOutline } from 'react-ionicons'
import Navbar from '../../components/Navbar'
import ProfileEditable from '../../components/ProfileEditable'
import { UserType } from '../../lib/models/User'
import UserApi from '../../services/UserApi'
import { authOptions } from '../api/auth/[...nextauth]'



export default function MyProfile({ user }: { user: UserType }) {

  async function getUsers() {
    const users = await UserApi.getAllUsers();
    console.log(users);
  }
  getUsers();

  return (
    <div>
      <div className="profile-main-container flex-column outline align-center">
        <Navbar progressValue={0} />
        <ProfileEditable user={user} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (!session) {
    console.log('SESSION DOESNT EXIST', session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  if (session && session.user && session.user.email) {
    const user = await UserApi.getOneUser(session.user?.email)
    return {
      props: {
        user
      }
    }
  } else {
    console.log('EITHER SESSION, USER OR EMAIL DONT EXIST', session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
}