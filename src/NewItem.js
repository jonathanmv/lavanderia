import React, { Component } from 'react'
import Input, { InputLabel } from 'material-ui/Input'
import Button from 'material-ui/Button'
import { FormGroup, FormControl, FormLabel, FormControlLabel } from 'material-ui/Form'
import Radio, { RadioGroup } from 'material-ui/Radio'
import Typography from 'material-ui/Typography'

import NumericKeyboard from './NumericKeyboard'

import * as api from './api'

export default class NewItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: null,
      key: '',
      state: 'NEW',
      userDefinedStates: null,
      statesReference: null
    }
  }

  componentWillMount() {
    this.loadStates(this.props.userId)
  }

  componentWillReceiveProps({ userId }) {
    if (userId !== this.props.userId) {
      this.loadStates(userId)
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const { userId } = this.props
      if (!userId) {
        return
      }

      const { key, state } = this.state
      const item = {
        key,
        state,
        updatedAt: new Date().getTime()
      }
      await api.setUserItem(userId, key, item)
      this.setState({ item })
    } catch (error) {

    }
  }

  handleChange = event => this.setState({ [event.target.id || event.target.name]: event.target.value })

  validateForm = () => this.state.key.length > 0 && this.state.state.length

  loadStates(userId) {
    if (!userId) {
      return
    }

    const statesReference = api.getUserDefinedStatesReference(userId)
    statesReference.once('value').then(snapshot => {
      this.setState({ userDefinedStates: snapshot.val() })
    })
  }

  getUserDefinedStates() {
    const { userDefinedStates } = this.state
    if (userDefinedStates) {
      return Object.keys(userDefinedStates).map(key => ({ key, name: userDefinedStates[key] }))
    }

    return []
  }

  render() {
    const states = this.getUserDefinedStates()
    const { key, state, updatedAt } = this.state.item || {}
    const { userDefinedStates } = this.state || {}
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
              row
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
              { key && <p>{key} - {userDefinedStates[state]} - {updatedAt}</p>}
            </div>
          )}
      </div>
    )
  }
}
