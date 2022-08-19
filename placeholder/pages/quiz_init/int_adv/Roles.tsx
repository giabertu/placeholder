import { useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../../../components/Navbar";
import uniqid from "uniqid";
import ProgressBar from "../../../components/ProgressBar";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";
import { roles } from '../../../utils/constants'
import styles from '../../../styles/roles.module.css'


function Roles() {

  const [choice, setChoice] = useState<string>('_')
  const [currentSelection, setCurrentSelection] = useState<null | number>(null)
  const {colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const eventButton = event.target as HTMLButtonElement;
    const endOfTitle = eventButton.innerText.replace('> ', '');
    setChoice(endOfTitle)
  }



  return (
    <div className="container flex-column" /* onKeyDown={(event: KeyboardEvent<HTMLImageElement>) => handleKeydown(event)} */>
      <Navbar progressValue={60}/>
      <div className="question-container flex-column">
        <div className="title-container flex-row">
          { choice === '_' ?
          <h1 className='h1'> &#62; I am a <span className={styles.underline}> ___</span> developer.</h1> :
          choice === 'data scientist' ?
          <h1 className='h1'> &#62; I am a {choice}.</h1> :
          <h1 className='h1'> &#62; I am a {choice} developer.</h1>}
        </div>
        <div className="input-description-container flex-row">
          <div className="options-container flex-column">
            {roles.map((role: string) =>

              <button key={uniqid()} className={isDark ? 'button-style-dark-mode' : 'button-style'} onClick={(event) => {
                handleButtonClick(event);
              }}>&gt; {role}</button>




            )}
          </div>
        </div>
      </div>
      <QuizNavigationButtons back='/quiz_init/page1' next="quiz_init/int_adv/purpose" />
    </div >
  )
}

export default Roles;

