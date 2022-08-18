import ColorModeToggle from "./ColorModeToggle";
import QuizCompanyName from "./QuizCompanyName";
import styles from '../styles/components/Navbar.module.css';
import { useColorMode } from "@chakra-ui/react";


export default function Navbar() {
  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <div className={isDark ? styles.containerDarkMode : styles.container}>
      <QuizCompanyName />
      <ColorModeToggle />
    </div>
  )
}
