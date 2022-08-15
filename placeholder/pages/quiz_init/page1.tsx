import React, {useState} from 'react'


export default function Page1() {
  const [level, setLevel] = useState('')
  

  function handleLevel(e: React.MouseEvent<HTMLButtonElement>) {
    console.log(e.currentTarget.value)
    setLevel(e.currentTarget.value);
    
  }

  return (
    <div className='page1-container'>

      <div className='question'>
        {level === '' &&
          <h1>I am a ...... developer</h1>
        }
        {level === 'beginner' && 
          <h1>I am a {level} developer.</h1>
        }

        {level === `senior` &&
          <h1>I am a {level} developer. </h1>
        } 

        {level === 'intermediate' &&
          <h1> I am an {level} developer.</h1>
        }
      </div>
      
      <div className='options'>
        <button value='beginner' onClick={handleLevel}> {`>`} beginner </button>
        <button value='intermediate' onClick={handleLevel}> {`>`}intermediate</button>
        <button value='senior' onClick={handleLevel}> {`>`} senior</button>
      </div>

      <div className='description-container'>
        {level === 'beginner' && 
          <h1>A beginner developer would have bla bla bla qualities.</h1>
        }
        {level === 'intermediate' &&
          <h1>An intermediate developer would have bla bla bla qualities.</h1>
        }

        {level === 'senior' &&
          <h1>A senior developer would have bla bla bla qualities.</h1>
        }


      </div>
      
       
      
      
      

    </div>
  
  )
}