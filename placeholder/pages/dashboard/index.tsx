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
import Navbar from "../../components/Navbar"
import styles from '../../styles/dashboard.module.css'
import DashboardNavbar from "../../components/DashboardNavbar"



export default function Dashboard({ user, isAllowed }: { user: UserType, isAllowed: boolean }) {

  if (isAllowed) return (
    <div className={styles.container}>
      <DashboardNavbar />
      <div className={styles.header}>
        <h1 className={styles.name}> &#62; {user.first_name} {user.last_name}</h1>
        <h1>You are allowed here!! {user.email}</h1>
      </div>
      <div>
        <h2>Bio</h2>
        <p>{user.custom_json.bio}</p>
      </div>
      
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
    console.log('Here is the user inside the server: ', user)
    if (user.custom_json.level) {
      return {
        props: {
          user,
          isAllowed: true,
        }
      }
    }
    //Destroy the user profile: 
    const res = await UserApi.findByIdAndRemove(user._id)

    return {
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