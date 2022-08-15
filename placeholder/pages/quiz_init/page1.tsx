import React, {useState} from 'react';
import ProgressBar from '../../components/ProgressBar';
import QuizCompanyName from '../../components/QuizCompanyName';



export default function Page1() {
  const [level, setLevel] = useState('')
  

  function handleLevel(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(e.currentTarget.value)
    setLevel(e.currentTarget.value);
    
  }


  return (
    <div className='page1-container'>
      <QuizCompanyName />
      <div className='question-container'>
        <ProgressBar value={10} />
        <div className='title'>
          {level === '' &&
            <h1> > I am a ...... developer</h1>
          }
          {level === 'beginner' && 
            <h1> > I am a {level} developer.</h1>
          }

          {level === `senior` &&
            <h1> > I am a {level} developer. </h1>
          } 

          {level === 'intermediate' &&
            <h1> > I am an {level} developer.</h1>
          }
        </div>
        
        <div className='options'>
          <button className='level-btn' value='beginner' onClick={handleLevel}> {`>`} beginner </button>
          <button className='level-btn' value='intermediate' onClick={handleLevel}> {`>`} intermediate</button>
          <button className='level-btn' value='senior' onClick={handleLevel}> {`>`} senior</button>
        </div>

        <div className='description-container'>
          
          {level === 'beginner' && 
            <h1 className='description'>A beginner developer would have bla bla bla qualities.</h1>
          }
          {level === 'intermediate' &&
            <h1 className='description'>An intermediate developer would have bla bla bla qualities.</h1>
          }

          {level === 'senior' &&
            <h1 className='description'>A senior developer would have bla bla bla qualities.</h1>
          }


        </div>

      </div>
     
      
       
      
      
      

    </div>
  
  )
}