import '../App.css'
import React, { Component } from 'react'
import App  from '../App'
import { Route, Switch } from 'react-router-dom'
import Auth from '../auth/Auth'
import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: #5199FF;
  border: 2px solid #5199FF;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  &:hover {
    background-color: #5199FF;
    color: white;
  }
`;

export interface AppProps {}

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState {}

export default class Login extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  render() {
    return (
        <React.Fragment>
            {(!this.props.auth.isAuthenticated()) && (
                <Button onClick={this.handleLogin}>
                   Log In
                </Button >          
            )}                 
            
            {(this.props.auth.isAuthenticated()) && (
                this.generateCurrentPage()          
            )} 
        </React.Fragment>
    )
  }

  generateCurrentPage() {
    return (
          <Route
          path="/"
          exact
          render={props => {
            return <App {...props} auth={this.props.auth} />
          }}
        />      
    )
  }  

}
