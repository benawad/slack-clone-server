"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n  type Team {\n    id: Int!\n    name: String!\n    directMessageMembers: [User!]!\n    channels: [Channel!]!\n    admin: Boolean!\n  }\n\n  type CreateTeamResponse {\n    ok: Boolean!\n    team: Team\n    errors: [Error!]\n  }\n\n  type Query {\n    allTeams: [Team!]!\n    inviteTeams: [Team!]!\n    getTeamMembers(teamId: Int!): [User!]!\n  }\n\n  type VoidResponse {\n    ok: Boolean!\n    errors: [Error!]\n  }\n\n  type Mutation {\n    createTeam(name: String!): CreateTeamResponse!\n    addTeamMember(email: String!, teamId: Int!): VoidResponse!\n  }\n";