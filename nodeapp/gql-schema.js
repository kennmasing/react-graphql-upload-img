//DECLARE DEPENDENCIES
const graphql = require('graphql')
const GraphQLISODate = require('graphql-iso-date')

const {
    GraphQLString,
    GraphQLSchema
} = graphql
const { GraphQLDateTime } = GraphQLISODate

//DECLARE MODELS
const Image = require('./models/images')

//CREATE TYPES
const ImageType = new GraphQLObjectType({
    name: "Image",
    fields: () => ({
        files: { type: GraphQLString }
    })
})

//CREATE ROOTQUERY
const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        images: new GraphQLList(ImageType),
        args: {
            files: { type: GraphQLString }
        },
        resolve: (parent, args) => {
            return Image.find()
        }
    }
})

//CREATE MUTATION
const Mutations = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        uploadFile {
            type: ImageType,
            args: {
                files: { type: GraphQLString }
            },
            resolve: async (_, args) => {
                // async (_, { file }) => {
                    const { createReadStream, filename } = await file;
        
                    await new Promise(res => 
                        createReadStream()
                            .pipe(createWriteStream(path.join(__dirname, '../images', filename)))  
                            .on('close', res)
                    )
        
                    args.files.push(filename)
        
                    return true
                }
            }
        }
    }
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutations
})


