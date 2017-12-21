import React, { Component } from 'react'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Chip from 'material-ui/Chip'

import { Title, Subheading } from './Texts'

import * as api from './api'

class ExistingStates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      states: null
    }
  }

  deleteState = key => {
    if (this.props.onRequestDelete) {
      this.props.onRequestDelete(key)
    }
  }

  render() {
    const states = this.props.states || {}
    const keys = Object.keys(states)
    return (
      <Grid item xs={12}>
        <Subheading>Existing States</Subheading>
        {keys.map(key => <Chip
          key={key}
          label={states[key]}
          onClick={event => this.deleteState(key)}
          onRequestDelete={event => this.deleteState(key)} />)}
      </Grid>
    )
  }
}

export default class States extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      saving: false
    }
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const { userId } = this.props
      this.props.notify('Saving...')
      this.setState({ saving: true })
      await api.addUserDefinedState(userId, this.state.name)
      this.loadStates(userId)
      this.props.notify('Saved')
      this.setState({ name: '', saving: false })
    } catch (error) {
      this.props.notify(error.message || error || 'Unknown error')
      this.setState({ saving: false })
    }
  }

  deleteState = async state => {
    try {
      const name = this.state.states[state]
      if (!state || !name) {
        return
      }
      if (window.confirm(`Delete ${name}?`)) {
        await api.deleteUserDefinedState(this.props.userId, state)
        this.loadStates(this.props.userId)
        this.props.notify(`${name} deleted`)
      }
    } catch (error) {
      this.props.notify(error.message || error || 'Unknown error')
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

  loadStates(userId) {
    if (!userId) {
      return
    }

    const reference = api.getUserDefinedStatesReference(userId)
    reference.once('value').then(snapshot => {
      this.setState({ states: snapshot.val() })
    })
  }

  handleChange = event => this.setState({ [event.target.id || event.target.name]: event.target.value })

  validateForm = () => this.state.name.length < 1 || this.state.saving

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Title>States</Title>
        </Grid>
        <Grid item xs={12}>
          <form
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <Subheading>New state</Subheading>
            <FormControl>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
                readOnly={this.state.saving}
              />
            </FormControl>
            <Button raised color="primary" type="submit" disabled={this.validateForm()}>Save</Button>
          </form>
        </Grid>
        <ExistingStates
          states={this.state.states}
          onRequestDelete={this.deleteState}
        />
      </Grid>
    )
  }
}
