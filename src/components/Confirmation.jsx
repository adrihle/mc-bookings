import React from 'react'

export default function Confirmation (props){

    return(
        <div className='m-4 text-center'>
            <img style={{borderRadius: '150%', width: '150px'}} src='https://i.giphy.com/media/111ebonMs90YLu/giphy.webp' alt='confirm' />
            <h6 className='text-white'>{props.confirmationMessage}</h6>
        </div>
    )
}