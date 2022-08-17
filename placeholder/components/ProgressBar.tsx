import { Progress } from "@chakra-ui/progress";
import { useColorMode } from '@chakra-ui/react';



function ProgressBar({ value }: { value: number }) {
  const {colorMode} = useColorMode();
  const isDark = colorMode === 'dark';


  return (
    <Progress colorScheme={isDark ? "gray" : "blackAlpha"} value={value} />
  )
}

export default ProgressBar;