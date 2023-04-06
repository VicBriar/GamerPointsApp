import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  TextField,
  CheckboxField,
  DatetimeLocalField,
  Submit,
  DateField,
} from '@redwoodjs/forms'


import type { EditTaskById, UpdateTaskInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

const formatDate = (value: string | void ):string => {
  // if (value) {
  //   return value.replace(/:\d{2}\.\d{3}\w/, '')
  // }
  let date = new Date
  if(value){
    date = new Date(value);
  }
    let ISOdate = date.toISOString();
    let yearMonthDay = ISOdate.substring(0,10);
    let arrayDate = yearMonthDay.split("")
    let day = arrayDate.slice(8,10).join("")
    let month = arrayDate.slice(5,7).join("")
    let year = arrayDate.slice(0,4).join("")
    return `${year}-${month}-${day}`
}

type FormTask = NonNullable<EditTaskById['task']>

interface TaskFormProps {
  task?: EditTaskById['task']
  onSave: (data: UpdateTaskInput, id?: FormTask['id']) => void
  error: RWGqlError
  loading: boolean
}

const TaskForm = (props: TaskFormProps) => {
  console.log(formatDate())

  function onSubmit (data: FormTask) {
    props.onSave(data, props?.task?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormTask> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        {/* <Label
          name="creatorId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Creator id
        </Label>

        <NumberField
          name="creatorId"
          defaultValue={props.task?.creatorId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="creatorId" className="rw-field-error" /> */}

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.task?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        {/* <Label
          name="complete"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Complete
        </Label>

        <CheckboxField
          name="complete"
          defaultChecked={props.task?.complete}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="complete" className="rw-field-error" /> */}

        <Label
          name="value"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Value
        </Label>

        <TextField
          name="value"
          defaultValue={props.task?.value}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="value" className="rw-field-error" />

        <Label
          name="occurence"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Occurence
        </Label>

        <TextField
          name="occurence"
          defaultValue={props.task?.occurence}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="occurence" className="rw-field-error" />

        <Label
          name="startDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start date
        </Label>

        <DateField
          name="startDate"
          defaultValue={formatDate(props.task?.startDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="startDate" className="rw-field-error" />

        <Label
          name="endDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End date
        </Label>

        <DateField
          name="endDate"
          defaultValue={props.task?.endDate ? formatDate(props.task?.endDate) : null}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="endDate" className="rw-field-error" />

        {/* <Label
          name="completedOn"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Completed on
        </Label>

        <DatetimeLocalField
          name="completedOn"
          defaultValue={formatDatetime(props.task?.completedOn)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="completedOn" className="rw-field-error" /> */}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TaskForm
