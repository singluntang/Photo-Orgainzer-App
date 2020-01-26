import * as React from 'react'
import { GroupModel } from '../types/GroupModel'
import { Group } from './Group'
import { createGroup } from '../api/groups-api'
import { History } from 'history'
import styled from 'styled-components';
import Auth from '../auth/Auth'
import {NavBar} from './Nav'


const GroupListStyle = styled.div`
  margin-top: 50px;
`;
const GroupStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

interface GroupsListProps {
  auth: Auth,
  history: History
}

interface GroupsListState {
  groups: GroupModel[]
}

export default class GroupList extends React.PureComponent<GroupsListProps, GroupsListState> {
  state: GroupsListState = {
    groups: []
  }

  async componentDidMount() {
    try {
      const groups: any = await createGroup(this.props.auth.idToken)
      this.setState({
        groups
      })
    } catch (e) {
      alert(`Failed to fetch groups: ${e.message}`)
    }
  }

  render() {
    return (
      <React.Fragment>
          <NavBar {...this.props} auth={this.props.auth} />        
        <GroupListStyle> 
          <GroupStyle>         
            {this.state.groups.map(group => {
                return <Group key={group.id} group={group} />
            })}            
          </GroupStyle>         
        </GroupListStyle>  
      </React.Fragment>         
    )
  }
}
