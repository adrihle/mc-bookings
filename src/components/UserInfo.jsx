import React from 'react'

export default function UserInfo(props){
    return(
        <div className='ml-3 mt-3' >
            <h6 className='pb-3'>Customer Info</h6>
            <p>{props.tlf}</p>
            <p>{props.email}</p>
            <p>{props.clubCode}</p>
        </div>
    )
}