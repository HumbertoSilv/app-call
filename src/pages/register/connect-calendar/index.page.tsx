import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
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
    await signIn('google')
  }

  const handleNavigateToNextStep = async () => {
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | App Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Conecte seu calendário</Heading>
          <Text>
            Conecte seu calendário para verificar automaticamente horários de pico e novos
            eventos conforme estão programados.
          </Text>

          <MultiStep size={4} currentStep={2} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            {isSignedId ? (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleConnectCalendar}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError size="sm">
              Falha ao conectar ao Google, certifique-se de ter ativado as permissões de acesso ao calendário.
            </AuthError>
          )}

          <Button
            onClick={handleNavigateToNextStep}
            type="submit"
            disabled={!isSignedId}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}

export default ConnectCalendar
