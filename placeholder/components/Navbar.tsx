import ColorModeToggle from "./ColorModeToggle";
import QuizCompanyName from "./QuizCompanyName";
import styles from '../styles/components/Navbar.module.css';
import { useColorMode } from "@chakra-ui/react";
import ProgressBar from "./ProgressBar";


export default function Navbar({progressValue}: {progressValue: number}) {
  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <div className={styles.flexbox}>
      <div className={isDark ? styles.containerDarkMode : styles.container}>
        <QuizCompanyName />
        <ColorModeToggle />
      </div>
      <ProgressBar value={progressValue}/>
    </div>
  )
}
