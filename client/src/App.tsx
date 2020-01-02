import './App.css'
import React, { Component } from 'react'
import { FeedsList } from './components/FeedsList'
import  Header  from './components/Nav'
import { Router, NavLink , Route, Switch } from 'react-router-dom'
import { NotFound } from './components/NotFound'
import { CreateFeed } from './components/CreateFeed'
import Auth from './auth/Auth'
import styled from 'styled-components';

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
`;

export interface AppProps {}

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState {}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  handleLogout() {
    this.props.auth.logout()
  }

  render() {
    return (
          <Body>
            <span className="fontawesome-like">555555</span>
                <Router history={this.props.history}>
                  {this.generateMenu()}

                  {this.generateCurrentPage()}
                </Router>
          </Body>                
    )
  }

  generateMenu() {
    return (
      <Header />
    )
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <NavLink to="/" onClick={this.handleLogout}>
          Log Out
        </NavLink>
      )
    } else {
      return (
        <NavLink to="/" onClick={this.handleLogin}>
          Log In
        </NavLink >
      )
    }
  }

  generateCurrentPage() {
    return (
      <React.Fragment>          
          <Switch>            
            <Route
              path="/Feeds/create"
              exact
              render={props => {
                return <CreateFeed {...props} auth={this.props.auth} />
              }}
            />

            <Route path="/feeds/:FeedId" exact component={FeedsList} />

            <Route
              path="/feeds/:FeedId/create"
              exact
              render={props => {
                return <CreateFeed {...props} auth={this.props.auth} />
              }}
            />

            <Route path="/" exact component={FeedsList} />

            <Route component={NotFound} />            
          </Switch>
      </React.Fragment>          
    )
  }
}
