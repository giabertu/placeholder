
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changePurpose } from '../redux/slices/userInfoSlice';
import QuestionnaireButton2 from './QuestionnaireButton2';

function Purpose({ choices }: { choices: string[] }) {

  const dispatch = useAppDispatch();
  const selectedPurpose = useAppSelector((state) => state.userInfo.purpose);

  const isDark = useAppSelector(state => state.darkMode)

  function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const eventButton = event.target as HTMLButtonElement;
    const buttonText = eventButton.innerText.replace('> ', '');
    console.log(buttonText);
    dispatch(changePurpose(buttonText));
  }

  const generateTitle = function () {
    if (!selectedPurpose) {
      return (
        <h1 className='title'> &#62; I am here to <span className="underline">____</span>.</h1>
      )
    }
    return <h1 className='title'> &#62; I am here to {selectedPurpose}.</h1>
  }

  return (
    <div className="form-container-choices-list-no-description">
      {generateTitle()}
      <div className="choices-container-choices-list-no-description-spaced">
        {choices.map((text: string) =>
          <QuestionnaireButton2
            key={text}
            text={text}
            value={text}
            onClick={(event) => handleButtonClick(event)}
            selected={selectedPurpose === text}
          />
        )}
      </div>
    </div>
  )
}

export default Purpose;