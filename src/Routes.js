import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewItem from './NewItem'
import QueryItems from './QueryItems'
import Login from './Login'
import AppliedRoute from './AppliedRoute'

export default ({ childProps }) => (
  <Switch>
    <Route path="/" exact component={QueryItems} />
    <Route path="/newItem" exact component={NewItem} />
    <Route path="/queryItems" exact component={QueryItems} />
    <AppliedRoute path="/login" exact component={Login} props={childProps}/>
  </Switch>
)
