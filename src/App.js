import React, { Component } from 'react'
import './App.css'
import firebaseClient from './firebaseClient'

import { Link } from 'react-router-dom'
import Routes from './Routes'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'


class Notifications extends Component {
  render() {
    return (
      <Snackbar
        autoHideDuration={2000}
        open={!!this.props.message}
        onRequestClose={this.props.handleRequestClose}
        SnackbarContentProps={{
          'aria-describedby': 'notification-id',
        }}
        message={<span id="notification-id">{this.props.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.props.handleRequestClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    )
  }
}

class AppHeader extends Component {
  render() {
    const { isAuthenticated } = this.props
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" className="AppHeader-Title">
            Item State Tracker
          </Typography>
          { !isAuthenticated && (
            <Link to="/login">
              <Button color="contrast">
                Login
              </Button>
            </Link>
          ) }
          { isAuthenticated && <Link to="/newItem"><Button color="contrast">New Item</Button></Link> }
          { isAuthenticated && <Link to="/queryItems"><Button color="contrast">Search</Button></Link> }
          { isAuthenticated && <Link to="/states"><Button color="contrast">States</Button></Link> }
        </Toolbar>
      </AppBar>
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      notification: null
    }
  }

  userHasAuthenticated = authenticated => this.setState({ isAuthenticated: authenticated })

  notify = notification => this.setState({ notification })

  componentWillMount() {
    firebaseClient
      .auth()
      .onAuthStateChanged(user => this.setState({
        isAuthenticated: !!user,
        userId: !!user && user.uid
      }))
  }

  handleNotificationRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ notification: null })
  }

  render() {
    const childProps = {
      userHasAuthenticated: this.userHasAuthenticated,
      notify: this.notify,
      ...this.state
    }

    return (
      <Grid container className="App" direction="column">
        <AppHeader {...childProps} />
        <Grid item>
          <Routes childProps={childProps} />
        </Grid>
        <Notifications
          message={this.state.notification}
          handleRequestClose={this.handleNotificationRequestClose}
        />
      </Grid>
    )
  }
}

export default App
