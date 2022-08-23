import { color, useColorMode } from '@chakra-ui/react';
import React from 'react';
import {MultiChatWindow, useMultiChatLogic, MultiChatSocket, ChatForm, MessageForm, ChatList, MessageList, ChatSettings} from 'react-chat-engine-advanced'
import Navbar from '../../components/Navbar';
import styles from '../../styles/chat.module.css'


const projectId: string = 'd6620cc4-d139-4ed9-85f7-cea40cd73c40'
const username: string = 'calpisching'
const password: string = 'poiuyt321'
 


function Chat() {
  const chatProps = useMultiChatLogic(projectId, username, password)
  // const {colorMode} = useColorMode();
  // const isDark = colorMode === 'dark';
  
  
  if (typeof window !== 'undefined') return (
    <div className={styles.container}>
      <Navbar progressValue={0}/>

    <div className={styles.chatContainer}>
    <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps}

      style={{ 
        height: '80vh',
        width: '80vw',
        fontFamily: 'monospace',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.19)'
        // boxShadow: '0 10px 40px 0 rgba(0,0,0,.2)'
       
      }}

    


      
      
     
      

         />

    </div>
      
     
    
      
      
     
     
     
    </div>
    

  )
  
}

export default Chat;

