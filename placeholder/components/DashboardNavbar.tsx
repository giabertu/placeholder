import ColorModeToggle from "./ColorModeToggle";
import QuizCompanyName from "./QuizCompanyName";
import styles from '../styles/components/Navbar.module.css';
import { useColorMode } from "@chakra-ui/react";
import ProgressBar from "./ProgressBar";
import { useAppDispatch } from "../redux/hooks";
import { setDarkMode } from "../redux/slices/darkModeSlice";
import { MessageFilled, MessageOutlined } from "@ant-design/icons";


export default function DashboardNavbar({ progressValue, prevValue, onClick }: { progressValue?: number , prevValue?: number, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void}) {

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
        <MessageOutlined style={{fontSize: '23px'}} onClick={(event) => {
            onClick?.(event);
        }}/>
        <ColorModeToggle />
      </div>
      {progressValue && prevValue ? <ProgressBar value={progressValue} prevValue={prevValue} /> : isDark ? <div className={styles.borderDivDarkMode} /> : <div className={styles.borderDiv} />}
    </div>
  )
}