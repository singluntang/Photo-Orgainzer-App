import * as React from 'react'
//import { FeedModel } from '../types/FeedModel'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

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
  font-size: 24px;
  font-family: udagramCardHeader;
`;
const CardContent= styled.div`
  padding: 26px 20px;
  width: 100%;
`;
const CardDescription = styled.div`
    padding: 26px 20px;
    width: 100%;
`;
const CardFooter = styled.div`
  padding: 26px 20px;
  width: 100%;
`;

interface FeedCardProps {
  //Feed: FeedModel
}


interface FeedCardState {
}

export class FeedItem extends React.PureComponent<FeedCardProps, FeedCardState> {

  render() {
    return (
        <Card>
            <CardHeader>
                Hey guys check out the images, i just brought a new Car!
            </CardHeader>
            <CardContent>
                <img src={ require('../car2.jpeg') } width='90%'/>
            </CardContent>            
            <CardDescription>Hey looks great! hope can have a ride.</CardDescription>
            <CardFooter></CardFooter>
        </Card>        
    )
  }
}
