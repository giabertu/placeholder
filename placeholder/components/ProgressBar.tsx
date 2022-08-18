import { Progress } from "@chakra-ui/progress";
import { useColorMode } from '@chakra-ui/react';
import styles from "../styles/Components/ProgressBar.module.css";


function ProgressBar({ value }: { value: number }) {
  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';


  return (

    <Progress className={styles.bar} colorScheme={isDark ? "gray" : "blackAlpha"} value={value} />


  )
}

export default ProgressBar;