import React from 'react';
import {IconButton, useColorMode} from '@chakra-ui/react';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';






export default function ColorModeToggle() {

  const {colorMode, toggleColorMode } = useColorMode();
  
  return (
    
    <IconButton
        _hover={{bg: 'transparent'}}
        
        icon={colorMode === 'light' ? <MoonIcon width='1.5rem' height='1.5rem' /> : <SunIcon width='1.5rem' height='1.5rem' />}
        variant='ghost'
        onClick={toggleColorMode} aria-label={''} />

    
        
      
     
    
  
  )
}