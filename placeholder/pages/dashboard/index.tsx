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
import styles from '../../styles/Home.module.css'
import Navbar from "../../components/Navbar"
import { Button, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"


const menuButtonStyle = {
  borderRadius: 0,
  fontSize: '1.3rem',

}

export default function Dashboard({ user, isAllowed }: { user: UserType, isAllowed: boolean }) {

  if (isAllowed) return (
    <div>
      <h1>You are allowed here!! {user.email}</h1>
      <Navbar />
      <div className="flex-row menu-container gap-2r justify-center ">
        <Button borderRadius={'none'} style={menuButtonStyle} >Matches</Button>
        <Button style={menuButtonStyle}>My Profile</Button>
        <Button style={menuButtonStyle}>Messages</Button>
        <Button style={menuButtonStyle}>Logout</Button>
      </div>
      <div className={styles.canvasContainer + ' outline'}>
        <Canvas >
          <OrbitControls target={[-1, 0, 4]} enableZoom={false} autoRotate={true} enablePan={false} autoRotateSpeed={1.5} enableDamping={true} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
          <ambientLight intensity={0.5} />
          <directionalLight
            color={"white"}
            intensity={0.5}
            position={[-20, 100, 50]}
          />
          <Suspense>
            <RetroWindows scale={[7, 7, 7]} position={[0, 0, 2]} />
          </Suspense>
        </Canvas>
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