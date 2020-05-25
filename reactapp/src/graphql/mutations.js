import gql from 'graphql-tag'

const UPLOAD_IMAGE = gql`
    mutation UploadFile(
        $file: Upload!
        ) {
            uploadFile(
                file: $file
        )
    }
`
export {
    UPLOAD_IMAGE
} 