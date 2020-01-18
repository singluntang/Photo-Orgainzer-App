import React from 'react'
import Auth from './auth/Auth'
import { Router, Route } from 'react-router-dom'
import Callback from './components/Callback'
const createHistory = require("history")
import Login from '../src/components/Login';
import App from './App';
import FeedList from './components/FeedList'
import CreateFeed from './components/CreateFeed'
import { localauthconfig, stage } from './config'


const history = createHistory.createBrowserHistory()

const auth = new Auth(history)

const handleAuthentication = (props: any) => {
  const location = props.location
  
  if (/access_token|id_token|error/.test(location)) {
    auth.handleAuthentication()
    console.log("Location", location)
  }
  
  props.history.push(`/${stage}`)
}

const OfflineAuthentication = () => {
      auth.idToken = localauthconfig.id_token
      auth.accessToken = localauthconfig.access_token
      auth.expiresAt = parseInt(localauthconfig.expires_at)
}

export const makeAuthRouting = () => {
  return (
    <Router history={history}>
      <div>
        <Route
          exact
          path={`/callback`}
          render={props => {
            handleAuthentication(props)
            return <Callback />
          }}
        />

        <Route
          path={`/dev`}
          exact
          render={props => {
            OfflineAuthentication()
            return <App {...props} auth={auth} />
          }}
        />            
        
        <Route
          exact
          path="/prod"
          render={props => {
            return <Login auth={auth} {...props} />
          }}
        /> 
        
        <Route
          path={`/${stage}/feeds/:groupId`}
          exact
          render={props => {
            return <FeedList {...props} auth={auth} />
          }}
        />         

        <Route
          path={`/${stage}/groups/:groupId/feeds`}
          exact
          render={props => {
            return <CreateFeed {...props} auth={auth} />
          }}
        />         
       
          
      </div>
    </Router>
  )
}