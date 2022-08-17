import React, {useState} from 'react'

export default function ReusableButton({ option, value, onClick}: {option: string, value: string, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void}) {

  const [selected, setSelected] = useState(false)

  return (
    <div>
      <button className={selected ? styles.selected : styles.button} value={value} onClick={(event) => {
          onClick(event);
          setSelected(!selected);
        }}>
          {'>'}{option}

      </button>
    </div>
  )
}