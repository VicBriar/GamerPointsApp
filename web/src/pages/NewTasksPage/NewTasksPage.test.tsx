import { render } from '@redwoodjs/testing/web'

import NewTasksPage from './NewTasksPage'


describe('NewTasksPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewTasksPage />)
    }).not.toThrow()
  })
})
