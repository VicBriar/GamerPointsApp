import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  SelectField,
  Submit,
  DateField,
  InputFieldProps,
} from '@redwoodjs/forms'
import { useCallback, useState } from 'react'
import Occurence from 'src/occurence'
import { OccurenceEnumType } from 'src/occurence'
import type { EditTaskById, Redwood, UpdateTaskInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import Task from '../Task/Task'



export const formatDate = (value: string | void ):string => {
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
interface taskData {
  description: string;
  value: number;
  occurence: string;
  startDate: string;
  endDate: string;
}
interface TaskFormProps {
  task?: EditTaskById['task']
  onSave: (data: UpdateTaskInput, id?: FormTask['id']) => void
  error: RWGqlError
  loading: boolean
}


const TaskForm = (props: TaskFormProps) => {


  const [description, setDescription] = useState( props.task ? props.task.description : "")
  const [value, setValue] = useState(props.task ? props.task.value : 0.00)
  const [occurence, setOccurence] = useState(props.task ? props.task.occurence : "")
  const [startDate, setStartDate] = useState(props.task ? props.task.startDate : formatDate((new Date()).toISOString()))

  function calculateEndDate () {
    if(props.task){
      return props.task.endDate
    }
    return setDefaultEndDate("",startDate)
  }

  const [endDate, setEndDate] = useState(calculateEndDate)
  // console.log("end date is ",endDate)


  function generateOccurences():JSX.Element {
    const occurences = Occurence.enum
    let arr:string[] = [];

    for(let key in occurences){
      arr.push(key)
    }

    return (<>
    <option>- Please Select Occurence -</option>
      {arr.map(( occurence,idx ) =>
        <option value={occurence} key={idx}>{occurence}</option>
      )}
    </>);
  }

  function onSubmit (data: FormTask) {
    props.onSave(data, props?.task?.id)
  }

  function setDefaultEndDate(occurence: string = "not provided", startDateStr: string = null):string {

    let startDate = new Date();
    if(!!startDateStr){
      startDate = new Date(startDateStr);
    }
    let endDate: Date;
    switch(occurence) {
      case Occurence.enum.daily:
        // console.log('daily selected')
        endDate = startDate;
        break;
      case Occurence.enum.weekly:
        // console.log('weekly selected')
        endDate = new Date(startDate.getUTCFullYear(),startDate.getUTCMonth(),startDate.getUTCDate() + 7);
        break;

      case Occurence.enum.monthly:
        // console.log('monthly selected')
        endDate = new Date(startDate.getUTCFullYear(),startDate.getUTCMonth() + 1,0);
        break;

      case Occurence.enum.bonus:
        // console.log('bonus selected')
        endDate = new Date();
        break;

      default:
        // console.log("default triggered")
        return ""
    }
    // console.log("return date is ", formatDate(endDate.toISOString()))
    return formatDate(endDate.toISOString());
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormTask> data-testid="form" onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description

        </Label>

        <TextField
          id="description"
          name="description"
          value={description}
          onChange={(evnt: React.FormEvent<HTMLInputElement>) => setDescription(evnt.currentTarget.value)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="value"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Value
        </Label>

        <TextField
          id="value"
          name="value"
          value={value}
          onChange={(evnt: React.FormEvent<HTMLInputElement>) => setValue(evnt.currentTarget.value)}
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

        <SelectField
          id="occurence"
          name="occurence"
          multiple = {false}
          value={occurence}
          onChange={(evnt: React.FormEvent<HTMLSelectElement>) =>{ setOccurence(evnt.currentTarget.value); setEndDate(setDefaultEndDate(evnt.currentTarget.value,startDate))}}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={
            {
              required: true,
              validate: {
                matchesInitialValue: (value) => {
                  if(value === "- Please Select Occurence -"){
                    return "you must select an occurence"
                  }

                }
              },
            }
          }
        >
          {generateOccurences()}
          </SelectField>

        <FieldError name="occurence" className="rw-field-error" />

        <Label
          name="startDate"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Start date
        </Label>

        <DateField
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={(evnt: React.FormEvent<HTMLInputElement>) => {setStartDate( evnt.currentTarget.value)}}
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
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={(evnt: React.FormEvent<HTMLInputElement>) => setEndDate(evnt.currentTarget.value)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="endDate" className="rw-field-error" />

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
