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
} from '@redwoodjs/forms'

import type { EditTaskById, UpdateTaskInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

type FormTask = NonNullable<EditTaskById['task']>

interface TaskFormProps {
  task?: EditTaskById['task']
  onSave: (data: UpdateTaskInput, id?: FormTask['id']) => void
  error: RWGqlError
  loading: boolean
}

const TaskForm = (props: TaskFormProps) => {
  const onSubmit = (data: FormTask) => {
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

        <Label
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

        <FieldError name="creatorId" className="rw-field-error" />

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

        <Label
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

        <FieldError name="complete" className="rw-field-error" />

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
          name="endDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          End date
        </Label>

        <DatetimeLocalField
          name="endDate"
          defaultValue={formatDatetime(props.task?.endDate)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="endDate" className="rw-field-error" />

        <Label
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

        <FieldError name="completedOn" className="rw-field-error" />

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
