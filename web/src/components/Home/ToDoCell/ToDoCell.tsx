import type { FindTasks, FindTasksVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindTasks {
    tasks {
      id
      description
      complete
      value
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
}: CellFailureProps<FindTasksVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  tasks
}: CellSuccessProps<FindTasks,FindTasksVariables>) => {
  return <div>{JSON.stringify(tasks)}</div>
}
