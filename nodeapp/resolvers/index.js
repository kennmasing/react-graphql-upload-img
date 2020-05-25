const { createWriteStream, existsSync, mkdirSync } = require('fs')
const path = require('path')

const files = []

const resolvers = {
    Query: {
        files: () => files
    },
    Mutation: {
        uploadFile: async (_, { file }) => {
            const { createReadStream, filename } = await file;

            await new Promise(res => 
                createReadStream()
                    .pipe(createWriteStream(path.join(__dirname, '../images', filename)))  
                    .on('close', res)
            )

            files.push(filename)

            return true
        }
    }
}

module.exports = resolvers