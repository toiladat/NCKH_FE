import { Container, Stepper, Step, StepButton, Stack, Button, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import AddDetails from './addDetails/AddDetails'
import AddLocation from './addLocation/AddLocation'
import AddImages from './addImages/AddImages'
import { useValue } from '~/context/ContextProvider'

const AddRoom = () => {
  const { images, details } =useValue()
  const [activeStep, setActiveStep] = useState(0)
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

  useEffect( () => {
    if (images.length) {
      if (!steps[2].completed) setComplete(2, true)
    } else {
      setComplete(2, false)
    }
  }, [images])
  useEffect( () => {
    if (details.title.length > 4 && details.description.length > 9 ) {
      if (!steps[1].completed) setComplete(1, true)
    } else {
      setComplete(1, false)
    }
  }, [details])
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
      <Box>
        {{
          0: <AddLocation/>,
          1: <AddDetails/>,
          2: <AddImages/>
        }[activeStep]}
      </Box>

      {/* Đưa ra step tiếp theo hoặc trước đó */}
      <Stack
        direction={ 'row' }
        sx={{ pt: 2, pb:7, justifyContent:'space-around' }}
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
    </Container>
  )
}


export default AddRoom