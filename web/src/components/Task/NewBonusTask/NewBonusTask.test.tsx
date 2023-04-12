import { render, screen } from '@redwoodjs/testing/web'

import NewBonusTask from './NewBonusTask'
import { standard } from './NewBonusTask.mock'


describe('New Bonus Task', () => {
    it('renders heading', () => {
        render(<NewBonusTask />)

        expect(screen.getByText('New Task(s)')).toBeInTheDocument()
    })

    it('renders form', () => {
        render(<NewBonusTask />)

        expect(screen.getAllByRole('textbox').length).toBeGreaterThanOrEqual(2)
    })
})