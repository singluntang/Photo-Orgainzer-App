import * as React from 'react'
import { FeedModel } from '../types/FeedModel'
import styled from 'styled-components';

const Card = styled.div`
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.0975);
  width: 60%;
  margin-top: 10px;
  margin-bottom: 20px;
  border: solid 1px #5199FF;
  box-shadow: 0 0 5px gray;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`;
const CardHeader = styled.div`
  padding: 26px 20px;
  width: 100%;
`;
const CardContent= styled.div`
  padding: 26px 20px;
  width: 100%;
`;
const CardDescription = styled.div`
    padding: 26px 20px;
    width: 100%;
    font-size: 24px;
    font-family: udagramCardHeader;
`;

interface FeedCardProps {
  feed: FeedModel
}


interface FeedCardState {
}

export class FeedItem extends React.PureComponent<FeedCardProps, FeedCardState> {

  render() {   
    return (
        <Card>
            <CardHeader>
                {this.props.feed.title}
            </CardHeader>
            <CardContent>
                <img src={this.props.feed.imageUrl}/>
            </CardContent>            
            <CardDescription>{this.props.feed.description}</CardDescription>
        </Card>        
    )
  }
}
