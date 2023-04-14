import type { FindToDoTasks, FindToDoTasksVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import DailyToDoCard from '../DailyToDoCard/DailyToDoCard'
import Week from '../../Week/Week'

export const QUERY = gql`
  query FindToDoTasks {
    tasks {
      id
      description
      complete
      occurence
      startDate
      endDate
      completedOn
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  tasks
}: CellSuccessProps<FindToDoTasks>) => {
  return <Week tasks={tasks} />
}
