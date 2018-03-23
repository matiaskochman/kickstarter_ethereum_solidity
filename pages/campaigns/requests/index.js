import React,{ Component } from 'react';
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from '../../../components/Layout'
import factory from '../../../ethereum/factory'
import web3 from '../../../ethereum/web3'
import { Link,Router } from '../../../routes'

class RequestIndex extends Component {

  //because I'm using next.js
  //because next.js uses server rendering (like a servlet)
  //replaces componentDidMount
  //its props are different from the normal props of the CampaignShow
  static async getInitialProps(props) {

    //it goes to props
    return {
      campaignAddress:props.query.address,
     };
  }

  render(){
    return(
      <Layout>
        <h1>Request List</h1>
        <Link route={`/campaigns/${this.props.campaignAddress}/requests/new`} >
          <a>
            <Button primary>Add Request</Button>
          </a>
        </Link>
      </Layout>
    )
  }

}
export default RequestIndex;
