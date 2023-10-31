import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'

const ConnectCalendar = () => {
  const router = useRouter()
  const session = useSession()

  const hasAuthError = !!router.query.error
  const isSignedId = session.status === 'authenticated'

  const handleConnectCalendar = async () => {
    // e.preventDefault()
    await signIn('google')
  }

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
          {isSignedId ? (
            <Button size="sm" disabled>
              Connected
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Connect
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Failed to connect to Google, make sure you have enabled the Google
            Calendar access permissions.
          </AuthError>
        )}

        <Button type="submit" disabled={!isSignedId}>
          Next step
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}

export default ConnectCalendar
