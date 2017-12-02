export default `

  type Channel {
    id: Int!
    name: String!
    public: Boolean!
    messages: [Message!]!
    users: [User!]!
    dm: Boolean!
  }

  type ChannelResponse {
    ok: Boolean!
    channel: Channel
    errors: [Error!]
  }

  type Mutation {
    createChannel(teamId: Int!, name: String!, public: Boolean=false, members: [Int!]=[]): ChannelResponse!
    getOrCreateChannel(teamId: Int!, members: [Int!]!): Int!
  }
`;
