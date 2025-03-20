import { Container, Stepper, Step, StepButton, Stack, Button, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import AddDetails from './addDetails/AddDetails'
import AddLocation from './addLocation/AddLocation'
import AddImages from './addImages/AddImages'
import { Send } from '@mui/icons-material'
import { createNeedHelp } from '~/actions/needHelpPoint'
import { useDispatch, useSelector } from 'react-redux'

const AddNeedHelp = ({ setPage }) => {
  const { currentUser } = useSelector(state => state.userReducer)
  const { images, details, location } = useSelector( state => state.needHelpPointReducer)
  const dispatch = useDispatch()

  const [activeStep, setActiveStep] = useState(0)
  const [showSubmit, setShowSubmit]= useState(false)
  const [steps, setSteps] = useState([
    { label: 'Location', completed: false },
    { label: 'Details', completed: false },
    { label: 'Images', completed: false }
  ])
  const findUnfinish = () => {
    return steps.findIndex(step => !step.completed)
  }
  const checkDisabled = () => {
    if (activeStep < steps.length-1) return false // nếu activeStep lớn hơn số bước thì không disabled
    const index = findUnfinish() // tìm bước chưa hoàn thành
    if (index !== -1) return false
    return true
  }
  const handleNext = () => {
    if ( activeStep< steps.length-1) {
      setActiveStep ( activeStep + 1)
    }
    else {
      const stepIndex = findUnfinish()
      setActiveStep(stepIndex)
    }
  }
  const handleSubmit = () => {
    const imagesFormat = images.map(image => image.url)
    const infoNeedHelp = {
      lng: location?.lng,
      lat: location?.lat,
      price: details.price,
      title: details.title,
      description: details.description,
      images: imagesFormat
    }
    createNeedHelp(infoNeedHelp, currentUser, dispatch, setPage)
  }

  //check complete step3: upload images
  useEffect( () => {
    if (images.length) {
      if (!steps[2].completed) setComplete(2, true)
    } else {
      setComplete(2, false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images])

  //check complete step3: upload details
  useEffect( () => {
    if (details.title.length > 4 && details.description.length > 9 ) {
      if (!steps[1].completed) setComplete(1, true)
    } else {
      setComplete(1, false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details])

  //check complete step3: upload location
  useEffect( () => {
    if (location.lng && location.lat) {
      if (!steps[0].completed) setComplete(0, true)
    }
    else {
      setComplete(0, false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  //check showSubmit
  useEffect( () => {
    if (findUnfinish() === -1) {
      if (!showSubmit) setShowSubmit(true)
    }
    else
      setShowSubmit(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps])

  const setComplete = (index, status) => {
    setSteps( steps => {
      steps[index].completed=status
      return [...steps]
    })
  }
  return (
    <Container sx={{ my: 4 }}>

      {/* Hiển thị các bước */}
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={ activeStep }
        sx={{ mb:3 }}
      >
        { steps.map( (step, index) => (
          <Step key={step.label} completed= {step.completed}>
            <StepButton onClick={ () => setActiveStep(index) }>
              { step.label }
            </StepButton>
          </Step>
        ))}
      </Stepper>

      {/* Hiển thị component tương ứng với step */}
      <Box sx={{ pb:7 }}>
        {{
          0: <AddLocation/>,
          1: <AddDetails/>,
          2: <AddImages/>
        }[activeStep]}

        {/* Đưa ra step tiếp theo hoặc trước đó */}
        <Stack
          direction={ 'row' }
          sx={{ pt: 2, justifyContent:'space-around' }}
        >
          <Button
            color= 'inherit'
            disabled= { !activeStep }
            onClick = { ( ) => setActiveStep( activeStep - 1) }
          >
            Back
          </Button>

          <Button
            disabled = { checkDisabled() }
            onClick={ handleNext }
          >
            Next
          </Button>
        </Stack>
        { showSubmit && (
          <Stack sx={{ alignItems:'center' }}
          >
            <Button
              variant='contained'
              endIcon={<Send/>}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        )}
      </Box>

    </Container>
  )
}


export default AddNeedHelp