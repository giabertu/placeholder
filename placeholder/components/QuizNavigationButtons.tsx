import Link from 'next/link';
import {useColorMode} from '@chakra-ui/react'
import {useRouter} from 'next/router'

function QuizNavigationButtons({  next, canProceed , progressValue}: {  next: string, canProceed: boolean, progressValue: number }) {

  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const router = useRouter()

  return (
    <div className='flex-row quiz-nav-buttons-container'>
      {/* {back && */}
        <div className='quiz-nav-button-container flex-row'>
          {/* <Link href={`/${back}`}> */}
            <button className={isDark ? 'nav-button-style-dark-mode quiz-back-nav-buttons' : 'nav-button-style quiz-back-nav-buttons'} onClick={() => router.back()}>&lt;&lt;</button>
          {/* </Link> */}
        </div>
      
      <div className='quiz-nav-button-container flex-row'>
        <Link href={{
          pathname: `/${next}`,
          query: '' + progressValue ,
        }}>
          <button disabled={!canProceed} className={isDark ? 'nav-button-style-dark-mode quiz-next-nav-buttons' : 'nav-button-style quiz-next-nav-buttons'}>&gt;&gt;</button>
        </Link>
      </div>
    </div>
  )

}
//passing params to link 


//nav button style used to share styling w global button style

export default QuizNavigationButtons