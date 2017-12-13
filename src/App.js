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

class AppHeader extends Component {
  render() {
    const { isAuthenticated } = this.props
    return (
      <div className="AppHeader">
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
      </div>
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { isAuthenticated: false }
  }

  userHasAuthenticated = authenticated => this.setState({ isAuthenticated: authenticated })

  componentWillMount() {
    firebaseClient
      .auth()
      .onAuthStateChanged(user => this.setState({
        isAuthenticated: !!user,
        userId: !!user && user.uid
      }))
  }

  render() {
    const childProps = {
      userHasAuthenticated: this.userHasAuthenticated,
      ...this.state
    }

    return (
      <div className="App">
        <AppHeader {...childProps} />
        <Grid container className="AppRoutesContainer">
          <Grid item xs={12}>
            <Routes childProps={childProps} />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default App
