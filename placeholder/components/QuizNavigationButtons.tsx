import Link from 'next/link';
import { color, useColorMode, useColorModeValue } from '@chakra-ui/react'

function QuizNavigationButtons({ back, next }: { back?: string, next: string }) {

  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <div className='flex-row quiz-nav-buttons-container outline'>
      {back &&
        <div className='quiz-nav-button-container flex-row outline'>
          <Link href={`/${back}`}>
            <button className={isDark ? 'button-style-dark-mode quiz-nav-buttons outline' : 'button-style quiz-nav-buttons outline'}>&lt;&lt;</button>
          </Link>
        </div>
      }
      <div className='quiz-nav-button-container flex-row outline'>
        <Link href={`/${next}`}>
          <button className={isDark ? 'button-style-dark-mode quiz-nav-buttons outline' : 'button-style quiz-nav-buttons outline'}>&gt;&gt;</button>
        </Link>
      </div>
    </div>
  )


}


export default QuizNavigationButtons