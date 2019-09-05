import React, { useState, useRef } from 'react'
import posed from 'react-pose'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createMuiTheme } from '@material-ui/core/styles'
import { lightBlue } from '@material-ui/core/colors'
import { ThemeProvider } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import axios from 'axios';
var emitter = require('../config/global_emitter')

const useStyles = makeStyles(theme => ({
    textfields: {
      marginTop: theme.spacing(1)
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: lightBlue[300],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -22,
        marginLeft: -12,
    },
    multilineColor:{
        color:'white',
        '&::placeholder': {
            textOverflow: 'ellipsis !important',
            color: 'blue'
          }
    }

}))

const theme = createMuiTheme({
    palette: {
      primary: { main: lightBlue[300] }, 
    },
  });

const Container = posed.div({
    enter: { staggerChildren: 50 }
})

const Fields = posed.div({
    enter: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
})

export default function Login(props) {
    const classes = useStyles()
    const input = useRef()
    const [loading, setLoading] = React.useState(false);
    const [values, setValues]=useState({
        name: '',
        password: ''
    })

    const handleChange = input => event => {
        setValues({ ...values, [input]: event.target.value })
    }

    const handleClick = () => {
        const auth = {
            email: values.name,
            pass: values.password
        }
        axios.post('http://localhost:4000/auth', auth)
        .then(res => {
            if (res){
                localStorage.setItem('auth', true)
                emitter.emit('isLogin')
                props.history.push('/')
            }
        })
    }
    
    return(
        <ThemeProvider theme={theme}>
            <div className='pt-5'>
                <form className='shadow text-center text-white container w-25 rounded pb-4'  >
                    <Container>
                        <Fields><h5 className='pt-5 pb-2'>Sign In</h5></Fields>
                        <Fields>
                            <TextField
                            label="Email"
                            name='username'
                            ref={input}
                            value={values.name}
                            InputProps={{
                                className: classes.multilineColor
                              }}
                            InputLabelProps={{
                                style: {
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                  color: lightBlue[200]
                                }}} 
                            onChange={handleChange('name')}
                            type='text'
                            margin="normal"/>
                        </Fields>
                        <Fields>
                            <TextField
                            label="Password"
                            type="password"
                            name='password'
                            value={values.password}
                            InputProps={{
                                className: classes.multilineColor
                            }}
                            InputLabelProps={{
                                style: {
                                  textOverflow: 'ellipsis',
                                  overflow: 'hidden',
                                  color: lightBlue[200]
                                }}} 
                            onChange={handleChange('password')}
                            className={classes.textfields}
                            />
                        </Fields>
                        <Fields>
                            <div className={classes.wrapper}>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    className='mt-4 mb-2'
                                    disabled={loading}
                                    onClick={handleClick}>
                                        Submit
                                </Button>
                                {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                            </div>
                        </Fields>
                    </Container>
                </form>
            </div>
        </ThemeProvider>
    )
}