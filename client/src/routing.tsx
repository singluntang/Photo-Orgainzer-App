import React from 'react'
import Auth from './auth/Auth'
import { Router, Route } from 'react-router-dom'
import Callback from './components/Callback'
const createHistory = require("history")
import Login from '../src/components/Login';
import App from './App';
import { localauthconfig, stage } from './config'


const history = createHistory.createBrowserHistory()

let auth: Auth
auth = new Auth(history)

const handleAuthentication = (props: any) => {
  const location = props.location
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
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
          path="/prod/login"
          render={props => {
            return <Login auth={auth} {...props} />
          }}
        />                 

        <Route
          path="/dev/login"
          exact
          render={props => {
            OfflineAuthentication()
            return <App {...props} auth={auth} />
          }}
        /> 

        <Route
          exact
          path={`/callback`}
          render={props => {
            handleAuthentication(props)
            return <Callback />
          }}
        /> 

        <Route 
          path={`/${stage}`}                 
          render={props => {
            return <App {...props} auth={auth} />
          }}
        />              
                         
          
      </div>
    </Router>
  )
}