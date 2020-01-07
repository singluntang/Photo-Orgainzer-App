import * as React from 'react'
import styled from 'styled-components';
import { FeedModel } from '../types/FeedModel'
import { FeedItem } from './FeedItem'
import { getFeeds } from '../api/feeds-api'
import { History } from 'history'
import Auth from '../auth/Auth'

const FeedStyle = styled.div`
  margin-top: 50px;
`;
const FeedListStyle = styled.div`  
  width: 100%;
  display: flex;
  flex-direction: column;
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

interface FeedsListProps {
  history: History
  match: {
    params: {
      groupId: string
    }
  },
  auth: Auth
}

interface feedsListState {
  feeds: FeedModel[]
}

export default class FeedList extends React.PureComponent<FeedsListProps, feedsListState> {
  state: feedsListState = {
    feeds: []
  }

  handleCreateFeed = () => {
    this.props.history.push(`/groups/${this.props.match.params.groupId}/feeds`)
  }

  async componentDidMount() {
    try {
      const feeds = await getFeeds(this.props.match.params.groupId, this.props.auth.idToken)
      this.setState({
        feeds
      })
      console.log("Create Feed")
    } catch (e) {
      alert(`Failed to fetch feeds: ${e.message}`)
    }
  }

  render() {
    return (
      <FeedStyle>
            <Button
            onClick={this.handleCreateFeed}
            >
            New Feed
          </Button>       
          <FeedListStyle>
            {this.state.feeds.map(feed => {                
                return <FeedItem key={feed.imageId} feed={feed} />
              })}        
          </FeedListStyle>
      </FeedStyle>
    )
  }
}
