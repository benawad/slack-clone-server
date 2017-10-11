// CRUD
// Create
// Read
// Update
// Delete

export default `

  type User {
    id: Int!
    username: String!
    email: String!
    teams: [Team!]!
  }

  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }

`;
