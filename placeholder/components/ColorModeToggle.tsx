import React from 'react';
import { IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAppDispatch } from '../redux/hooks';
import { toggleDarkMode } from '../redux/slices/darkModeSlice';


export default function ColorModeToggle() {

  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const dispatch = useAppDispatch();

  return (

    <IconButton
      _hover={{ bg: 'transparent' }}

      icon={colorMode === 'light' ? <MoonIcon width='1.5rem' height='1.5rem' /> : <SunIcon width='1.5rem' height='1.5rem' />}
      variant='ghost'
      onClick={() => {
        dispatch(toggleDarkMode('toggle!'))
        toggleColorMode()
      }} aria-label={''} />







  )
}