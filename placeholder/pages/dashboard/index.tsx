import { GetServerSideProps } from "next"
import { unstable_getServerSession } from "next-auth"
import { ChatEngineUser, UserType } from "../../lib/models/User"
import UserApi from "../../services/UserApi"
import { authOptions } from "../api/auth/[...nextauth]"
import { Suspense, useEffect, useState } from "react"
import NotDoneQuiz from "../../components/NotDoneQuiz"
import DashboardNavbar from "../../components/DashboardNavbar"
import Chat from "../../components/chat"
import ChatEngineApi from "../../services/ChatEngineApi"
import ComputerBackground from "../../components/ComputerBackground"
import ProfileEditable from "../../components/ProfileEditable"
import DashboardMatches from "../../components/DashboardMatches"

const menuButtonStyle = {
  borderRadius: 0,
  fontSize: '1.3rem',
  display: 'flex',
}

export default function Dashboard({ user, allUsers, isAllowed }: { user: UserType, allUsers: UserType[], isAllowed: boolean }) {

  const [current, setCurrent] = useState(0)
  const [menteesProfiles, setMenteesProfiles] = useState<{ user: UserType, chatEngineUser: ChatEngineUser }[]>([])
  const [mentorsProfiles, setMentorsProfiles] = useState<{ user: UserType, chatEngineUser: ChatEngineUser }[]>([])

  console.log('Here is mentorsProfiles: ', mentorsProfiles)
  console.log('Here is menteesProfiles: ', menteesProfiles)

  useEffect(() => {

    (async () => {
      const matchedUsersInfo = await Promise.all(user.custom_json.mentees.map(async (match) => {
        return {
          user: match,
          //@ts-ignore
          chatEngineUser: await ChatEngineApi.getChatEngineUser({ username: match.username, secret: match.secret })
        }
      }));
      //@ts-ignore
      setMenteesProfiles(matchedUsersInfo)
    })()

  }, [])

  useEffect(() => {

    (async () => {
      const matchedUsersInfo = await Promise.all(user.custom_json.mentors.map(async (match) => {
        //@ts-ignore 
        return {
          user: match,
          //@ts-ignore
          chatEngineUser: await ChatEngineApi.getChatEngineUser({ username: match.username, secret: match.secret })
        }
      }));

      //@ts-ignore
      setMentorsProfiles(matchedUsersInfo.filter(userinfo => userinfo.user.custom_json.level !== 'beginner'))
    })()

  }, [])


  if (isAllowed) return (
    <div className="container flex-column justify-center align-center gap-2r">
      <DashboardNavbar setCurrent={setCurrent} />

      {current === 0 && <DashboardMatches user={user} mentorsProfiles={mentorsProfiles} menteesProfiles={menteesProfiles} />}
      {current === 1 && <ProfileEditable user={user} />}
      {current === 2 &&
        <div className="">
          <Suspense fallback={<div>Loading...</div>}>
            <Chat currentUser={user} allUsers={allUsers} />
          </Suspense>
        </div>
      }
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
    if (typeof user !== 'boolean') {

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
  }
  return {
    redirect: {
      destination: '/',
      permanent: false,
    }
  }

}