import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import { UserType } from "../../lib/models/User"
import UserApi from "../../services/UserApi"
import { authOptions } from "../api/auth/[...nextauth]"
import { Redirect } from "next/dist/lib/load-custom-routes"
import Typewriter from 'typewriter-effect'
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { RetroWindows } from "../../components/models/RetroWindows"
import NotDoneQuiz from "../../components/NotDoneQuiz"



export default function Dashboard({ user, isAllowed }: { user: UserType, isAllowed: boolean }) {

  if (isAllowed) return (
    <div>
      <h1>You are allowed here!! {user.email}</h1>
    </div>
  )
  return (<NotDoneQuiz />)
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
    if (user.custom_json.level) {
      return {
        props: {
          user,
          isAllowed: true,
        }
      }
    } return {
      props: {
        isAllowed: false
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