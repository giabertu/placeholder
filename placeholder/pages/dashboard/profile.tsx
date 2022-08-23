import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from "next-auth/next"
import { UserType } from '../../lib/models/User'
import UserApi from '../../services/UserApi'
import { authOptions } from '../api/auth/[...nextauth]'




export default function MyProfile({ user }: { user: UserType }) {

  return (
    <div>
      <h1>Hello, {user.first_name}, {user.last_name}</h1>
    </div>
  )

}



export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (!session) {
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
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }
}