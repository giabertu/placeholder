
import { color, useColorMode } from '@chakra-ui/react';

import {MultiChatWindow, useMultiChatLogic, MultiChatSocket, ChatCard, ChatCardProps, ChatHeaderProps} from 'react-chat-engine-advanced'
import Navbar from '../../components/Navbar';
import styles from '../../styles/chat.module.css'
import { current } from '@reduxjs/toolkit';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import React from 'react';

import { UserType } from '../../lib/models/User';
import UserApi from '../../services/UserApi';
import { authOptions } from '../api/auth/[...nextauth]';
import CustomChatCard from '../../components/ChatCard';
import UserSearch from '../../components/UserSearch';
import ChatHeader from '../../components/ChatHeader'


const projectId: string = 'd6620cc4-d139-4ed9-85f7-cea40cd73c40'
// const username: string = 'calpisching'
// const password: string = 'poiuyt321'



function Chat({ currentUser, allUsers }: { allUsers: UserType[], currentUser: UserType }) {

  function getUsernames() {
    return allUsers.map(user => user.username)
  }

  function getPasswords() {
    return allUsers.map(user => user.secret)
  }

  

  const chatProps = useMultiChatLogic(projectId, currentUser.username, currentUser.secret, )


  if (typeof window !== 'undefined') return (
    <div className={styles.container}>
      <Navbar progressValue={0}/>

    <div className={styles.chatContainer} >
    <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps}

      style={{ 
        height: '80vh',
        width: '80vw',
        fontFamily: 'monospace',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.19)'
        // boxShadow: '0 10px 40px 0 rgba(0,0,0,.2)'
       
      }}

      renderChatForm={() => (
        <UserSearch
          username={chatProps.username}
          secret={chatProps.secret}
          onSelect={(chatId: number) =>
            chatProps.onChatCardClick(chatId)
          }
        />
      )}

      renderChatCard={(props: ChatCardProps) => (
        <CustomChatCard 
        {...props}
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

      
      />
     
    </div>
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

