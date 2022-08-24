import Link from 'next/link';
import {useColorMode} from '@chakra-ui/react'

function QuizNavigationButtons({ back, next, canProceed }: { back?: string, next: string, canProceed: boolean }) {

  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <div className='flex-row quiz-nav-buttons-container'>
      {back &&
        <div className='quiz-nav-button-container flex-row'>
          <Link href={`/${back}`}>
            <button className={isDark ? 'nav-button-style-dark-mode quiz-back-nav-buttons' : 'nav-button-style quiz-back-nav-buttons'}>&lt;&lt;</button>
          </Link>
        </div>
      }
      <div className='quiz-nav-button-container flex-row'>
        <Link href={`/${next}`}>
          <button disabled={!canProceed} className={isDark ? 'nav-button-style-dark-mode quiz-next-nav-buttons' : 'nav-button-style quiz-next-nav-buttons'}>&gt;&gt;</button>
        </Link>
      </div>
    </div>
  )

}

//nav button style used to share styling w global button style

export default QuizNavigationButtons