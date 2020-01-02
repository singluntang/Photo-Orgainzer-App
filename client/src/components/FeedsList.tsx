import * as React from 'react'
import styled from 'styled-components';
//import { FeedModel } from '../types/FeedModel'
import { FeedItem } from './FeedItem'
//import { getfeeds } from '../api/feeds-api'
//import { Card, Button, Divider } from 'semantic-ui-react'
import { History } from 'history'

const FeedList = styled.div`  
  width: 100%;
  display: flex;
  flex-direction: column;
`;

interface feedsListProps {
  history: History
}

interface feedsListState {
  //feeds: FeedModel[]
}

export class FeedsList extends React.PureComponent<feedsListProps, feedsListState> {
  state: feedsListState = {
    feeds: []
  }

  handleCreateFeed = () => {
    this.props.history.push(`/feeds/create`)
  }

  async componentDidMount() {
    try {
      //const feeds = await getfeeds()
      //this.setState({
      //  feeds
      //})
      console.log("Create Feed")
    } catch (e) {
      alert(`Failed to fetch feeds: ${e.message}`)
    }
  }

  render() {
    return (
      <FeedList>
        <FeedItem />
      </FeedList>
    )
  }
}
