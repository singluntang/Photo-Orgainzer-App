import * as React from 'react'
import { Link } from 'react-router-dom'
import { GroupModel } from '../types/GroupModel'
import styled from 'styled-components';

const GroupLegend = styled.div`
  margin-top: 80px;
  fieldset {
    width: 250px;
    border: 1px solid #dcdcdc;
    border-radius: 10px;
    padding: 20px;
    text-align: right;}
  legend {
    background-color: #efefef;
    border: 1px solid #dcdcdc;
    border-radius: 10px;
    padding: 10px 20px;
    text-align: left;
    text-transform: uppercase;}
`;
const GroupDescription = styled.div`
  font-size: 16px;
  text-align: center;
  text-decoration: none;
`;

interface GroupCardProps {
  group: GroupModel
}

interface GroupCardState {
}

export class Group extends React.PureComponent<GroupCardProps, GroupCardState> {

  render() {
    return (
      <GroupLegend>
          <fieldset>
            <legend>{this.props.group.name}</legend>
            <GroupDescription>
            <Link to={`/feeds/${this.props.group.id}`}>{this.props.group.description}</Link>
            </GroupDescription>
          </fieldset>            
      </GroupLegend>
    )
  }
}
