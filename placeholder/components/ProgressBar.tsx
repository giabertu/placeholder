import { Progress } from "@chakra-ui/progress";


function ProgressBar({ value }: { value: number }) {
  return (
    <Progress colorScheme={'blackAlpha'} value={value} />
  )
}

export default ProgressBar;