import type { FindTaskById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Task from 'src/components/Task/Task'

export const QUERY = gql`
  query FindTaskById($id: Int!) {
    task: task(id: $id) {
      id
      creatorId
      description
      complete
      value
      occurence
      startDate
      endDate
      completedOn
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Task not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ task }: CellSuccessProps<FindTaskById>) => {
  return <Task task={task} />
}
