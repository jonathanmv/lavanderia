import React, { Component } from 'react'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'

import { Title, Subheading } from './Texts'

import * as api from './api'

export default class States extends Component {
  constructor(props) {
    super(props)
    this.state = { name: '', notification: null, saving: false }
  }

  handleSubmit = async event => {
    event.preventDefault()
    try {
      const { userId } = this.props
      this.setState({ notification: 'Saving...', saving: true })
      await api.addUserDefinedState(userId, this.state.name)
      this.setState({ notification: 'Saved', name: '', saving: false })
    } catch (error) {
      this.setState({ notification: error.message || error || 'Unknown error', saving: false })
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
        <Grid item xs={12}>
          <Subheading>Existing States</Subheading>
        </Grid>
      </Grid>
    )
  }
}
