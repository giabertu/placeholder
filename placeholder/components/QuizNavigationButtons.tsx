import Link from 'next/link';
import {color, useColorMode, useColorModeValue} from '@chakra-ui/react'

function QuizNavigationButtons({ back, next }: { back?: string, next: string }) {

  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <div className='flex-row quiz-nav-buttons-container'>
      {back &&
        <div className='quiz-nav-button-container flex-row'>
          <Link href={`/${back}`}>
            <button className={isDark ? 'button-style-dark-mode quiz-nav-buttons' : 'button-style quiz-nav-buttons'}>&lt;&lt;</button>
          </Link>
        </div>
      }
      <div className='quiz-nav-button-container flex-row'>
        <Link href={`/${next}`}>
          <button className={isDark ? 'button-style-dark-mode quiz-nav-buttons' : 'button-style quiz-nav-buttons'}>&gt;&gt;</button>
        </Link>
      </div>
    </div>
  )


}


export default QuizNavigationButtons