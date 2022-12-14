import { MultiChatWindow, useMultiChatLogic, MultiChatSocket, ChatCardProps, ChatHeaderProps, PeopleSettings } from 'react-chat-engine-advanced'

import Navbar from './Navbar';
import styles from '../styles/chat.module.css'
import { current } from '@reduxjs/toolkit';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import React from 'react';

import { UserType } from '../lib/models/User';
import UserApi from '../services/UserApi';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import CustomChatCard from './ChatCard';
import UserSearch from './UserSearch';
import ChatHeader from './ChatHeader';
import MatchesList from './ChatForm';



const projectId: string = 'd6620cc4-d139-4ed9-85f7-cea40cd73c40'



function Chat({ currentUser, allUsers }: { allUsers: UserType[], currentUser: UserType }) {

  function getUsernames() {
    return allUsers.map(user => user.username)
  }

  function getPasswords() {
    return allUsers.map(user => user.secret)
  }



  const chatProps = useMultiChatLogic(projectId, currentUser.username, currentUser.secret)


  if (typeof window !== 'undefined') return (
    <div className={styles.chatContainer} >
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps}

        style={{
          height: '80vh',
          width: '80vw',
          fontFamily: 'arial',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.19)',
          backgroundColor: 'white'
        }}

        renderChatForm={() => (
          <MatchesList />
        )}


        renderChatCard={(props: ChatCardProps) => (
          <CustomChatCard
            {...props}
            allUsers={allUsers}
            username={chatProps.username}
            onChatCardClick={chatProps.onChatCardClick}
            isActive={
              props.chat !== undefined &&
              chatProps.activeChatId === props.chat.id
            }
            chat={props.chat}
          />
        )}

        renderChatHeader={(props: ChatHeaderProps) => (
          <ChatHeader
            {...props}
            chat={chatProps.chat}
            username={chatProps.username}
            secret={chatProps.secret}

          />
        )}

        renderPeopleSettings={() => (
          <div></div>
        )}

      />


    </div>
  )
  return (
    <div className='flex-column justify-center align-center'>
      <h1>Loading...</h1>
    </div>
  )



}

export default Chat;


// export const getServerSideProps: GetServerSideProps = async (context) => {

//   const session = await unstable_getServerSession(context.req, context.res, authOptions)

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }

//   if (session && session.user && session.user.email) {
//     const currentUser = await UserApi.getOneUser(session.user?.email)
//     const allUsers = await UserApi.getAllUsers();
//     return {
//       props: {
//         currentUser,
//         allUsers,
//       }
//     }
//   } else {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       }
//     }
//   }
// }

