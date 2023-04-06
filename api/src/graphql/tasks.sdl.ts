export const schema = gql`
  type Task {
    id: Int!
    creator: User
    creatorId: Int
    description: String!
    complete: Boolean
    value: Float!
    occurence: String!
    startDate: DateTime!
    endDate: DateTime
    completedOn: DateTime
    createdAt: DateTime!
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth
  }

  input CreateTaskInput {
    creatorId: Int
    description: String!
    complete: Boolean
    value: Float!
    occurence: String!
    startDate: DateTime!
    endDate: DateTime
    completedOn: DateTime
  }

  input UpdateTaskInput {
    creatorId: Int
    description: String
    complete: Boolean
    value: Float
    occurence: String
    startDate: DateTime
    endDate: DateTime
    completedOn: DateTime
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @requireAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
