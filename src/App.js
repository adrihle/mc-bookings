import React from 'react'
import './App.css'
import { Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import posed, { PoseGroup } from 'react-pose'

import View1 from './views/View1'
import Login from './views/Login'
import NavBar from './components/NavBar'

const history = createBrowserHistory()

const RouteContainer = posed.div({
  enter:{
      opacity: 1, delay: 100, beforeChildren: true
  },
  exit: {
      opacity: 0
  }
})

const routesUrl = {
  view1: '/view1',
  view2: '/view2',
  view3: '/view3',
  view4: '/view4'
}

export default function App (){
  return (
    <Router history={history}>
      <NavBar history={history} />
      <Route
        render={({ location }) => (
          <div id="site-container">
                        <PoseGroup>
                            <RouteContainer key={location.pathname}>
                              <Switch>
                                  <Route path={'/'} exact component={View1}/>
                                  <Route path={'/signin'} component={Login} />
                              </Switch>
                            </RouteContainer>
                        </PoseGroup>
                    </div>
        )}/>
    </Router>
  )
}
