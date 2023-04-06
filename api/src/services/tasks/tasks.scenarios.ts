import type { Prisma, Task } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TaskCreateArgs>({
  task: {
    one: {
      data: {
        description: 'String',
        value: 9247910.282505644,
        occurence: 'String',
      },
    },
    two: {
      data: {
        description: 'String',
        value: 4129426.067562012,
        occurence: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Task, 'task'>
