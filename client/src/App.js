import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Index from './pages/Index'
import './global.css'

const about = () => <div>about page</div>

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/about" component={about} />
    </Switch>
  </Router>
)
