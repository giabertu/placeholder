import DashboardProfile from "../../components/DashboardProfileMentor";

import React from 'react'
import { GetServerSideProps } from "next";
import UserApi from "../../services/UserApi";
import ChatEngineApi from "../../services/ChatEngineApi";
import { ChatEngineUser, UserType } from "../../lib/models/User";

export const getServerSideProps: GetServerSideProps = async () => {
  const matches = await UserApi.getAllUsers();
  const allUsers = await Promise.all(matches.map(async (match) => {
    return {
      user: match,
      chatEngineUser: await ChatEngineApi.getChatEngineUser({ username: match.username, secret: match.secret })
    }
  }));
  return {
    props: {
      allUsers
    }
  };
}

function testpage( {allUsers}: {allUsers: {user: UserType, chatEngineUser: ChatEngineUser}[]}) {
  console.log("oh hello there:", allUsers);
  return (
    <DashboardProfile profile={allUsers[0]}/>
  )
}

export default testpage