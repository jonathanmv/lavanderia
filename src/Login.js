import React, { Component } from 'react'
import Input, { InputLabel } from 'material-ui/Input'
import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';
import firebaseClient from './firebaseClient'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { email: "", password: "" }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  handleChange = event => this.setState({ [event.target.id]: event.target.value })

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const { email, password } = this.state
      await firebaseClient.auth().signInWithEmailAndPassword(email, password)//.catch(error => this.setState({ error }))
      // from childProps in Routes.js
      this.props.userHasAuthenticated(true)
      this.props.history.push('/')
    } catch (error) {
      alert(error)
    }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" type="text" value={this.state.email} onChange={this.handleChange}/>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" value={this.state.password} onChange={this.handleChange}/>
          </FormControl>
          <Button type="submit" disabled={!this.validateForm()}>Login</Button>
        </form>
      </div>
    )
  }
}
