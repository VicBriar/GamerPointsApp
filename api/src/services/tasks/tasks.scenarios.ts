import type { Prisma, Task } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TaskCreateArgs>({
  task: {
    daily: {
      data: {
        description: 'eat some mushrooms',
        value: .10,
        occurence: 'daily',
        startDate: (new Date), 
        endDate: (new Date),
      },
    },
    weekly: {
      data: {
        description: 'the big screech',
        value: .80,
        occurence: 'weekly',
        startDate: new Date(2023,4,1),
        endDate: new Date(2023,4,7),
      },
    },
    monthly: {
      data: {
        description: 'bitee pretty villager',
        value: 3.99,
        occurence: 'monthly',
        startDate: new Date(2023,4,1),
        endDate: new Date(2023,4,30),
      },
    },
    bonus: {
      data: {
        description: 'take over the town',
        value: 50.01,
        occurence: 'monthly',
        startDate: new Date(2023,4,16),
        endDate: new Date(2023,6,20),
      },
    },
  },
})

export type StandardScenario = ScenarioData<Task, 'task'>
