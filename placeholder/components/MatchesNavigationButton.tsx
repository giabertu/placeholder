import { Icon, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react"
import { AiOutlineArrowRight } from "react-icons/ai"

import styles from "../styles/Components/QuestionnaireButton.module.css";


function MatchesNavigationButton({ onClick, href, text, onMouseEnter, onMouseLeave }: {
  onClick: any, href: string, text: string, onMouseEnter?: () => void, onMouseLeave?: () => void
}) {

  const [selected, setSelected] = useState(false);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <div className="matches-navigation-button-container">
      <Link href={href}>
        <button
          onClick={onClick}
          className={`${selected ? styles.buttonSelected : styles.button}
          ${isDark ? styles.buttonStyleDarkMode : styles.buttonStyle}`}

          style = {{ display: "flex", alignItems: "center", gap: "0.3rem", border: isDark ? "solid 2px white" : "solid 2px black"}}

          onMouseEnter={() => {
            onMouseEnter && onMouseEnter()

          }}

          onMouseLeave={() => {
            onMouseLeave && onMouseLeave()
          }}
        >
          <span>{text}</span> <Icon as={AiOutlineArrowRight}></Icon>
        </button>
      </Link>
    </div>

  )
}

export default MatchesNavigationButton;