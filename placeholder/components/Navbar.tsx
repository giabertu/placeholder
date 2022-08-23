import ColorModeToggle from "./ColorModeToggle";
import QuizCompanyName from "./QuizCompanyName";
import styles from '../styles/components/Navbar.module.css';
import { useColorMode } from "@chakra-ui/react";
import ProgressBar from "./ProgressBar";


export default function Navbar({ progressValue }: {progressValue?: number}) {
  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <div className={isDark? styles.flexboxDarkMode : styles.flexbox}>
      <div className={styles.container}>
        <QuizCompanyName />
        <ColorModeToggle />
      </div>
      {progressValue ? <ProgressBar value={progressValue}/> : isDark ? <div className={styles.borderDivDarkMode}/> : <div className={styles.borderDiv}/>}
    </div>
  )
}
