import React, {Fragment} from 'react'
import { Spinner } from 'reactstrap'
import { useQuery } from '@apollo/react-hooks'
import {FILES_QUERY} from './graphql/queries'

const Files = (props) => {
    const {
        loading: filesLoading,
        data: filesQuery
    } = useQuery(FILES_QUERY)

    // console.log("FILES QUERY", filesQuery.files)
    
    if (filesLoading) return <Spinner color="primary"/>

    return (
        <Fragment>
                <div>
                    {filesQuery.files.map(file => (
                        <img
                            style={{ width: 200 }}
                            key={file}
                            src={ `http://localhost:8000/images/${file}` }
                            alt={file}
                        />
                    ) ) }
                </div>
        </Fragment>
    )
}

export default Files