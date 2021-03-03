export default `
  type Todo {
    _id: String!
    title: String!
    description: String!
    status: Boolean!
    dueDate: String!
  }

  type Query {
    findOne(_id: ID!): Todo!
    findAll: [Todo!]!
  }

  type Mutation {
    create(user: CreateUserInput): User!
    update(_id: String!, user: UpdateUserInput!): User!
    delete(_id: String!): User!
    deleteAll()
  }

  input CreateTodoInput {
    _id: String!
    title: String!
    description: String!
    status: Boolean!
    dueDate: String!
  }
  
  input UpdateTodoInput {
    title: String
    description: String
    status: Boolean
    dueDate: String
  } 
`;
