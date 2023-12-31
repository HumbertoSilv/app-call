import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../lib/axios'
import { Container, Form, FormError, Header } from './styles'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Min. 3 caracteres.' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Apenas letras e hífen.' })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, { message: 'Min. 3 caracteres.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await api.post('/users', data)

      await router.push('/register/connect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        return alert(error.response.data.message)
      }
      console.error(error)
    }
  }

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  return (
    <>
      <NextSeo title="Crie uma conta | App Call" />
      <Container>
        <Header>
          <Heading as="strong">Bem vindo ao App Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você pode editar
            estas informações mais tarde.
          </Text>

          <MultiStep size={4} currentStep={1} />
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome de usuário</Text>
            <TextInput
              prefix="app.call/"
              placeholder="seu-usuário"
              crossOrigin={undefined}
              {...register('username')}
            />

            {errors.username && (
              <FormError size="sm">{errors.username.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Nome completo</Text>
            <TextInput
              placeholder="seu nome"
              crossOrigin={undefined}
              {...register('name')}
            />

            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>

          <Button disabled={isSubmitting} type="submit">
            Próximo passo
            <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default Register
