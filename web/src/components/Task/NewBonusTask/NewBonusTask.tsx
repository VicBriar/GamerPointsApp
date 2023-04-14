import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TaskForm, { dateFromFormStr } from 'src/components/Task/TaskForm'
import Occurence from 'src/occurence'

import type { CreateTaskInput } from 'types/graphql'

const CREATE_TASK_MUTATION = gql`
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`
export function generateDailyRange(start:Date,end:Date):Date[] {
  let result: Date[] = [];
  let shallowStart = new Date(start.valueOf());

  for(let currentDate = shallowStart; currentDate.getUTCDate() <= end.getUTCDate(); currentDate.setUTCDate(currentDate.getUTCDate()+1)){
    // console.log(`current date is; ${currentDate}, end is ${end}, result is ${result}`)
    result.push(new Date(currentDate))
    // console.log(`and now result is; ${result}`)
  }
  return result;
}

export function generateWeeklyRange(start:Date,end:Date):Date[][] {
  let result: Date[][] = [];
  let shallowStart = new Date(start);
  let day = shallowStart.getUTCDate() + 7;
  let shallowEnd = new Date(shallowStart.getUTCFullYear(),shallowStart.getUTCMonth(),day);

  for(let startDate = shallowStart, endDate = shallowEnd; endDate <= end; startDate.setUTCDate(startDate.getUTCDate()+7), endDate.setUTCDate(endDate.getUTCDate() + 7)) {
    // console.log(`current date is; ${startDate}, end is ${endDate},`)
    // console.log(`${currentDate} <= ${end} is ${currentDate <= end}`)
    result.push([new Date(startDate),new Date(endDate)]);
    // console.log(result)
  }
  return result;
}


const NewBonusTask = () => {

  const [createTask, { loading, error }] = useMutation(CREATE_TASK_MUTATION, {
   onCompleted: (data) => {
      console.log(data)
      toast.success('Bonus Task created')
      navigate(routes.tasks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateTaskInput, event: React.BaseSyntheticEvent) => {

    switch(input.occurence) {
      case Occurence.enum.bonus:
        createTask({ variables: { input } })
        console.log("bonus was made!")
        break;

      case Occurence.enum.daily:
        console.log("daily was submitted")
        if(!(input.startDate || input.endDate)){
          alert("you must supply an end or start date for daily tasks!")
        }else {
        const start = input.startDate ? dateFromFormStr(input.startDate) : dateFromFormStr(input.endDate)
        const end = input.endDate  ? dateFromFormStr(input.endDate) : dateFromFormStr(input.startDate)
        const range = generateDailyRange(start,end);
        const tasks: CreateTaskInput[] = []
        //console.log(`start is: ${input.startDate}, end is; ${input.endDate}, occurence is; ${input.occurence},form end is; `,new FormData(event.target))
               range.map((date) => {
          tasks.push({...input,
            startDate: date.toISOString(),
            endDate: date.toISOString(),
          })
        })
        console.log("tasks is; ",tasks)
        // tasks.map((task) => {
        //   createTask({ variables: { input: task }})
        // })
        }
        break;
      case Occurence.enum.weekly:
        console.log("weekly was submitted!")
        if(!(input.startDate)){
          alert("you must supply a start date for weekly tasks!")
         }else {
        const start =  dateFromFormStr(input.startDate)
        const end = input.endDate  ? dateFromFormStr(input.endDate) : (dateFromFormStr(input.startDate))
        if(!input.endDate){
          end.setDate(end.getDate()+7)
        }

        console.log(`inut.startDate is; ${input.startDate}, start is; ${start}, input.enddate is; ${input.endDate},and end is; ${end} .`)

        const range = generateWeeklyRange(start,end);
        const tasks: CreateTaskInput[] = []
        console.log("typeof input.value is; ",typeof input.value)
        range.map((arr) => {
          tasks.push({...input,
            startDate: arr[0].toISOString(),
            endDate: arr[1].toISOString(),
          })
        })
        console.log(`range is; ${range}, and tasks object is; `,tasks)
        tasks.map((task) => {
          createTask({ variables: { input: task }})
        })
       }
        break;
      case Occurence.enum.monthly:
        console.log("monthly was submitted")
        toast.error("coming soon!")
        break;
    }
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Task(s)</h2>
      </header>
      <div className="rw-segment-main">
        <TaskForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewBonusTask
