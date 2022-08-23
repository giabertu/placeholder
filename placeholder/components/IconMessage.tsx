import React from 'react'
import { EmailIcon, EditIcon } from '@chakra-ui/icons'
import { ComponentWithAs, IconProps, useColorMode } from '@chakra-ui/react'



// export default function IconMessage({icon, message1, message2}: {icon: ComponentWithAs<"svg", IconProps>, message1: string, message2: string }) {
function IconMessage({icon, message1, message2}: {icon: string, message1: string, message2: string }) {

    const {colorMode} = useColorMode();
    const isDark = colorMode === 'dark';

  return (
    <div className='icon-message-container'>
      <div className={isDark ?'icon-message-sub-container-dark' : 'icon-message-sub-container'}>
        {icon === "message" ? <EmailIcon w={8} h={8}/> : <EditIcon w={8} h={8}/>}
        <p className='icon-message-text'>{message1}</p>
      </div>
      <p className='icon-message-text'>{message2}</p>
    </div>
  );
};

export default IconMessage