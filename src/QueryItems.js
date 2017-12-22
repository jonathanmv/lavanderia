import React, { Component } from 'react'
import * as api from './api'

import NumericKeyboard from './NumericKeyboard'
import Item from './Item'
import { Display1 } from './Texts'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import SearchIcon from 'material-ui-icons/Search'

export default class QueryItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: null,
      code: ''
    }
  }

  queryItem = () => {
    const { userId } = this.props
    let { code } = this.state
    api.getUserItem(userId, code).then(item => {
      if (item) {
        code = ''
      } else {
        this.props.notify(`${code} not found`)
      }
      this.setState({ item, code })
    }).catch(error => console.error(error))
  }

  onCodeChange = code => this.setState({ code })

  render() {
    const { item } = this.state

    return (
      <Grid container direction="column" justify="space-between" alignItems="stretch">
        <Grid item>
          <Item item={item} />
        </Grid>
        <Grid item>
          <NumericKeyboard value={this.state.code} onChange={this.onCodeChange} />
        </Grid>
        <Grid item style={{ textAlign: 'center'}}>
          <Button fab color="primary" onClick={this.queryItem}>
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>
    )
  }
}
