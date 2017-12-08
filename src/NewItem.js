import React, { Component } from 'react'
import firebaseClient from './firebaseClient'
import Input, { InputLabel } from 'material-ui/Input'
import Button from 'material-ui/Button'
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form'
import Radio, { RadioGroup } from 'material-ui/Radio'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'

export default class NewItem extends Component {
  constructor(props) {
    super(props)
    this.state = { item: null, key: '', state: 'NEW' }
  }

  handleSubmit = event => {
    event.preventDefault()
    const user = firebaseClient.auth().currentUser
    if (!user) {
      return
    }

    const { key, state } = this.state
    const item = {
      key,
      state,
      updatedAt: new Date().getTime()
    }
    const path = `${user.uid}/items/${key}`
    firebaseClient.database().ref(path).set(item)
    this.setState({ item })
  }

  handleChange = event => this.setState({ [event.target.id || event.target.name]: event.target.value })

  validateForm = () => this.state.key.length > 0 && this.state.state.length

  render() {
    const states = [
      {key: 'NEW', name: 'New' },
      {key: 'STARTED', name: 'Started' },
      {key: 'FINISHED', name: 'Finished' }
    ]
    const { key, state, updatedAt } = this.state.item || {}
    return (
      <div className="NewItem">
        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
          <Typography type="title" gutterBottom>New Item</Typography>
          <FormControl>
            <InputLabel htmlFor="key">Key</InputLabel>
            <Input id="key" type="text" value={this.state.key} onChange={this.handleChange}/>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">State</FormLabel>
            <RadioGroup
              aria-label="state"
              name="state"
              value={this.state.state}
              onChange={this.handleChange}
            >
              { states.map(({name, key}) => <FormControlLabel control={<Radio />} key={key} value={key} label={name} />) }
            </RadioGroup>
          </FormControl>
          <Button raised color="primary" type="submit" disabled={!this.validateForm()}>Add</Button>
        </form>

          { key && (
            <div className="LastItem">
              <h2>Last Item</h2>
              { key && <p>{key} - {state} - {updatedAt}</p>}
            </div>
          )}
      </div>
    )
  }
}
