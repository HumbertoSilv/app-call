import { Button, Checkbox, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Container, Header } from '../styles'
import { FormError, IntervalBox, IntervalContainer, IntervalDay, IntervalInputs, IntervalItem } from './styles'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDays } from '../../../utils/get-week-days'
import { zodResolver } from '@hookform/resolvers/zod'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number(),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      })
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'You need to select at least one day of the week.'
    })
})

type TimeIntervalFormData = z.infer<typeof timeIntervalsFormSchema>

const TimeInterval = () => {
  const { register, handleSubmit, control, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '08:00', endTime: '18:00', },
        { weekDay: 1, enabled: true, startTime: '08:00', endTime: '18:00', },
        { weekDay: 2, enabled: true, startTime: '08:00', endTime: '18:00', },
        { weekDay: 3, enabled: true, startTime: '08:00', endTime: '18:00', },
        { weekDay: 4, enabled: true, startTime: '08:00', endTime: '18:00', },
        { weekDay: 5, enabled: true, startTime: '08:00', endTime: '18:00', },
        { weekDay: 6, enabled: false, startTime: '08:00', endTime: '18:00', }
      ]
    }
  })

  const { fields } = useFieldArray({
    control,
    name: "intervals"
  })

  const weekDays = getWeekDays()
  const intervals = watch('intervals')

  const handleSetTimeIntervals = (data: TimeIntervalFormData) => {
    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Almost there!</Heading>
        <Text>
          Define the time slot you are available on each day of the week.
        </Text>
        <MultiStep size={4} currentStep={3} />
      </Header>

      <IntervalBox as='form' onSubmit={handleSubmit(handleSetTimeIntervals)}>
        <IntervalContainer>
          {fields.map((field, index) => {
            return (
              <IntervalItem key={field.id}>
                <IntervalDay>
                  <Controller
                    name={`intervals.${index}.enabled`}
                    control={control}
                    render={({ field }) => {
                      return (
                        <Checkbox
                          onCheckedChange={(checked) => {
                            field.onChange(checked === true);
                          }}
                          checked={field.value}
                        />
                      )
                    }}
                  />
                  <Text>{weekDays[field.weekDay]}</Text>
                </IntervalDay>
                <IntervalInputs>
                  <TextInput
                    size='sm'
                    type='time'
                    step={60}
                    crossOrigin={undefined}
                    disabled={!intervals[index].enabled}
                    {...register(`intervals.${field.weekDay}.startTime`)}
                  />
                  <TextInput
                    size='sm'
                    type='time'
                    step={60}
                    crossOrigin={undefined}
                    disabled={!intervals[index].enabled}
                    {...register(`intervals.${field.weekDay}.endTime`)}
                  />
                </IntervalInputs>
              </IntervalItem>
            )
          })}
        </IntervalContainer>

        {errors.intervals && (
          <FormError size="sm">{errors.intervals.root?.message}</FormError>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Next step
          <ArrowRight />
        </Button>
      </IntervalBox>
    </Container>
  )
}

export default TimeInterval
