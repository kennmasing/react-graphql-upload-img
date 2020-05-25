import gql from 'graphql-tag'

const FILES_QUERY = gql`
    {
        files
    }
`

export {
    FILES_QUERY
}