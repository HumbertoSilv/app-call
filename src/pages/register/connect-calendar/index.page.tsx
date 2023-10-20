import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'
import { Container, Header } from '../styles'
import { ConnectBox, ConnectItem } from './styles'

const Register = () => {
  // const router = useRouter()

  // const handleRegister = async (data) => { }

  return (
    <Container>
      <Header>
        <Heading as="strong">Connect your calendar!</Heading>
        <Text>
          Connect your calendar to automatically check busy hours and new events
          as they are scheduled.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          <Button
            variant="secondary"
            size="sm"
            // type="button"
            onClick={(e) => {
              e.preventDefault()
              signIn('google')
            }}
          >
            Connect
            <ArrowRight />
          </Button>
        </ConnectItem>

        <Button type="submit">
          Next step
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}

export default Register
