import * as React from 'react'
import styled from 'styled-components';
import { FeedModel } from '../types/FeedModel'
import { FeedItem } from './FeedItem'
import { getFeeds } from '../api/feeds-api'
//import { Card, Button, Divider } from 'semantic-ui-react'
import { History } from 'history'

const FeedListStyle = styled.div`  
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface FeedsListProps {
  history: History
  match: {
    params: {
      groupId: string
    }
  }
}

interface feedsListState {
  feeds: FeedModel[]
}

export default class FeedList extends React.PureComponent<FeedsListProps, feedsListState> {
  state: feedsListState = {
    feeds: []
  }

  handleCreateFeed = () => {
    this.props.history.push(`/feeds/create`)
  }

  async componentDidMount() {
    try {
      const feeds = await getFeeds(this.props.match.params.groupId)
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
      <FeedListStyle>
        {this.state.feeds.map(feed => {
            return <FeedItem key={feed.imageId} feed={feed} />
          })}        
      </FeedListStyle>
    )
  }
}
