import React, { Component } from 'react'
import * as api from './api'

import NumericKeyboard from './NumericKeyboard'
import { Display1 } from './Texts'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import DoneIcon from 'material-ui-icons/Done'

export default class QueryItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: null,
      code: ''
    }
  }

  queryItem = async () => {
    const { userId } = this.props
    let { code } = this.state
    try {
      const item = await api.getUserItem(userId, code)
      if (item) {
        code = ''
      }
      this.setState({ item, code })
    } catch (error) {
      console.log(error)
    }
  }

  onCodeChange = code => this.setState({ code })

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
              <NumericKeyboard value={this.state.code} onChange={this.onCodeChange} />
            </Grid>
          </Grid>
          <Grid item style={{ textAlign: 'center'}}>
            <Button fab color="primary" onClick={this.queryItem}>
              <DoneIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
