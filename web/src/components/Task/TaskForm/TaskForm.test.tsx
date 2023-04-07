import { render,screen,waitFor } from '@redwoodjs/testing/web'
import userEvent from '@testing-library/user-event'

import TaskForm from './TaskForm'
describe('TaskForm', () => {
    it('renders form', async () => {
        mockGraphQLMutation('createTaskMutatation',(variables, {ctx}) => {
            ctx.delay(1500)
            return {
                task: {
                    id: 30,
                    description: "descriptiuon"
                }
            }
        })

        render(<TaskForm onSave={jest.fn()} loading={false} />)
    
    
        expect(await screen.getByText('Description')).toBeInTheDocument();
        expect(await screen.getByText('Value')).toBeInTheDocument();
        expect(await screen.getByText('Occurence')).toBeInTheDocument();
        expect(await screen.getByText('Save')).toBeInTheDocument();
        expect(await screen.findByLabelText("Start date")).toBeInTheDocument();
        expect(await screen.findByLabelText("End date")).toBeInTheDocument();
    })
    // it('submits new task', async () => {
    //     render(<TaskForm />)
    //     const saveButton = screen.getByText('Save')
    //     const descriptionField = await screen.findByLabelText("Description")
    //     const valueField = await screen.findByLabelText("Value")
    //     const occurenceField = await screen.findByDisplayValue("bonus")
    //     const startDateField = await screen.findByLabelText("Start date")
    //     const endDateField = await screen.findByLabelText("End date")
    
    //     await waitFor(()=> userEvent.type(descriptionField,"a description"))
    //     await waitFor(() => userEvent.type(valueField,".50"))   
    // })
})
