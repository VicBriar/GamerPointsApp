import { render,screen,waitFor } from '@redwoodjs/testing/web'
import userEvent from '@testing-library/user-event'
import Task from '../Task/Task'

import TaskForm, {formatDate,makeNewDate,dateFromFormStr} from './TaskForm'
import { standard } from './TaskForm.mock'

function validWeeklyDate(start:Date,end:Date):boolean {
    if(start > end || start.getDate() === end.getDate()){
        // console.log("weekly didn't pass first check, ",start,">",end,"or",start.getDate(),"===",end.getDate())
      return false;
    }
    const difference = ( end.getDate()-start.getDate() )
    const modulo = difference % 7
    // console.log("start is; ",start,". end is; ",end,"differemce; ", difference,"modulo is ",0)
    return ( modulo === 0 );
  }

function validMonthlyDate(start:Date,date:Date):boolean {
    if(start > date || start.getDate() === date.getDate()){
        console.log("monthly didn't pass first check, start > date is; ",start,">",date,"and start.getDate === date.getDate is",start.getDate(),date.getDate())
      return false;
    }
    const expected = makeNewDate()
    expected.setMonth(expected.getMonth()+1)
    expected.setDate(0)

    // console.log(`date.getDate() === expected.getDate() is ${date.getDate()} === ${expected.getDate()}. (the date vs expected is; ${date} vs ${expected})`)
    return (date.getDate() === expected.getDate());
  }

describe('functions',() => {
    it('validweeklydate returns false for end dates that are not a week away from startdate',() =>{
        let today = makeNewDate();
        let end = makeNewDate()
        end.setDate(end.getDate() + 7)

        expect(validWeeklyDate(today,today)).toBe(false);
        expect(validWeeklyDate(end,today)).toBe(false);
        console.log("today, end is; ",today,", ",end)
        expect(validWeeklyDate(today,end)).toBe(true)
    })
    it('validmonthlydate returns false for endDates that are not a month away',() => {
        let today = makeNewDate();
        let endOfMonth = makeNewDate();
        endOfMonth.setMonth(endOfMonth.getMonth()+1)
        endOfMonth.setDate(0)

        expect(validMonthlyDate(today,today)).toBeFalsy()
        expect(validMonthlyDate(endOfMonth,today)).toBeFalsy()
        expect(validMonthlyDate(today,endOfMonth)).toBeTruthy()
    })
})

describe('TaskForm', () => {
    it('renders form', () => {
        render(<TaskForm error={null} onSave={jest.fn()} loading={false} />)

        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Value')).toBeInTheDocument();
        expect(screen.getByText('Occurence')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByLabelText("Start date")).toBeInTheDocument()
        expect(screen.getByLabelText("End date")).toBeInTheDocument()
    })
    it('renders given props',() => {
        const task = standard().one
        render(<TaskForm error={null} onSave={jest.fn()} loading={false} task={task} />)
        const startDate = new Date(task.startDate)
        const endDate = new Date(task.endDate)


        expect(screen.getByDisplayValue(task.description)).toBeInTheDocument()
        expect(screen.getByDisplayValue(task.value)).toBeInTheDocument()
        expect(screen.getByDisplayValue(task.occurence)).toBeInTheDocument()
        expect(screen.getByLabelText('Start date')).not.toBeNull()
        expect(screen.getByLabelText('End date')).not.toBeNull()
    })

    it("displays today's date, and 'select occurence' if no props passed", async () => {
        render(<TaskForm error={null} onSave={jest.fn()} loading={false} />)

        expect(screen.getByLabelText('Description').nodeValue).toBeNull()
        expect(screen.getByDisplayValue(0)).toBeInTheDocument()
        expect(screen.getByDisplayValue("- Please Select Occurence -")).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatDate())).toBeInTheDocument()
        expect(screen.getByLabelText("End date").nodeValue).toBeNull()
    })

    it('changes end date to start date on daily occurence', async () => {
        const user = userEvent.setup()
        render(<TaskForm error={null} onSave={jest.fn()} loading={false} />)

        expect(screen.getByDisplayValue("- Please Select Occurence -")).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatDate())).toBeInTheDocument()
        expect(screen.getByLabelText("End date").nodeValue).toBeNull()

        await user.selectOptions(screen.getByRole('combobox'), "daily")

        expect(await screen.findByDisplayValue("daily")).not.toBeNull()
        expect((await (screen.findAllByDisplayValue(formatDate()))).length).toBe(2)
    })
    it('changes end date to one week after startdate on weekly occurence', async () => {
        const user = userEvent.setup()
        render(<TaskForm error={null} onSave={jest.fn()} loading={false} />)

        expect(screen.getByDisplayValue("- Please Select Occurence -")).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatDate())).toBeInTheDocument()
        expect(screen.getByLabelText("End date").nodeValue).toBeNull()

        await user.selectOptions(screen.getByRole('combobox'), "weekly")
        const startDate = (await screen.findByLabelText("Start date")).getAttribute("value")
        const endDate = (await screen.findByLabelText("End date")).getAttribute("value")
        const start = dateFromFormStr(startDate)
        const end = dateFromFormStr(endDate)

        expect(makeNewDate().getDate()).toEqual(start.getDate())
        expect(await screen.findByDisplayValue("weekly")).not.toBeNull()
        expect(validWeeklyDate(start,end)).toBeTruthy()

    })
    it('changes end date to one month after startdate on monthly occurence', async () => {
        const user = userEvent.setup()
        render(<TaskForm error={null} onSave={jest.fn()} loading={false} />)

        expect(screen.getByDisplayValue("- Please Select Occurence -")).toBeInTheDocument()
        expect(screen.getByDisplayValue(formatDate())).toBeInTheDocument()
        expect(screen.getByLabelText("End date").nodeValue).toBeNull()

        await user.selectOptions(screen.getByRole('combobox'), "monthly")
        const startDate = (await screen.findByLabelText("Start date")).getAttribute("value")
        const endDate = (await screen.findByLabelText("End date")).getAttribute("value")
        const start = dateFromFormStr(startDate)
        const end = dateFromFormStr(endDate)

        expect((makeNewDate()).getDate() === start.getDate())
        expect(await screen.findByDisplayValue("monthly")).not.toBeNull()
        expect(validMonthlyDate(start,end)).toBeTruthy()

    })
})
