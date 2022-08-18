import { Progress } from "@chakra-ui/progress";
<<<<<<< HEAD
import { useColorMode } from '@chakra-ui/react';


=======
import styles from "../styles/Components/ProgressBar.module.css";
>>>>>>> c4d8ae0453a9247349e18bb4a735392fc073a2c5

function ProgressBar({ value }: { value: number }) {
  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';


  return (
<<<<<<< HEAD
    <Progress colorScheme={isDark ? "gray" : "blackAlpha"} value={value} />
=======
    <Progress className={styles.bar} colorScheme={'blackAlpha'} size="sm" value={value} />
    // <Progress className={styles.bar} colorScheme={'blackAlpha'} size="sm" isIndeterminate />
>>>>>>> c4d8ae0453a9247349e18bb4a735392fc073a2c5
  )
}

export default ProgressBar;