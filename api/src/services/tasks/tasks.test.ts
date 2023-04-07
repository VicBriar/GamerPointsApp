import { Prisma, Task } from '@prisma/client'

import { tasks, task, createTask, updateTask, deleteTask } from './tasks'
import type { StandardScenario } from './tasks.scenarios'



describe('tasks', () => {
  scenario('returns all tasks', async (scenario: StandardScenario) => {
    const result = await tasks()

    expect(result.length).toEqual(Object.keys(scenario.task).length)
  })

  scenario('returns a single task', async (scenario: StandardScenario) => {
    const result = await task({ id: scenario.task.daily.id })

    expect(result).toEqual(scenario.task.daily)
  })

  scenario('creates a task', async () => {
    const result = await createTask({
      input: {
        description: 'eat stinky cheese',
        value: .30,
        occurence: 'weekly',
        startDate: new Date(2023,4,1),
        endDate: new Date(2023,4,7),
      },
    })

    expect(result.description).toEqual('eat stinky cheese')
    expect(result.value).toEqual(new Prisma.Decimal(.30))
    expect(result.occurence).toEqual('weekly')
    expect(result.startDate).toBeInstanceOf(Date)
  })
  it('throws erorr when creating a task with an incorrect occurence', async () => {
    expect( 
      async () => {
        await createTask({
        input: {
          description: 'eat stinky cheese',
          value: .30,
          occurence: 'Weekly',
          startDate: new Date(2023,4,1),
          endDate: new Date(2023,4,7),}
        })
      }
    ).rejects.toThrow()
  })

  it('throws erorr when creating a task with no description', async () => {
    expect( 
      async () => {
        await createTask({
        input: {
          description: 'e',
          value: .30,
          occurence: 'weekly',
          startDate: new Date(2023,4,1),
          endDate: new Date(2023,4,7),}
        })
      }
    ).rejects.toThrow()
  })

  it('throws erorr when creating a task with an older end date than start date', async () => {
    expect( 
      async () => {
        await createTask({
        input: {
          description: 'e',
          value: .30,
          occurence: 'weekly',
          startDate: new Date(2023,5,1),
          endDate: new Date(2023,4,7),}
        })
      }
    ).rejects.toThrow()
  })

  scenario('updates a task', async (scenario: StandardScenario) => {
    const original = (await task({ id: scenario.task.daily.id })) as Task
    const result = await updateTask({
      id: original.id,
      input: { description: 'bite pretty villager' },
    })

    expect(result.description).toEqual('bite pretty villager')
  })

  scenario('deletes a task', async (scenario: StandardScenario) => {
    const original = (await deleteTask({ id: scenario.task.daily.id })) as Task
    const result = await task({ id: original.id })

    expect(result).toEqual(null)
  })
})
