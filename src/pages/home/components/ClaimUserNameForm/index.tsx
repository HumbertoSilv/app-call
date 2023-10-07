import { Button, TextInput } from "@ignite-ui/react"
import { ArrowRight } from "phosphor-react"
import { Form } from "./styles"

const ClaimUserNameForm = () => {
  return (
    <Form as="form">
      <TextInput size="sm" prefix="app.call/" placeholder="your-user" crossOrigin={undefined} />
      <Button size="sm" type="submit">
        Reserve
        <ArrowRight />
      </Button>
    </Form>
  )
}

export default ClaimUserNameForm