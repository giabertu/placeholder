import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Navbar from "../../components/Navbar";
import ProfileEditable from "../../components/ProfileEditable";
import ProfileNotEditable from "../../components/ProfileNotEditable";
import { ChatEngineUser, UserType } from "../../lib/models/User";
import ChatEngineApi from "../../services/ChatEngineApi";
import UserApi from "../../services/UserApi";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Profile({ user, chatEngineUser }: { user: UserType, chatEngineUser: ChatEngineUser }) {

  return (
    <div>
      <div className="profile-main-container flex-column outline align-center">
        <Navbar progressValue={0} prevValue={0}/>
        <ProfileNotEditable user={user} chatEngineUser={chatEngineUser} />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { id } = context.query

  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  if (id && typeof id == 'string') {
    const user = await UserApi.getUserById(id)
    const chatEngineUser = await ChatEngineApi.getChatEngineUser({ username: user.username, secret: user.secret })
    return {
      props: {
        user,
        chatEngineUser
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