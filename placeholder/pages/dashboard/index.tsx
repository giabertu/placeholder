import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import { UserType } from "../../lib/models/User"
import UserApi from "../../services/UserApi"
import { authOptions } from "../api/auth/[...nextauth]"
import { Redirect } from "next/dist/lib/load-custom-routes"
import Typewriter from 'typewriter-effect'
import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import { RetroWindows } from "../../components/models/RetroWindows"
import NotDoneQuiz from "../../components/NotDoneQuiz"
import Navbar from "../../components/Navbar"
import DashboardNavbar from "../../components/DashboardNavbar"
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { CgProfile } from 'react-icons/cg'
import Chat from "../quiz_init/chat"
import ComputerBackground from "../../components/ComputerBackground"

const menuButtonStyle = {
  borderRadius: 0,
  fontSize: '1.3rem',
  display: 'flex',
}

export default function Dashboard({ user, allUsers, isAllowed }: { user: UserType, allUsers: UserType[], isAllowed: boolean }) {

  const [current, setCurrent] = useState(0)


  if (isAllowed) return (
    <div className="flex-column justify-center align-center gap-2r">
      <DashboardNavbar />
      {/* <div className="flex-row menu-container gap-2r ">
        <Button borderRadius={'none'} style={menuButtonStyle} >Matches</Button>
        <Button style={menuButtonStyle}><CgProfile /> Profile </Button>
        <Button style={menuButtonStyle}>Messages</Button>
        <Button style={menuButtonStyle}>Logout</Button>
      </div> */}
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <Chat currentUser={user} allUsers={allUsers} />
        </Suspense>
      </div>
      <ComputerBackground />
    </div >
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
      const allUsers = await UserApi.getAllUsers();
      return {
        props: {
          user,
          allUsers,
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