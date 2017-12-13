import React, { Component } from 'react'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
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

  loadStates(userId) {
    if (!userId) {
      return
    }

    const reference = api.getUserDefinedStatesReference(userId)
    if (this.state.reference) {
      this.state.reference.off()
    }
    console.log('loading');
    reference.on('value', snapshot => {
      this.setState({ states: snapshot.val() })
    })
    this.setState({ reference })
  }

  componentWillMount() {
    this.loadStates(this.props.userId)
  }

  componentWillReceiveProps({ userId }) {
    if (userId !== this.props.userId) {
      this.loadStates(userId)
    }
  }

  componentWillUnmount() {
    if (this.state.reference) {
      console.log('off');
      this.state.reference.off()
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
        this.props.notify(`${name} deleted`)
      }
    } catch (error) {
      this.props.notify(error.message || error || 'Unknown error')
    }
  }

  render() {
    const states = this.state.states || {}
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
    this.state = { name: '', notification: null, saving: false }
  }

  notify(error, stateProps = {}) {
    this.setState({ notification: error.message || error || 'Unknown error', ...stateProps })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const { userId } = this.props
      this.notify('Saving...', { saving: true })
      await api.addUserDefinedState(userId, this.state.name)
      this.notify('Saved', { name: '', saving: false })
    } catch (error) {
      this.notify(error.message || error || 'Unknown error', { saving: false })
    }
  }

  handleChange = event => this.setState({ [event.target.id || event.target.name]: event.target.value })

  validateForm = () => this.state.name.length < 1 || this.state.saving

  handleRequestClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.setState({ notification: null })
  }

  render() {
    const childProps = {
      notify: this.notify.bind(this),
      ...this.props
    }

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
            <Snackbar
              autoHideDuration={2000}
              open={!!this.state.notification}
              onRequestClose={this.handleRequestClose}
              SnackbarContentProps={{
                'aria-describedby': 'notification-id',
              }}
              message={<span id="notification-id">{this.state.notification}</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.handleRequestClose}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
          </form>
        </Grid>
        <ExistingStates {...childProps} />
      </Grid>
    )
  }
}
