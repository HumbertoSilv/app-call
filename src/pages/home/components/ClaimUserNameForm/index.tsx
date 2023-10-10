import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Text, TextInput } from "@ignite-ui/react"
import { useRouter } from "next/router"
import { ArrowRight } from "phosphor-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormAnnotation } from "./styles"

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Min. 3 characters." })
    .regex(/^([a-z\\-]+)$/i, { message: "Just letters and hyphen." })
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

const ClaimUserNameForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema)
  })

  const router = useRouter()

  const claimUsernameForm = async (data: ClaimUsernameFormData) => {
    await router.push({ pathname: '/register', query: data })
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(claimUsernameForm)}>
        <TextInput size="sm" prefix="app.call/" placeholder="your-username" crossOrigin={undefined} {...register('username')} />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reserve
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text size="sm">
          {errors.username ? errors.username.message : "Enter the username..."}
        </Text>
      </FormAnnotation>
    </>
  )
}

export default ClaimUserNameForm