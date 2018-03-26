import React, { Component } from 'react';
import { Form, Button, Input, Message, Card, Table } from "semantic-ui-react";
import web3 from '../ethereum/web3'
import CampaignFunction from '../ethereum/campaign'

class RequestRow extends Component {

  onApprove = async () => {
    //console.log('onApprove')
    const campaign = CampaignFunction(this.props.campaignAddress)

    const accounts = await web3.eth.getAccounts()

    await campaign.methods.approveRequest(this.props.id).send({
      from:accounts[0]
    })
  }

  render(){
    const { Row,Cell } = Table;
    const { id, request, approversCount } = this.props;
    return(
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value,'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}/{approversCount}</Cell>
        <Cell>
          <Button
            onClick={this.onApprove}
            color="green"
            basic>
            Approve
            </Button>
        </Cell>

      </Row>
    )
  }
}
export default RequestRow;
