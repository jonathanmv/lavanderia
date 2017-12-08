import './Auth.css'
import React, { Component } from 'react'
import firebaseClient from './firebaseClient'

class SignedIn extends Component {
  signOut(event) {
    event.preventDefault()
    firebaseClient.auth().signOut()
  }
  render() {
    const { displayName } = this.props
    return (
      <div className="SignedIn">
        <p>{displayName}</p>
        <form onSubmit={this.signOut.bind(this)}>
          <input type="submit" value="Logout"/>
        </form>
      </div>
    )
  }
}

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  signIn(event) {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    firebaseClient.auth().signInWithEmailAndPassword(email, password).catch(error => this.setState({ error }))
  }

  render() {
    const { error } = this.state
    return (
      <form onSubmit={this.signIn.bind(this)}>
        { error ? <p>{error.message}</p> : null }
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email"/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password"/>
        <input type="submit" value="Sign In"/>
      </form>
    )
  }
}

class Auth extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
  }

  componentWillMount() {
    firebaseClient.auth().onAuthStateChanged(user => this.setState({ user }))
  }

  render() {
    const { user } = this.state
    return (
      <div className="Auth">
        { user ? <SignedIn {...user} /> : <SignIn /> }
      </div>
    )
  }
}

export default Auth
