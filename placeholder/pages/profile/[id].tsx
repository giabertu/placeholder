import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import Navbar from "../../components/Navbar";
import ProfileEditable from "../../components/ProfileEditable";
import { UserType } from "../../lib/models/User";
import UserApi from "../../services/UserApi";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Profile({ user }: { user: UserType }) {

  async function getUsers() {
    const users = await UserApi.getAllUsers();
    console.log(users);
  }
  getUsers();

  return (
    <div>
      <div className="profile-main-container flex-column outline align-center">
        <Navbar progressValue={0} />

        {/* MAKE IT TO A NON EDITABLE PROFILE, SO SWITCH THE INPUTS WITH P TAGS AND REMOVE EDIT/SAVE INFO BUTTON*/}
        <ProfileEditable user={user} />
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