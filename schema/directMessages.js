export default `

  type DirectMessage {
    id: Int!
    text: String!
    sender: User!
    receiverId: Int!
  }

  type Query {
    directMessages: [DirectMessage!]!
  }

  type Mutation {
    createDirectMessage(recieverId: Int!, text: String!): Boolean!
  }

`;
