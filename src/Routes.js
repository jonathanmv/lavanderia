import React from 'react'
import { Route, Switch } from 'react-router-dom'
import NewItem from './NewItem'
import QueryItems from './QueryItems'
import Login from './Login'
import States from './States'
import AppliedRoute from './AppliedRoute'

export default ({ childProps }) => (
  <Switch>
    <Route path="/" exact component={QueryItems} />
    <AppliedRoute path="/newItem" exact component={NewItem} props={childProps} />
    <Route path="/queryItems" exact component={QueryItems} />
    <AppliedRoute path="/login" exact component={Login} props={childProps}/>
    <AppliedRoute path="/states" exact component={States} props={childProps}/>
  </Switch>
)
