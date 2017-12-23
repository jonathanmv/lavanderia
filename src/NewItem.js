import React, { Component } from 'react'
import Button from 'material-ui/Button'
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form'
import Radio, { RadioGroup } from 'material-ui/Radio'
import Grid from 'material-ui/Grid'

import AddIcon from 'material-ui-icons/Add'

import * as api from './api'

import NumericKeyboard from './NumericKeyboard'
import Item from './Item'
import { Display1 } from './Texts'

export default class NewItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: null,
      key: '',
      state: null,
      userDefinedStates: null
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

  handleSubmit = event => {
    event.preventDefault()
    const { key, state } = this.state
    const item = {
      key,
      state,
      updatedAt: new Date().getTime()
    }
    try {
      const { userId } = this.props
      if (!userId) {
        return
      }
      api.setUserItem(userId, key, item)
      this.setState({ item, key: '' })
      this.props.notify(`${key} (${state}) saved`)
    } catch (error) {
      console.error(error);
      this.setState({ key, state })
    }
  }

  handleChange = event => this.setState({ [event.target.id || event.target.name]: event.target.value })

  validateForm = () => this.state.key.length > 0 && this.state.state && this.state.state.length

  loadStates(userId) {
    if (!userId) {
      return
    }

    const statesReference = api.getUserDefinedStatesReference(userId)
    statesReference.once('value').then(snapshot => {
      const userDefinedStates = snapshot.val()
      const state = Object.keys(userDefinedStates || {})[0]
      this.setState({ userDefinedStates, state })
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
    const { userDefinedStates, item} = this.state

    return (
      <Grid container direction="column" justify="space-between" alignItems="stretch">
        <Grid item>
          <Item item={item} />
        </Grid>
        <Grid item>
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <Grid container direction="column">
              <Grid item>
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
              </Grid>
              <Grid item>
                <FormControl>
                  <FormLabel component="legend">Code</FormLabel>
                  <NumericKeyboard value={this.state.key} onChange={value => this.handleChange({ target: { id: 'key', value } })}/>
                </FormControl>
              </Grid>
              <Grid item style={{ textAlign: 'center'}}>
                <Button fab color="primary" type="submit" disabled={!this.validateForm()}>
                  <AddIcon />
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    )
  }
}
