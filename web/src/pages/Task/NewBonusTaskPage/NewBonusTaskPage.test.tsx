import { render } from '@redwoodjs/testing/web'

import NewBonusTaskPage from './NewBonusTaskPage'


describe('NewBonusTaskPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewBonusTaskPage />)
    }).not.toThrow()
  })

})

