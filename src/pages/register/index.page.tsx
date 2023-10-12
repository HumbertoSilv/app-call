import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react"
import { AxiosError } from "axios"
import { useRouter } from "next/router"
import { ArrowRight } from "phosphor-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { api } from "../../lib/axios"
import { Container, Form, FormError, Header } from "./styles"

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Min. 3 characters." })
    .regex(/^([a-z\\-]+)$/i, { message: "Just letters and hyphen." })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, { message: "Min. 3 characters." })
})

type RegisterFormData = z.infer<typeof registerFormSchema>

const Register = () => {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema)
  })

  const router = useRouter()

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await api.post('/users', data)

      router.push('/register/connect-calendar')
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        return alert(error.response.data.message)
      }
      console.error(error);
    }
  }

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  return (
    <Container>
      <Header>
        <Heading as="strong">Welcome to App Call!</Heading>
        <Text>
          We need some information to create your profile! Ah, you can edit this information later.
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Username</Text>
          <TextInput
            prefix="app.call/"
            placeholder="your-username"
            crossOrigin={undefined}
            {...register('username')}
          />

          {errors.username && (<FormError size='sm'>{errors.username.message}</FormError>)}
        </label>

        <label>
          <Text size="sm">Full name</Text>
          <TextInput
            placeholder="your name"
            crossOrigin={undefined}
            {...register('name')}
          />

          {errors.name && (<FormError size='sm'>{errors.name.message}</FormError>)}
        </label>

        <Button disabled={isSubmitting} type="submit">
          Next step
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}

export default Register