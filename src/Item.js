import React, { Component } from 'react'
import moment from 'moment'

import Paper from 'material-ui/Paper'

import { Headline, Title } from './Texts'
import * as api from './api'

const style = {
  container: {
    padding: '1rem'
  }
}

export default class Item extends Component {
  render() {
    const { item } = this.props
    if (!item) {
      return null
    }

    const { key, state, updatedAt } = item
    const stateName = api.getStateName(state)
    const date = moment(updatedAt).fromNow()
    return (
      <Paper style={style.container}>
        <Headline>{key} - {stateName}</Headline>
        <Title>Last Updated {date} </Title>
      </Paper>
    )
  }
}
