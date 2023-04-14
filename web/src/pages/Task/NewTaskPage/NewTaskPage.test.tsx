import { render } from '@redwoodjs/testing/web'

import NewBonusTaskPage from './NewTaskPage'


describe('NewBonusTaskPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewBonusTaskPage />)
    }).not.toThrow()
  })

})

