import './NumericKeyboard.css'

import React, { Component } from 'react'

import { Display1 } from './Texts'

import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import BackspaceIcon from 'material-ui-icons/Backspace'
import DoneIcon from 'material-ui-icons/Done'
import ClearIcon from 'material-ui-icons/Clear'

export default class NumericKeyboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numbers: []
    }
  }

  onKeyPressed = event => {
    const number = event.target.name || event.target.parentElement.name
    this.setState({ numbers: [...this.state.numbers, Number(number)] })
  }

  removeLastNumber = () => {
    this.setState({ numbers: this.state.numbers.slice(0, -1)})
  }

  removeAllNumbers = () => {
    this.setState({ numbers: [] })
  }

  dispatchOnNumber = () => {
    if (this.props.onNumber) {
      try {
        this.props.onNumber(this.state.numbers.join(''))
      } catch (error) {
        console.error(error)
      }
    }
  }

  render() {
    return (
      <Grid container spacing={0} alignItems="stretch">
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Button style={{ touchAction: 'none', width: '100%', height: '100%' }} aria-label="Clear" onClick={this.removeAllNumbers}>
                <ClearIcon />
              </Button>
            </Grid>
            <Grid item style={{ textAlign: 'center', flex: 1 }}>
              <Display1>{this.state.numbers.join('')}</Display1>
            </Grid>
            <Grid item>
              <Button style={{ touchAction: 'none', width: '100%', height: '100%' }} aria-label="Backspace" onClick={this.removeLastNumber}>
                <BackspaceIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
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
        <Grid item xs={12} style={{ textAlign: 'center'}}>
          <Button fab color="primary" onClick={this.dispatchOnNumber}>
            <DoneIcon />
          </Button>
        </Grid>
      </Grid>
    )
  }
}
