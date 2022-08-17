import { Progress } from "@chakra-ui/progress";
import styles from "../styles/Components/ProgressBar.module.css";


function ProgressBar({ value }: { value: number }) {
  return (
    // <Progress colorScheme={'blackAlpha'} value={value} />
    <Progress className={styles.bar} colorScheme={'blackAlpha'} size="sm" isIndeterminate />
  )
}

export default ProgressBar;