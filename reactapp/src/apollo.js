import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {createUploadLink} from 'apollo-upload-client'

const link = createUploadLink({ uri: "http://localhost:8000/graphql" })

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

export { client }