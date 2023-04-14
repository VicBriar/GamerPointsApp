import { render } from '@redwoodjs/testing/web'

import SingleTaskToDo from './SingleTaskToDo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SingleTaskToDo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SingleTaskToDo />)
    }).not.toThrow()
  })
})
