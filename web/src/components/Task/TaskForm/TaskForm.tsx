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
import { useState,useEffect } from 'react'
import Occurence from 'src/occurence'
import type { EditTaskById, UpdateTaskInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

export function makeNewDate() {
  const now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  // console.log(new Date(now.getFullYear(),now.getMonth(),now.getDate()))
  return new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds())
}
function addZero(str:number):string {
  return ("0" + str).slice(-2)
}

//format Date takes a date, (or makes one for today at midnight) and returns a string formatted for react components
export const formatDate = (value: Date | void ):string => {
  let date = makeNewDate()
  if(value){
    date = new Date(value);
  }
    // return `${year}-${month}-${day}`
    // console.log(`before formatting, date is ${date}. then it's month is;`,addZero(date.getMonth()))
    return `${date.getFullYear()}-${addZero(date.getMonth()+1)}-${addZero(date.getDate())}`
}
//dateFromFormStr takes the string from a react component, and parses it into a new Date object
export function dateFromFormStr(startDateStr:string): Date{
  let startDateArr = startDateStr.split("-")
    let month = parseInt(startDateArr[1])
    let monthStr = addZero(month)
    return new Date(`${startDateArr[0]},${monthStr},${startDateArr[2]}`)
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
  onSave: (data: UpdateTaskInput, event?:React.BaseSyntheticEvent, id?: FormTask['id']) => void
  error: RWGqlError
  loading: boolean
}


const TaskForm = (props: TaskFormProps) => {
  

  const [description, setDescription] = useState( props.task ? props.task.description : "")
  const [value, setValue] = useState(props.task ? props.task.value : 0.00)
  const [occurence, setOccurence] = useState(props.task ? props.task.occurence : "")
  const [startDate, setStartDate] = useState(props.task ? props.task.startDate : formatDate)
  const [endDate, setEndDate] = useState(props.task ? props.task.startDate : "")

  useEffect(
    () => {
      setEndDate(props.task ? props.task.endDate : calculateEndDate(occurence,startDate))
    },[occurence]
  )


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

  function onSubmit (data: FormTask, event: React.BaseSyntheticEvent) {
    event.preventDefault()

    if(props.task){
      props.onSave(data, event, props?.task?.id)
    } else {
      let newData = {
        description: description,
        value: value,
        occurence: occurence,
        startDate: startDate,
        endDate: endDate,
      }
      props.onSave(newData,event)
    }    
    // props.onSave(data, event, props?.task?.id)
  }

  //startDateStr should be formatted for react
  function calculateEndDate(occurence: string = "", startDateStr: string | null):string {
    let localStartDate = makeNewDate();

    if(startDateStr){
      localStartDate = dateFromFormStr(startDateStr)
    }

    let endDate: Date;
    switch(occurence) {
      case Occurence.enum.daily:
        // console.log('daily selected')
        break;
      case Occurence.enum.weekly:
        // console.log('weekly selected')
        endDate = makeNewDate()
        endDate.setDate(endDate.getDate() + 7)
        break;

      case Occurence.enum.monthly:
        // console.log('monthly selected')
        endDate = makeNewDate();
        endDate.setMonth(endDate.getMonth()+1)
        endDate.setDate(0)
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
    return formatDate(endDate);
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
          onChange={(evnt: React.FormEvent<HTMLSelectElement>) => setOccurence(evnt.currentTarget.value)}
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
          required={true}
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
          required={true}
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
