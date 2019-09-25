import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Total (props) {
    const [ total, setTotal ] = useState()
    const [ totalD, setTotalD ] = useState()

    useEffect(() => {
        const upload = {
            name: props.userSelected
        }
        axios.post('http://localhost:4000/getCustomerItems', upload)
        .then((e) => {
            var sum = 0
            e.data.map(item => {
                sum += parseFloat(item.price)
            })
            setTotal(sum)
        })
        axios.post('http://localhost:4000/getDeposits', upload)
        .then((e) => {
            var sum = 0
            if (e.data !== ""){
                e.data.map(deposits => {
                    sum += parseFloat(deposits.quantity)
                })
            }
            setTotalD(sum)
        })

    },[props.userSelected])

    return(
        <div>
            <div>Total: {total}</div>
            <div>Total Deposits: {totalD}</div>
        </div>
    )
}