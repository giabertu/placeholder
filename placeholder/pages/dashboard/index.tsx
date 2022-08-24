import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import UserApi from "../../services/UserApi"
import { authOptions } from "../api/auth/[...nextauth]"



export default function Dashboard() {



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
    const user = await UserApi.getOneUser(session.user.email)
    if (user.custom_json)
      return {
        props: {
          user,
        }
      }
  }
  return {
    redirect: {
      destination: '/',
      permanent: false,
    }
  }

}