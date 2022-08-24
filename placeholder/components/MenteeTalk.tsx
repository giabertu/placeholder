import { useState } from 'react';



import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changeDesiredCategory } from '../redux/slices/menteePreferencesSlice';
import QuestionnaireButton2 from './QuestionnaireButton2';


function MenteeTalk({ choices, descriptions }: { choices: string[], descriptions: string[] }) {

  const dispatch = useAppDispatch();

  const menteeChoices = useAppSelector((state) => state.menteePreferences.desiredCategories);

  const [currentSelection, setCurrentSelection] = useState<number | null>(null)
  const isDark = useAppSelector(state => state.darkMode)

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const eventButton = event.target as HTMLButtonElement;
    const buttonText = eventButton.innerText.replace('> ', '');
    dispatch(changeDesiredCategory(buttonText));
  }

  function getStringifiedArray() {
    return JSON.stringify(menteeChoices).replace(/,/g, ', ');
  }

  return (
    <div className="form-container flex-column">
      <h1 className='title'> I'd like to help my mentee {menteeChoices.length ? getStringifiedArray() : <span className="underline">_______</span>}</h1>
      <h2 className='subtitle'>Choose all that apply</h2>
      <div className="options-container flex-row">
        <div className="choices-container flex-column">
          {choices.map((text: string, index: number) =>
              <QuestionnaireButton2
                key={text}
                text={text}
                value={text}
                onClick={(event) => handleButtonClick(event)}
                onMouseEnter={() => setCurrentSelection(index)}
                onMouseLeave={() => setCurrentSelection(null)}
                selected={menteeChoices.includes(text)}
              />
              )}
        </div>
        {currentSelection == null ||
          <div className={isDark ? "descriptions-container-dark-mode" : "descriptions-container"}>
            <p className="info-tag">{descriptions[currentSelection]}</p>
          </div>}
      </div>
    </div>
  )
}

export default MenteeTalk;
