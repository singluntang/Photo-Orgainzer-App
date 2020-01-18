import './App.css'
import React, { Component } from 'react'
import FeedList from './components/FeedList'
import  GroupList  from './components/GroupList'
import { Router, Link , Route, Switch } from 'react-router-dom'
import { NotFound } from './components/NotFound'
import  CreateFeed  from './components/CreateFeed'
import Auth from './auth/Auth'
import styled from 'styled-components';
import { stage } from './config'

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
`;

const Nav = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
`;
const NavHeader = styled.div`
  padding: 26px 20px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const NavLeft = styled.div`
  width: 33.333%;
  text-align: left;
`;
const NavCenter = styled.div`
  width: 33.333%;
`;
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
const NavRight = styled.div`
  width: 33.333%;
  text-align: right;
  svg {
    margin-right: 20px;
  }
`;
const NavLogo = styled(NavLeft)`
  font-family: udagramLogo;
  font-size: 48px;
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

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    this.props.auth.logout()
  }

  render() {
    return (
          <Body>
                <Router history={this.props.history}>
                    {this.generateCurrentPage()}
                </Router>
          </Body>                
    )
  }

  generateCurrentPage() {
    return (
      <Switch>
        <Route
          path={`/${stage}/feeds/:groupId`}
          exact
          render={props => {
            return <FeedList {...props} auth={this.props.auth} />
          }}
        />         

        <Route
          path={`/${stage}/groups/:groupId/feeds`}
          exact
          render={props => {
            return <CreateFeed {...props} auth={this.props.auth} />
          }}
        />         

        <Route
          path={`/${stage}`}
          exact
          render={props => {
            return <GroupList {...props} auth={this.props.auth} />
          }}
        />        
        
        <Route component={NotFound} />
      </Switch>
    )
  }
}
