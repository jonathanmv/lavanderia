import React, { Component } from 'react'
import * as api from './api'

import NumericKeyboard from './NumericKeyboard'
import { Display1 } from './Texts'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import BackspaceIcon from 'material-ui-icons/Backspace'
import SearchIcon from 'material-ui-icons/Search'
import ClearIcon from 'material-ui-icons/Clear'

export default class QueryItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: [],
      item: null
    }
  }

  queryItem = async () => {
    const code = this.state.code.join('')
    const { userId } = this.props
    try {
      const item = await api.getUserItem(userId, code)
      this.setState({ item })
    } catch (error) {
      console.log(error)
    }
  }

  onNumber = number => {
    this.setState({ code: [...this.state.code, number] })
  }

  removeLastNumber = () => {
    this.setState({ code: this.state.code.slice(0, -1)})
  }

  removeAllNumbers = () => {
    this.setState({ code: [] })
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
              <Grid container>
                <Grid item>
                  <Button style={{ touchAction: 'none', width: '100%', height: '100%' }} aria-label="Clear" onClick={this.removeAllNumbers}>
                    <ClearIcon />
                  </Button>
                </Grid>
                <Grid item style={{ textAlign: 'center', flex: 1 }}>
                  <Display1>{this.state.code.join('')}</Display1>
                </Grid>
                <Grid item>
                  <Button style={{ touchAction: 'none', width: '100%', height: '100%' }} aria-label="Backspace" onClick={this.removeLastNumber}>
                    <BackspaceIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <NumericKeyboard onKeyPressed={this.onNumber} />
            </Grid>
            <Grid item style={{ textAlign: 'center'}}>
              <Button fab color="primary" onClick={this.queryItem}>
                <SearchIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
