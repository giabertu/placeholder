import { useColorMode } from '@chakra-ui/react'
import uniqid from 'uniqid';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changePurpose } from '../redux/slices/userInfoSlice';
import QuestionnaireButton from './QuestionnaireButton';

function Purpose({ choices }: { choices: string[] }) {

  const dispatch = useAppDispatch();
  const selectedPurpose = useAppSelector((state) => state.userInfo.purpose);

  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

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
            <QuestionnaireButton
              key={uniqid()}
              text={text}
              value={text}
              onClick={(event) => handleButtonClick(event)}
            />
          )}
        </div>
    </div>
  )
}

export default Purpose;