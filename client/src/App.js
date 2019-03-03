import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Index from './pages/Index'
import Admin from './pages/Admin'
import './global.css'

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/admin" component={Admin} />
    </Switch>
  </Router>
)
