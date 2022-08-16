import Link from 'next/link'

function QuizNavigationButtons({ back, next }: { back?: string, next: string }) {

  return (
    <div className='flex-row quiz-nav-buttons-container'>
      {back &&
        <div className='quiz-nav-button-container flex-row'>
          <Link href={`/${back}`}>
            <button className='button-style quiz-nav-buttons quiz-back-button'>&lt;&lt;</button>
          </Link>
        </div>
      }
      <div className='quiz-nav-button-container flex-row'>
        <Link href={`/${next}`}>
          <button className='button-style quiz-nav-buttons'>&gt;&gt;</button>
        </Link>
      </div>
    </div>
  )


}


export default QuizNavigationButtons