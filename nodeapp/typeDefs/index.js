const { ApolloServer, gql } = require('apollo-server-express')

const typeDefs = gql`
    type Query {
        files: [String]
    }

    type Mutation {
        uploadFile(file: Upload!): Boolean
    }
`

module.exports = typeDefs