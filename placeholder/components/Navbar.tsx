import ColorModeToggle from "./ColorModeToggle";
import QuizCompanyName from "./QuizCompanyName";
import styles from '../styles/components/Navbar.module.css';
import { useColorMode } from "@chakra-ui/react";
import ProgressBar from "./ProgressBar";
import { useAppDispatch } from "../redux/hooks";
import { setDarkMode } from "../redux/slices/darkModeSlice";


export default function Navbar({ progressValue, prevValue }: { progressValue?: number , prevValue: number}) {

  if (typeof window !== 'undefined') {
    const item = localStorage.getItem('chakra-ui-color-mode');
    const isDarkActive = item === 'dark' ? true : false;
    const dispatch = useAppDispatch();
    dispatch(setDarkMode(isDarkActive))

  }
  const { colorMode } = useColorMode();

  const isDark = colorMode === 'dark';



  return (
    <div className={isDark ? styles.flexboxDarkMode : styles.flexbox}>
      <div className={styles.container}>
        <QuizCompanyName />
        <ColorModeToggle />
      </div>
      {progressValue ? <ProgressBar value={progressValue} prevValue={prevValue} /> : isDark ? <div className={styles.borderDivDarkMode} /> : <div className={styles.borderDiv} />}
    </div>
  )
}
