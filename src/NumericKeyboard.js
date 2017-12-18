import './NumericKeyboard.css'

import React, { Component } from 'react'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'

export default class NumericKeyboard extends Component {
  onKeyPressed = event => {
    if (this.props.onKeyPressed) {
      try {
        const number = event.target.name || event.target.parentElement.name
        this.props.onKeyPressed(Number(number))
      } catch (error) {
        console.log(error)
      }
    }
  }

  render() {
    return (
      <Grid container spacing={0} alignItems="stretch">
        <Grid item xs={12}>
          <Grid container spacing={0} justify="center" alignItems="stretch">
            {[1,2,3].map(i => <Grid item xs={4} key={i}><Button name={i} onClick={this.onKeyPressed} className="NumericKeyboard-Button" raised color="accent">{i}</Button></Grid>)}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={0} justify="center" alignItems="stretch">
            {[4,5,6].map(i => <Grid item xs={4} key={i}><Button name={i} onClick={this.onKeyPressed} className="NumericKeyboard-Button" raised color="accent">{i}</Button></Grid>)}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={0} justify="center" alignItems="stretch">
            {[7,8,9].map(i => <Grid item xs={4} key={i}><Button name={i} onClick={this.onKeyPressed} className="NumericKeyboard-Button" raised color="accent">{i}</Button></Grid>)}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={0} justify="center" alignItems="stretch">
            {[0].map(i => <Grid item xs={4} key={i}><Button name={i} onClick={this.onKeyPressed} className="NumericKeyboard-Button" raised color="accent">{i}</Button></Grid>)}
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
