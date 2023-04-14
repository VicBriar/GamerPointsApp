import { render } from '@redwoodjs/testing/web'

import ToDoCard from './ToDoCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ToDoCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ToDoCard />)
    }).not.toThrow()
  })
})
