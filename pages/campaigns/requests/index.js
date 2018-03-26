import React,{ Component } from 'react';
import { Form, Button, Input, Message, Table } from "semantic-ui-react";
import Layout from '../../../components/Layout'
import factory from '../../../ethereum/factory'
import CampaignFunction from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import { Link,Router } from '../../../routes'
import RequestRow from '../../../components/RequestRow'

class RequestIndex extends Component {

  //because I'm using next.js
  //because next.js uses server rendering (like a servlet)
  //replaces componentDidMount
  //its props are different from the normal props of the CampaignShow
  static async getInitialProps(props) {

    const campaign = CampaignFunction(props.query.address);
    const requestCount = await campaign.methods.getRequestCount().call();

    const approversCount = await campaign.methods.approversCount().call();
    console.log('approversCount: ',approversCount)
    console.log('requestCount: ',requestCount)
    //because of solidity I cannot get an array of
    //getRequests(), so I have to solve it in a different way
    //I cannot resolve an array of struct in solidity, so
    //I have to get them one by one
    let arr = new Array(parseInt(requestCount));
    console.log('reqArr: ',arr);
    const requests = await Promise.all(
      arr.fill().map((element,index) => {
        console.log('request index: ',index)
        return campaign.methods.requests(index).call()
      })
    );

    console.log(requests);
    //it goes to props
    return {
      campaignAddress:props.query.address,
      requests,
      requestCount,
      approversCount
     };
  }

  renderRow = () => {
    return (
      this.props.requests.map((request,index) => {
        return (
          <RequestRow
            key={index}
            id={index}
            request={request}
            campaignAddress={this.props.campaignAddress}
            approversCount={this.props.approversCount}
          />
        )
      })
    )
  }

  render(){

    const {Header, Row, HeaderCell, Body} = Table;
    return(
      <Layout>
        <h1>Request List</h1>
        <Link route={`/campaigns/${this.props.campaignAddress}/requests/new`} >
          <a>
            <Button
              primary
              floated="right"
              style={{marginBottom:10}}>Add Request</Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>
        <div>found {this.props.requestCount} requests.</div>
      </Layout>
    )
  }

}
export default RequestIndex;
