import { render } from '@redwoodjs/testing/web'

import NewTasks from './NewTasks'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewTasks', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewTasks />)
    }).not.toThrow()
  })
})
