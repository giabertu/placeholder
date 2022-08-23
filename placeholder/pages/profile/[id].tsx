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

  /*   async function getUsers() {
      const users = await UserApi.getAllUsers();
      console.log(users);
    }
    g etUsers(); */

  return (
    <div>
      <div className="profile-main-container flex-column outline align-center">
        <Navbar progressValue={0} />

        {/* MAKE IT TO A NON EDITABLE PROFILE, SO SWITCH THE INPUTS WITH P TAGS AND REMOVE EDIT/SAVE INFO BUTTON*/}
        {/* <ProfileEditable user={user} /> */}
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