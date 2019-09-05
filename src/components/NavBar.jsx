import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import AccountCircle from "@material-ui/icons/AccountCircle"
import { Link } from 'react-router-dom'
var emitter = require('../config/global_emitter')

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles()
    const [auth, setAuth] = useState(localStorage.getItem('auth'))

    emitter.addListener('isLogin', () => {
        setAuth(true)
      })

    const logOut = () => {
        localStorage.clear()
        setAuth(false)
        props.history.push('/signin')
    }

    const showAddUser = () => {
        emitter.emit('addUser')
    }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Christmas Booking
          </Typography>
          {!auth ? (
              <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              to={'/signin'}
              component={Link}
            >
              <i className="fas fa-sign-in-alt" />
            </IconButton>
          ):(
              <div>
                  <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={showAddUser}
          >
            <i className="fas fa-user-plus"/>
          </IconButton>
                   <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
            onClick={logOut}
          >
            <AccountCircle />
          </IconButton>
              </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
