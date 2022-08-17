import ColorModeToggle from "./ColorModeToggle";
import QuizCompanyName from "./QuizCompanyName";
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  return (
    <div className={styles.container}>
      <QuizCompanyName />
      <ColorModeToggle />
    </div>
  )
}
