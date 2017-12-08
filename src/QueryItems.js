import React, { Component } from 'react'
import firebaseClient from './firebaseClient'

export default class QueryItems extends Component {
  constructor(props) {
    super(props)
    this.state = { item: null, reference: null }
  }

  componentWillUnmount() {
    const { reference } = this.state
    if (reference) {
      reference.off()
    }
  }

  query(event) {
    event.preventDefault()

    const user = firebaseClient.auth().currentUser
    if (!user) {
      return
    }

    const key = event.target.key.value
    let { reference } = this.state
    if (reference) {
      reference.off()
    }

    const path = `${user.uid}/items/${key}`
    reference = firebaseClient.database().ref(path)
    reference.on('value', snapshot => this.setState({ item: snapshot.val() }))
    this.setState({ reference })
  }

  render() {
    const { key, state, updatedAt } = this.state.item || {}
    return (
      <form onSubmit={this.query.bind(this)}>
        <h1>Query Items</h1>
        <label htmlFor="key">Key</label>
        <input type="text" name="key" id="key" />
        <input type="submit" value="query"/>

        { key && (
          <div className="ResultItem">
            <h2>Item</h2>
            { key && <p>{key} - {state} - {updatedAt}</p>}
          </div>
        )}
      </form>
    )
  }
}
