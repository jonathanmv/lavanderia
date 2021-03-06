import React from 'react'
import { Switch } from 'react-router-dom'
import NewItem from './NewItem'
import QueryItems from './QueryItems'
import Login from './Login'
import States from './States'
import AppliedRoute from './AppliedRoute'

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={QueryItems} props={childProps}/>
    <AppliedRoute path="/newItem" exact component={NewItem} props={childProps} />
    <AppliedRoute path="/queryItems" exact component={QueryItems} props={childProps}/>
    <AppliedRoute path="/login" exact component={Login} props={childProps}/>
    <AppliedRoute path="/states" exact component={States} props={childProps}/>
  </Switch>
)
