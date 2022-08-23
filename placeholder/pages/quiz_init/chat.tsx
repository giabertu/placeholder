import { current } from '@reduxjs/toolkit';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import React from 'react';
import { MultiChatWindow, useMultiChatLogic, MultiChatSocket, ChatForm, MessageForm } from 'react-chat-engine-advanced'
import { UserType } from '../../lib/models/User';
import UserApi from '../../services/UserApi';
import { authOptions } from '../api/auth/[...nextauth]';

const projectId: string = 'd6620cc4-d139-4ed9-85f7-cea40cd73c40'
const username: string = 'calpisching'
const password: string = 'poiuyt321'



function Chat({ currentUser, allUsers }: { allUsers: UserType[], currentUser: UserType }) {

  function getUsernames() {
    return allUsers.map(user => user.username)
  }

  function getPasswords() {
    return allUsers.map(user => user.secret)
  }

  const chatProps = useMultiChatLogic(projectId, currentUser.username, currentUser.secret)


  if (typeof window !== 'undefined') return (
    <div>



      <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps}

        style={{
          height: '100vh',
          fontFamily: 'monospace'

        }}

      //   renderChatForm={() => (
      //     <ChatForm
      //       buttonStyle={{
      //         border: '1.5px solid black',
      //         borderRadius: '0px',
      //         color: 'black',
      //       }}
      //       titleStyle={{
      //         fontFamily: 'monospace'
      //       }} />
      //   )}
      />

    </div>
  )



}

export default Chat;


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
    const currentUser = await UserApi.getOneUser(session.user?.email)
    const allUsers = await UserApi.getAllUsers();
    return {
      props: {
        currentUser,
        allUsers,
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

