import { Icon, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react"
import { AiOutlineArrowRight } from "react-icons/ai"
import { useAppSelector } from "../redux/hooks";
import UserApi from "../services/UserApi";

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

          style={(isDark && selected) ? { border: 'solid 2px white' } : isDark ? { borderStyle: 'solid 2px white' } : {}}

          onMouseEnter={() => {
            onMouseEnter && onMouseEnter()

          }}

          onMouseLeave={() => {
            onMouseLeave && onMouseLeave()
          }}
        >
          {text} <Icon as={AiOutlineArrowRight}></Icon>
        </button>
      </Link>
    </div>

  )
}

export default MatchesNavigationButton;