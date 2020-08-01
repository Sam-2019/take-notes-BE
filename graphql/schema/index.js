const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Note {
    _id: ID!,
    title: String!
    detail: String!
    created_at: String!
    updated_at: String!
  }

  type RootQuery {
    notes: [Note!]!
    note(_id: ID!): Note
  }

  type  RootMutation {
    createNote(title: String!, detail: String!, created_at: String!, updated_at: String!): Note!
    updateNote(_id:ID!, title: String!, detail: String!): Note!
    deleteNote(_id:ID!): Note!
  }

  type RootSubscription {
    newNote: Note
    updatedNote: Note!
    deletedNote: Note!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
    subscription: RootSubscription
  }
`);
