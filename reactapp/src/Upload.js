import React, { Fragment, useCallback } from 'react'
import { Input } from 'reactstrap'
import { useDropzone } from 'react-dropzone'
import { useMutation } from '@apollo/react-hooks'
import { FILES_QUERY } from './graphql/queries'
import { UPLOAD_IMAGE } from './graphql/mutations'

const Upload = (props) => {
    const [uploadFile] = useMutation(UPLOAD_IMAGE, {
        refetchQueries: [{ query: FILES_QUERY }]
    })

    const onDrop = useCallback(
        ([file]) => {
            uploadFile({ variables: { file } })
        },
        [uploadFile]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    
    return (
        <Fragment>
            <div {...getRootProps()} >
                <Input {...getInputProps()} />
                {isDragActive ?  (
                    <p> Drop the files here... </p>
                ) : (
                    <p> Drag 'n' drop some files here, or click to select files </p>
                )}

            </div>
        </Fragment>
    )
}

export default Upload



