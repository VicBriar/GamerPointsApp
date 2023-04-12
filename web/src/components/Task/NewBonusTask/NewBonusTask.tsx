import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import TaskForm from 'src/components/Task/TaskForm'
import Occurence from 'src/occurence'

import type { CreateTaskInput } from 'types/graphql'

const CREATE_TASK_MUTATION = gql`
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      occurence
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

  const onSave = (input: CreateTaskInput) => {

    switch(input.occurence) {
      case Occurence.enum.bonus:
        createTask({ variables: { input } })
        console.log("bonus was made!")
        break;
      case Occurence.enum.daily:
        console.log("daily was submitted")
        if(!(input.startDate && input.endDate)){
          throw new Error("you must supply a end & start date for daily tasks!")
        }else {
        const start = new Date(input.startDate)
        const end = new Date(input.endDate)
        const range = generateDailyRange(start,end);
        const tasks: CreateTaskInput[] = []
        range.map((date) => {
          tasks.push({...input,
            startDate: date.toISOString(),
            endDate: date.toISOString(),
          })
        })
        tasks.map((task) => {
          createTask({ variables: { input: task }})
        })
        console.log(tasks)
        }
        break;
      case Occurence.enum.weekly:
        console.log("weekly was submitted!")
        break;
      case Occurence.enum.monthly:
        console.log("monthly was submitted")
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
