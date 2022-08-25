import ColorModeToggle from "./ColorModeToggle";
import QuizCompanyName from "./QuizCompanyName";
import styles from '../styles/components/Navbar.module.css';
import { useColorMode } from "@chakra-ui/react";
import ProgressBar from "./ProgressBar";
import { useAppDispatch } from "../redux/hooks";
import { setDarkMode } from "../redux/slices/darkModeSlice";
import { MessageFilled, MessageOutlined } from "@ant-design/icons";
import { IoLogOutOutline, IoPeopleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";


export default function DashboardNavbar({ progressValue, prevValue, onClick }: { progressValue?: number, prevValue?: number, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void }) {

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
        <IoPeopleSharp style={{fontSize: '25px', position: 'fixed', marginTop: '0.47rem', right: '16.8rem'}} onClick={onClick}/>
        <CgProfile style={{fontSize: '25px', position: 'fixed', marginTop: '0.47rem', right: '13rem'}} onClick={onClick}/>
        <MessageOutlined style={{ fontSize: '23px' }} onClick={onClick}/>
        <IoLogOutOutline style={{fontSize: '30px', marginTop: '0.35rem', position: 'fixed', right: '5.5rem'}} onClick={onClick}/>

        <ColorModeToggle />
      </div>
      {progressValue && prevValue ? <ProgressBar value={progressValue} prevValue={prevValue} /> : isDark ? <div className={styles.borderDivDarkMode} /> : <div className={styles.borderDiv} />}
    </div>
  )
}