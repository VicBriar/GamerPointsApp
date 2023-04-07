import { render } from '@redwoodjs/testing/web'

import NewTasksPage from './NewTasksPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewTasksPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewTasksPage />)
    }).not.toThrow()
  })
})
