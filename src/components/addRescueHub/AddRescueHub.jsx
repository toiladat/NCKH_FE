import { Container, Stepper, Step, StepButton, Stack, Button, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import AddDetails from './addDetails/AddDetails'
import AddLocationStart from './addLocationStart/AddLocationStart'
import AddImages from './addImages/AddImages'
import { useDispatch, useSelector } from 'react-redux'
import { Send } from '@mui/icons-material'
import AddLocationEnd from './addLocationEnd/AddLocationEnd'
import { createRescueHubPoint } from '~/actions/rescueHubPoint'
const AddRescueHub = ({ setPage }) => {

  const { images_rescue, details_rescue, location_rescue } = useSelector( state => state.rescueHubPointReducer)
  const { currentUser } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  const [activeStep, setActiveStep] = useState(0)
  const [showSubmit, setShowSubmit]= useState(false)
  const [steps, setSteps] = useState([
    { label: 'Location Start', completed: false },
    { label: 'Location End', completed: false },
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
    const imagesFormat = images_rescue.map(image => image.url)
    const inforRescueHub = {
      location_start: location_rescue.start,
      location_end: location_rescue.end,
      start_time: details_rescue.timeStart,
      end_time:details_rescue.timeEnd,
      description:details_rescue.description,
      images:imagesFormat
    }

    createRescueHubPoint(inforRescueHub, currentUser, dispatch, setPage)
  }

  //check complete step3: upload images
  useEffect( () => {
    if (images_rescue.length) {
      if (!steps[3].completed) setComplete(3, true)
    } else {
      setComplete(3, false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images_rescue])

  //check complete step3: upload details
  useEffect( () => {
    if (details_rescue.description.length > 9 && details_rescue.timeEnd && details_rescue.timeStart) {
      if (!steps[2].completed) setComplete(2, true)
    } else {
      setComplete(2, false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details_rescue])

  //check complete step3: upload location start
  useEffect( () => {
    if (location_rescue.start.lng && location_rescue.start.lat) {
      if (!steps[0].completed) setComplete(0, true)
    }
    else {
      setComplete(0, false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location_rescue])

  //check complete step3: upload location End
  useEffect( () => {
    if (location_rescue.end.lng && location_rescue.end.lat) {
      if (!steps[1].completed) setComplete(1, true)
    }
    else {
      setComplete(1, false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location_rescue])

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
          0: <AddLocationStart/>,
          1: <AddLocationEnd/>,
          2: <AddDetails/>,
          3: <AddImages/>
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


export default AddRescueHub