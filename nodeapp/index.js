//DECLARE DEPENDENCIES
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 8000
const cors = require('cors')


// (1) OWN IMPLEMENTATION
const resolvers = require('./resolvers/index')
const typeDefs = require('./typeDefs/index')


//APOLLO DEPENDENCIES
const { ApolloServer, gql } = require('apollo-server-express')
const { createWriteStream, existsSync, mkdirSync } = require('fs')
const path = require('path')

// (2) OWN IMPLEMENTATION
existsSync(path.join(__dirname, "./images")) || mkdirSync(path.join(__dirname, './images'))

const server = new ApolloServer({ typeDefs, resolvers })

//CONNECT TO LOCAL DATABASE
mongoose.connect('mongodb://localhost:27017/upload-image', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    userCreateIndex: true 
})
mongoose.connection.once('open', () => {
    console.log('Now connected to local db')
})

//APPLY MIDDLEWARE
app.use(cors())

// (3) OWN IMPLEMENTATION
app.use('/images', express.static(path.join(__dirname, './images')))
server.applyMiddleware({ app })

//INITIALIZE SERVER
app.listen(PORT, () => {
    console.log(`Listening for reqs in Port ${PORT}`)
})

// const { ApolloServer, gql } = require("apollo-server-express");
// const { createWriteStream, existsSync, mkdirSync } = require("fs");
// const path = require("path");
// const express = require("express");

// const files = [];

// const typeDefs = gql`
//   type Query {
//     files: [String]
//   }

//   type Mutation {
//     uploadFile(file: Upload!): Boolean
//   }
// `;

// const resolvers = {
//   Query: {
//     files: () => files
//   },
//   Mutation: {
//     uploadFile: async (_, { file }) => {
//       const { createReadStream, filename } = await file;

//       await new Promise(res =>
//         createReadStream()
//           .pipe(createWriteStream(path.join(__dirname, "../images", filename)))
//           .on("close", res)
//       );

//       files.push(filename);

//       return true;
//     }
//   }
// };

// existsSync(path.join(__dirname, "../images")) || mkdirSync(path.join(__dirname, "../images"));

// const server = new ApolloServer({ typeDefs, resolvers });
// const app = express();
// app.use("/images", express.static(path.join(__dirname, "../images")));
// server.applyMiddleware({ app });

// app.listen(8000, () => {
//   console.log(`🚀  Server ready at http://localhost:8000/`);
// });
