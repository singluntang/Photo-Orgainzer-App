import * as React from 'react'
import { FeedModel } from '../types/FeedModel'
import styled from 'styled-components';
import { deleteFeed  } from '../api/feeds-api'
import Auth from '../auth/Auth'

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
  display: flex;
  flex-direction: row;  
`;
const CardHeaderTitle = styled.div`
  padding: 26px 20px;
  width: 98%;
`;
const CardHeaderDelete = styled.div`
  padding: 26px 20px;
  width: 2%;
  align-text: right;
  color: red;
  font-weight: bold;
  font-size: 26px;
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
  feed: FeedModel,
  refreshFeed: any,
  auth: Auth,
}


interface FeedCardState {
}


export class FeedItem extends React.PureComponent<FeedCardProps, FeedCardState> {

  handleDeleteFeed = async (event: any, imageId: string) => {  
    event.preventDefault(); 
    const deleteSuccess = await deleteFeed(imageId, this.props.auth.idToken)
    if (deleteSuccess) {
      this.props.refreshFeed(this.props.feed.groupId, this.props.auth.idToken)
    }
    else {
      alert('Delete Error')
    }
  }



  render() {   
    return (
        <Card>
            <CardHeader>
                <CardHeaderTitle>
                    {this.props.feed.title}
                </CardHeaderTitle>
                <CardHeaderDelete>
                    <a href="#" onClick={(event: any) => this.handleDeleteFeed(event, this.props.feed.imageId)}>x</a>
                </CardHeaderDelete>                
            </CardHeader>
            <CardContent>
                <img src={this.props.feed.imageUrl}/>
            </CardContent>            
            <CardDescription>{this.props.feed.description}</CardDescription>
        </Card>        
    )
  }
}
