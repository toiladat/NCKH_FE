import { ImageList } from '@mui/material'
import ProgressItem from './ProgressItem'
const ProgressList = ({ files }) => {
  return (
    files && <ImageList
      sx={{ width: '100%' }} cols={3} rowHeight={350}
    >
      {files.map((file, index) => (
        <ProgressItem file={file} key={index} />
      ))}
    </ImageList>
  )
}

export default ProgressList