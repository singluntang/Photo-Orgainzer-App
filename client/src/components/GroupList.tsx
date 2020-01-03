import * as React from 'react'
import { GroupModel } from '../types/GroupModel'
import { Group } from './Group'
import { getGroups } from '../api/groups-api'
import { History } from 'history'
import styled from 'styled-components';


const GroupListStyle = styled.div`
  margin-top: 50px;
`;
const GroupStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 20px;
  border-radius: 10px;
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

interface GroupsListProps {
  history: History
}

interface GroupsListState {
  groups: GroupModel[]
}

export default class GroupList extends React.PureComponent<GroupsListProps, GroupsListState> {
  state: GroupsListState = {
    groups: []
  }

  handleCreateGroup = () => {
    this.props.history.push(`/groups/create`)
  }

  async componentDidMount() {
    try {
      const groups = await getGroups()
      this.setState({
        groups
      })
    } catch (e) {
      alert(`Failed to fetch groups: ${e.message}`)
    }
  }

  render() {
    return (
        <GroupListStyle>
          <Button
            onClick={this.handleCreateGroup}
          >
            Create new group
          </Button> 
          <GroupStyle>         
            {this.state.groups.map(group => {
                return <Group key={group.id} group={group} />
            })}            
          </GroupStyle>         
        </GroupListStyle>            
    )
  }
}
