import type { FindTasks } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Tasks from 'src/components/Task/Tasks'

export const QUERY = gql`
  query FindTasks {
    tasks {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No tasks yet. '}
      <Link to={routes.newTasks()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ tasks }: CellSuccessProps<FindTasks>) => {
  return <Tasks tasks={tasks} />
}
