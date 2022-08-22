import React from 'react';
import {MultiChatWindow, useMultiChatLogic, MultiChatSocket} from 'react-chat-engine-advanced'

const projectId: string = 'd6620cc4-d139-4ed9-85f7-cea40cd73c40'
const username: string = 'calpisching'
const password: string = 'poiuyt321'


function Chat() {
  const chatProps = useMultiChatLogic(projectId, username, password)
  
  
  if (typeof window !== 'undefined') return (
    <div>

    
      
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow {...chatProps} style={{ height: '100vh'}} />

      
     
     
     
    </div>
    

  )
  
}

export default Chat;

