import type { Prisma, Task } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TaskCreateArgs>({
  task: {
    one: {
      data: {
        description: 'String',
        complete: true,
        value: 9959515.110697856,
        occurence: 'String',
        creator: {
          create: {
            email: 'String7256244',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        description: 'String',
        complete: true,
        value: 9156937.000623286,
        occurence: 'String',
        creator: {
          create: {
            email: 'String694543',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Task, 'task'>
