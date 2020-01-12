import React from 'react'
import Auth from './auth/Auth'
import { Router, Route } from 'react-router-dom'
import Callback from './components/Callback'
const createHistory = require("history")
import Login from '../src/components/Login';
import FeedList from './components/FeedList'
import CreateFeed from './components/CreateFeed'


const history = createHistory.createBrowserHistory()

const auth = new Auth(history)

const handleAuthentication = (props: any) => {
  const location = props.location
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}

export const makeAuthRouting = () => {
  return (
    <Router history={history}>
      <div>
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props)
            return <Callback />
          }}
        />
        
        <Route
          exact
          path="/"
          render={props => {
            return <Login auth={auth} {...props} />
          }}
        /> 
        
        <Route
          path="/feeds/:groupId"
          exact
          render={props => {
            return <FeedList {...props} auth={auth} />
          }}
        />         

        <Route
          path="/groups/:groupId/feeds"
          exact
          render={props => {
            return <CreateFeed {...props} auth={auth} />
          }}
        />         
       
          
      </div>
    </Router>
  )
}