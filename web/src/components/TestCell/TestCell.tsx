import type { FindTestQuery, FindTestQueryVariables } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindTestQuery($id: Int!) {
    test: test(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindTestQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  test,
}: CellSuccessProps<FindTestQuery, FindTestQueryVariables>) => {
  return <div>{JSON.stringify(test)}</div>
}
