import React, { Component } from 'react'
import * as api from './api'

import NumericKeyboard from './NumericKeyboard'
import { Display1 } from './Texts'

import Grid from 'material-ui/Grid'

export default class QueryItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: null
    }
  }

  queryItem = async (code, keyboard) => {
    const { userId } = this.props
    try {
      const item = await api.getUserItem(userId, code)
      this.setState({ item })
      if (item) {
        keyboard.removeAllNumbers()
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { key, state, updatedAt } = this.state.item || {}
    const text = key ? `${key} - ${state} - ${updatedAt}` : 'Enter a code'

    return (
      <Grid container direction="column" justify="space-between" alignItems="stretch">
        <Grid item style={{ textAlign: 'center' }}>
          <Display1>
            {text}
          </Display1>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <NumericKeyboard onNumber={this.queryItem} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
