import type {
  QueryResolvers,
  MutationResolvers,
  TaskRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { validate, validateWith } from '@redwoodjs/api'
import Occurence from 'src/occurence'

export const tasks: QueryResolvers['tasks'] = () => {
  return db.task.findMany()
}

export const task: QueryResolvers['task'] = ({ id }) => {
  return db.task.findUnique({
    where: { id },
  })
}

export const createTask: MutationResolvers['createTask'] = ({ input }) => {
  validate(input.description, "description of task", {
    presence: true,
    length: {min: 2},
  })
  validateWith(
    () => {
      if(input.startDate && input.endDate){
        if(input.startDate > input.endDate){
          throw new Error("start date must preclude end date")
        }
      }
    }
  )
  validateWith(
    () => {
      let valid = false
      for(let key in Occurence){
          if(input.occurence === Occurence[key]){
            valid = true;
          }
      }
      if(!valid){
        throw new Error(`Occurence must be ${Occurence.list}`)
      }
    }
  )
  return db.task.create({
    data: input,
  })
}

export const updateTask: MutationResolvers['updateTask'] = ({ id, input }) => {
  return db.task.update({
    data: input,
    where: { id },
  })
}

export const deleteTask: MutationResolvers['deleteTask'] = ({ id }) => {
  return db.task.delete({
    where: { id },
  })
}

export const Task: TaskRelationResolvers = {
  creator: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).creator()
  },
}
