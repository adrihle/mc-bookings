const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const { database } = require('../config/keys')
const crypto = require('crypto')

const app = express()

app.set('port', process.env.PORT || 4000)

app.listen(app.get('port'), () => {
    console.log('server running on port: ' + app.get('port'))
})

//setup middlewares
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//setup connection to db
const pool = mysql.createPool(database)

//queries for rest api 

//setupt rest api for login
const queryLogin = 'SELECT * FROM cb_login WHERE email = ?'

function queryOneInputValue (query, value){
    return new Promise((resolve, reject) => {
        try{
            pool.query(query, [value], (err, rows) => {
                if (err){
                    return reject(err)
                }else {
                    return resolve(rows)
                }
            })
        }catch(err){
            console.log(err)
        }
    })
}

const authLogin = (rows, pass) => {
    let verified = false
    const passIntroduced = crypto.createHash('md5').update(pass).digest('hex')
    if (passIntroduced === rows[0].pass){
        verified = true
    }
    return verified
}

app.post('/auth', (req, res) => {
    const { email, pass } = req.body
    queryOneInputValue(queryLogin, email)
    .then(async (rows) => {
        return authLogin(rows, pass)
    })
    .then((e) => {
        res.send(e)
    })
})

//setup rest api for add customer
const queryAddCustomer = 'INSERT INTO cb_customers set ?'

app.post('/addCustomer', (req, res) => {
    const { name, tlf, email, clubCode } = req.body
    const info = {
        tlf,
        email,
        clubCode
    }
    const upload = {
        name,
        info: JSON.stringify(info),
        items: ''
    }
    queryOneInputValue(queryAddCustomer, upload)
    .then((e) => {
        res.send(e)
    })
})

//setup rest api for get customers name registered on array
const queryGetCustomers = 'SELECT name FROM cb_customers'

app.get('/getCustomers', (req, res) => {
    pool.query(queryGetCustomers, (err, rows) => {
        let arr = []
        rows.map(customer => {
            arr.push(customer.name)
        })
        res.send(arr)
    })
})

//setup rest api for get specific customer info
const queryGetCustomerInfo = 'SELECT info FROM cb_customers WHERE name = ?'

app.post('/getCustomerInfo', (req, res) => {
    const { name } = req.body
    queryOneInputValue(queryGetCustomerInfo, name)
    .then((e) => {
        const info = JSON.parse(e[0].info)
        res.send(info)
    })
})

//setup rest api for customer items ordered
const queryGetCustomerItems = 'SELECT items FROM cb_customers WHERE name = ?'

app.post('/getCustomerItems', (req, res) => {
    const { name } = req.body
    queryOneInputValue(queryGetCustomerItems, name)
    .then((e) => {
        res.send(e[0].items)
    })
})

//setup rest api for update customer items ordered
const queryUpdateItems = 'UPDATE cb_customers SET items = ? WHERE name = ?'

app.post('/updateItems', (req, res) => {
    const { items, name } = req.body
    pool.query(queryUpdateItems, [JSON.stringify(items), name], (err, rows) => {
        res.send(err)
    })
})








