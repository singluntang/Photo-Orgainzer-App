import * as React from 'react'
import { FeedModel } from '../types/FeedModel'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

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
const CardFont = styled.div`
  font-size: 28px;
  color: grey;
`;
const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  padding: 26px 20px;
  width: 100%;
  font-size: 16px;
  align-items: center;
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
                <img src={this.props.feed.imageUrl} width='90%'/>
            </CardContent>            
            <CardDescription>{this.props.feed.description}</CardDescription>
            <CardFooter>
                <CardFont>
                    <FontAwesomeIcon icon={faThumbsUp} />
                </CardFont>
                &nbsp;&nbsp;20 Likes
            </CardFooter>
        </Card>        
    )
  }
}
