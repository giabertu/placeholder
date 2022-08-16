import { useState } from "react";
import ProgressBar from "../../../components/ProgressBar";
import QuizCompanyName from "../../../components/QuizCompanyName";
import QuizNavigationButtons from "../../../components/QuizNavigationButtons";



const roles = ['frontend', 'backend', 'full stack', 'mobile', 'game', 'data scientist', 'devops', 'web3']

function Roles() {

  const [choice, setChoice] = useState<string>('___________')

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const eventButton = event.target as HTMLButtonElement;
    const endOfTitle = eventButton.innerText.replace('> ', '');
    setChoice(endOfTitle)
  }



  return (
    <div className="container flex-column outline">
      <QuizCompanyName />
      <div className="question-container flex-column outline">
        <ProgressBar value={25} />
        <div className="title-container flex-row">
          <h1 className='h1'>I am a <span className='h1-span'>{choice}</span> developer</h1>
        </div>
        <div className="input-description-container flex-row">
          <div className="options-container flex-column">
            {roles.map((role: string) =>
              <button className="button-style" onClick={(event) => {
                handleButtonClick(event);
              }}>&gt; {role}</button>
            )}
          </div>
        </div>
      </div>
      <QuizNavigationButtons back='/quiz_init/page1' next="page3" />
    </div >
  )
}

export default Roles;

