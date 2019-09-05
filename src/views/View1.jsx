import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Flip from 'react-reveal/Flip'
import Roll from 'react-reveal/Roll'

import NewUser from '../components/NewUser'
import Confirmation from '../components/Confirmation'
import Autocomplete from '../components/Autocomplete'
import UserInfo from '../components/UserInfo'
import ItemsTable from '../components/ItemsTable'
import axios from 'axios'
var emitter = require('../config/global_emitter')

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    confirmation: {
        zIndex: 99999999,
        position: 'fixed',
        bottom: 0,
        right: 0
    }
}))

export default function View1(){
    const classes = useStyles()
    const [ userSelected, setUserSelected ] = useState()
    const [ hideAddUser, setHideAddUser ] = useState(false)
    const [ showConfirm, setShowConfirm ] = useState(false)
    const [ showUserInfo, setShowUserInfo ] = useState(false)
    const [ showItemsTable, setShowItemsTable ] = useState(false)
    const [ userInfo, setUserInfo ] = useState()
    const [ confirmationMessage, setConfirmationMessage ] = useState('')
    const [ update, setUpdate ] = useState(false)

    useEffect(() => {
        if (userInfo !== undefined){
            setShowUserInfo(true)
        }
    },[userInfo])

    emitter.addListener('addUser', () => {
        setHideAddUser(true)
    })

    emitter.addListener('confirmMessage', (message) => {
        setConfirmationMessage(message)
        setShowConfirm(true)
        setTimeout(() => {
            setShowConfirm(false)
        },1750)
    })

    emitter.addListener('selectedUser', (selectedUser) => {
        let user = {
            name: selectedUser
        }
        axios.post('http://localhost:4000/getCustomerInfo', user)
        .then(async res => {
            let info = {
                tlf: res.data.tlf,
                email: res.data.email,
                clubCode: res.data.clubCode
            }
            return info
        })
        .then(setUserInfo)
        setUserSelected(selectedUser)
        setShowItemsTable(true)
    })

    const hideAddUserForm = () => {
        setHideAddUser(false)
        setConfirmationMessage('Customer added correctly')
        setUpdate(!update)
        setShowConfirm(true)
        setTimeout(() => {
            setShowConfirm(false)
        },1750)
    }

    const closeAddUserForm = () => {
        setHideAddUser(false)
    }

    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <div className='bg-white rounded shadow p-2 ml-3 mt-3'>
                        <Autocomplete update={update}/>
                        {showUserInfo && (<UserInfo tlf={userInfo.tlf} email={userInfo.email} clubCode={userInfo.clubCode} />)}
                    </div>
                    <Flip left when={hideAddUser}>
                        {hideAddUser && (<NewUser onClick={hideAddUserForm} onClose={closeAddUserForm}/>)}
                    </Flip>
                </Grid>
                <Grid item xs={9}>
                    <div className="p-2 mr-3 mt-3">
                        <Roll right when={showItemsTable}>
                            {showItemsTable && (<ItemsTable  userSelected={userSelected} />)}
                        </Roll>
                    </div>
                </Grid>
                <div className={classes.confirmation}>
                <Flip left when={showConfirm}>
                        <Confirmation confirmationMessage={ confirmationMessage } />
                </Flip>
                </div>
            </Grid>
        </div>
    )
}