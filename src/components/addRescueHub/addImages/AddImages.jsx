import { Paper } from '@mui/material'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import ProgressList from './progressList/ProgressList'
import ImagesList from './ImagesList'
import { useValue } from '~/context/ContextProvider'

const AddImages = () => {
  const [files, setfiles] = useState([])

  // onDrop sẽ chạy mỗi khi di chuyển qua Container do đó dùng callback để k tạo nhiều hàm tránh lặp nhiều lần ( call nhiều API vd thế)
  const onDrop = useCallback((acceptedFiles) => {
    setfiles(acceptedFiles)
  }, [])

  //Tạo một vùng kéo và thả hoặc bộ chọn tệp
  // useDropzone như thư viện dnd-kit hỗ trợ kéo thả
  //getRootProps: Cung cấp các thuộc tính cần thiết cho container chứa các phần tử kéo thả.
  //getInputProps: Cung cấp các thuộc tính cần thiết cho phần tử input
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }
  })
  const { images_rescue } = useValue()
  return (
    <>
      <Paper
        sx={{
          cursor: 'pointer',
          background: '#fafafa',
          color: '#bdbdbd',
          border: '1px dashed #ccc',
          '&:hover': {
            border: '1px dashed #ccc'
          }
        }}
      >
        <div style={{ padding: '16px' }} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drop some files here, or click to select files</p>
          )}
        </div>
      </Paper>
      <ProgressList {... { files }}/>
      {!! images_rescue.length && <ImagesList/> }
    </>

  )
}

export default AddImages
